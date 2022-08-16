const Comment=require('../models/comment');
const Post=require('../models/post');
module.exports.create=function(req,res){

    Post.findById(req.body.post,function(error,post){
        if(post){
            Comment.create(
            {
              content:req.body.content,
              user:req.user._id,
              post:req.body.post
              
            },
            function(error,comment){
                //if error
                post.comments.push(comment);
                post.save();

                res.redirect('back');
            }  
            );
        }
    });

};