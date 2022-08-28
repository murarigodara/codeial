const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create(
                {
                    content: req.body.content,
                    user: req.user._id,
                    post: req.body.post
                });
            post.comments.push(comment);
            post.save();
            req.flash('success','Commet is Added');
            res.redirect('back');
        }
    } catch (error) {
        req.flash('error',error);
        console.log("Error", error);
    }
};

module.exports.destroy =async function (req, res) {
    try{
        let comment=await Comment.findById(req.params.id); 
    if (comment.user == req.user.id) {
        const postid = comment.post;
        comment.remove();
        req.flash('success','Comment is Deleted');
            //alernative for delete comment
            // Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},function(error,post){
            //     return res.redirect('back');
            // });
        let post=await Post.findById(postid); 
        if (post) {
                post.comments.splice(post.comments.indexOf(postid), 1);
                return res.redirect('back');
                }
            
        } else {
            return res.redirect('back');
        }
    }catch(error){
        req.flash('error','Unable to delete comment'+error );
        res.redirect('back');
    }
    
    
};