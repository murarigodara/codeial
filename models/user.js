const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
    );

// register schema with mongoose
// first parameter is model name and second parameter is schema defintion 
const User=mongoose.model('User',userSchema);

module.exports=User;