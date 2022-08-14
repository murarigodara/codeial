const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
content:{
    type:String,
    required:true
},
user:{
    type:mongoose.Types.Schema.ObjectId,
    ref:'user'
}
},{
    timeStamps:true
}
);