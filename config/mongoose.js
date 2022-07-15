const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/codeial_development");
const db=mongoose.connection;
db.on('error',console.error.bind("error in connected to database"));
db.once('open',function(){
    console.log("successfull connected to database");
})
module.exports=db;