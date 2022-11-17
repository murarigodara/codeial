const { render } = require("ejs");
const { model } = require("mongoose");
const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res){
   User.findById(req.params.id,function(error,user){
      return res.render('user_profile',{title:'users',profile_user:user});
   });
   
};
//upadte user
module.exports.update=async function(req,res){
   // if(req.params.id==req.user.id){
   //    User.findByIdAndUpdate(req.params.id,req.body,function(error,user){
   //       return res.redirect('back');
   //    });
   // }
   // else{
   //    return res.satus('404').send('Unauthorized');
   // }
   if(req.params.id==req.user.id){
      try{
         let user=await User.findByIdAndUpdate(req.params.id);
         User.uploadedAvatar(req,res,function(error){
            if(error){console.log("***Multer"+error);}
            user.name=req.body.name;
            user.email=req.body.email;
            if(req.file){
               //this is saving the the path of file in avatar filed in the user
               if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar)) ){
                 fs.unlinkSync(path.join(__dirname,'..',user.avatar)); 
               }
               user.avatar=User.avatarPath+'/'+req.file.filename;
               user.save();
            }
            return res.redirect('back');
         });
      }
      catch(error){
         req.flash('error',error);
      return res.redirect('back');
      }
   }
   else{
      req.flash('error','Unauthorized');
      return res.satus('404').send('Unauthorized');
   }
};

//render the sign up data and page
module.exports.signUp=function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   res.render('user_sign_up',{title:"SignUp"});
}
//render the sign in page
module.exports.signIn=function(req,res){
  
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
   console.log("user not found")
   return res.render('user_sign_in',{title:"signin"});
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
         req.flash('error','Your are already a user');
         res.redirect('/users/sign-in');
      }
      if(!user){
         User.create(req.body);
         req.flash('success','Sign Up Sucessfull');
         res.redirect('/users/sign-in');
      }
   })
};
//get sign in data and create session
module.exports.createSession=function(req,res){
   req.flash('success','Logged in Successfull');
   return res.redirect('/');
};
//signout and destroy session
module.exports.destroySession=function(req,res){
   
   req.logout(function(error){
      if(error){
         console("error",error);
      }
      req.flash('success','Logged out Successfull');
   return res.redirect('/');
   });
   
   
}