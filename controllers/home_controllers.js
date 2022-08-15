const passportLocal=require('../config/passport-local-strategy');
const post=require('../models/post');
module.exports.home=function(req,res){
    // if(req.isAuthenticated()){
    //     return res.render('home',{title:"home"});
    // }
    // post.find({},function(error,posts){

    //     return res.render('home',{title:"codial home",posts:posts});
    // })
    
    
    //populate user
    post.find({}).populate('user').exec(function(error,posts){
        return res.render('home',{title:"codial home",posts:posts});
    })
    
    
};