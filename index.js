const express=require('express');
const cookieParser=require('cookie-parser'); // cookie-parse libray used to edit cookie in server
//require layout library
const expressLayouts = require('express-ejs-layouts');
const app=express();

const port=8000;
//adding darabase to it
const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const { Mongoose } = require('mongoose');
const MongoStore=require('connect-mongo')(session);
//sass middleware 
const sassMiddleware=require('node-sass-middleware');
const flash=require('connect-flash');
const custMware=require('./config/middleware');
//we put the sass middelware just before the app start becuase we want all file to be complied before server start
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
// express. urlencoded() is a method inbuilt in express 
// to recognize the incoming Request Object as strings or arrays. 
// This method is called as a middleware in your application
app.use(express.urlencoded());

//call cookie-parser for use
app.use(cookieParser());


//add static files to server
app.use(express.static('./assets'));
// make upload path avialabe to browser
app.use('/uploads',express.static(__dirname+'/uploads'));
//we use layouts before routes because routes can use layouts 
app.use(expressLayouts);

//we exract style and script from sub pages into layouts 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express route
//take the cookie and encrypt it 
//mongo store i used to store the cookie 

app.use(session(
    {
        name:"codeial",
        //todo change the secret before deployment in production mode
        secret:"blahsomething",
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:(1000*60*100)
        },
        store:new MongoStore({
            mongooseConnection : db,
            autoRemove:'disabled'
            
     },
     function(err){
        console.log(err|| "connection to connect monto is ok");
     })
    }
))

app.use(passport.initialize());
app.use(passport.session());

//should be used after session because its uses the session cookies
app.use(flash());
app.use(custMware.setFlash);
// setup  the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(passport.setAunthenticatedUser);
app.use('/',require('./routes'));

app.listen(port,function(error){
    if(error){
        console.log(`Error in runing the Server : ${error}`)
    }
    console.log(`Server is running on port : ${port}`);
});