const Post=require('../models/post');
const Comment = require('../models/comment');

module.exports.create=function(req,res){
    Post.create(
        { content:req.body.content,
        user:req.user._id},
        function(error,post){
            if(error){
                req.flash('error',error)
                return;
            }
            req.flash('success','Post Published');
            return res.redirect('back');
        } 
    );
};
module.exports.destroy =async function(req, res) {
    let post=await Post.findById(req.params.id); 
        // .id convert id into string automatically
        console.log("Delete post");
    if (post.user == req.user.id) {
        post.remove();
        let comment=await Comment.deleteMany({ post: req.params.id });
        req.flash('success','Post and Associated comments are deleted');
        return res.redirect('back');
    }else 
    {
        req.flash('error','Unable to delete post');
        return res.redirect('back');
    }

};
