const express=require('express');
const app=express();
const port=8000;
const expresslayouts=require('express-ejs-layouts');


app.use(express.static('./assets'));

//we use layouts before routes because routes can use layouts 
app.use(expresslayouts);
//we exract style and script from sub pages into layouts 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express route
app.use('/',require('./routes'));

// setup  the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(error){
    if(error){
        console.log(`Error in runing the Server : ${error}`)
    }
    console.log(`Server is running on port : ${port}`);
});