const express=require('express');
const app=express();
const port=8000;


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