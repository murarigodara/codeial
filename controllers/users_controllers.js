const { render } = require("ejs");
const { model } = require("mongoose");
const User=require('../models/user');
module.exports.profile=function(req,res){
   return res.render('users',{title:'users'});
};

//render the sign up data and page
module.exports.signUp=function(req,res){
   res.render('user_sign_up',{title:"SignUp"});
}
//render the sign in page
module.exports.signIn=function(req,res){
   res.render('user_sign_in',{title:"signin"});
}
//get data and  create users
module.exports.create=function(req,res){
   if(req.body.password!=req.body.confirm_password){
      res.redirect('back');
      return;
   }
   user=User.findOne({email:req.body.email},function(error,user){
      if(error){console.log("error in finding user in database"); return; }
      if(user){
         console.log("user is laready exist");
         res.redirect('/users/sign-in');
      }
      if(!user){
         User.create(req.body);
         console.log("User is added successfull to database");
         res.redirect('/users/sign-in');
      }
   })
};
//get sign in data and create session
module.exports.createSession=function(req,res){
   console.log(req.body);
   res.end("user is logined In");
};
