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

module.exports.destroy=function(req,res){
    
    Comment.findById(req.params.id,function(error,comment){
        if(comment.user==req.user.id){
            const postid=comment.post;
            comment.remove();

            //alernative for delete comment
            // Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},function(error,post){
            //     return res.redirect('back');
            // });

            Post.findById(postid,function(error,post){
                if(post){
                    post.comments.splice(post.comments.indexOf(postid),1);
                    return res.redirect('back');
                }
               
            });
        } else{
            return res.redirect('back');
        }
        
    });
};