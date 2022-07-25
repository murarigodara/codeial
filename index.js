const express=require('express');
const cookieParser=require('cookie-parser'); // cookie-parse libray used to edit cookie in server
const app=express();

const port=8000;


// express. urlencoded() is a method inbuilt in express 
// to recognize the incoming Request Object as strings or arrays. 
// This method is called as a middleware in your application
app.use(express.urlencoded());

//call cookie-parser for use
app.use(cookieParser());
//require layout library
const expresslayouts=require('express-ejs-layouts');

//adding darabase to it
const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const { Mongoose } = require('mongoose');
const MongoStore=require('connect-mongo')(session);
//add static files to server
app.use(express.static('./assets'));

//we use layouts before routes because routes can use layouts 
app.use(expresslayouts);

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