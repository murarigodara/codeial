const post=require('../models/post');
module.exports.create=function(req,res){
    post.create({ content:req.body.content,
        user:req.user._id},
        function(error,post){
            if(error){
                console.log("error in creating post");
                return;
            }
            return res.redirect('back');
        }
       
    );
}