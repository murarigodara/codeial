const passportLocal = require('../config/passport-local-strategy');
const post = require('../models/post');
const User = require("../models/user");
module.exports.home = async function (req, res) {
    // if(req.isAuthenticated()){
    //     return res.render('home',{title:"home"});
    // }
    // post.find({},function(error,posts){

    //     return res.render('home',{title:"codial home",posts:posts});
    // })
    //populate user
    try {
        let posts = await post.find({})
        .sort({'-createdAt' : 'desc'})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        let users = await User.find({});

        return res.render('home',
            {
                title: "codial home",
                posts: posts, all_users: users
            });
    } catch (error) {
        console.log("Error", error);
    }



};