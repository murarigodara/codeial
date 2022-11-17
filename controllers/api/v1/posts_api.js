const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index= async function(req,res){
    let posts = await Post.find({})
        .sort({'-createdAt' : 'desc'})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
    return res.json('200',{
        message:"Api is working",
        posts:posts
    })
};
module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            return res.status('200').json({
                message:"Post and assocaited comments deleted successfully"
            });
        }else{
            return res.json(401,{
                message:'you can not delete this post'
            });
        }

    }catch(err){
        return res.status('500').json({
            message:"Post and assocaited comments deleted successfully"
        });
        
    }
    
}