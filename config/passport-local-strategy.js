//  used to setup aotomatic authencation and authorization
const passport=require('passport');
const LoaclStretegy=require('passport-local').Strategy;
const User=require('../models/user');


//config passport for authentication
// tell passport to use this strategy
passport.use(new LoaclStretegy({
    usernameField:'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password!=password)
            {
                req.flash('error','Invalid User/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
))
//actually express session libray is storing this encrypted key in cookies 
//serilaising the user to deicde which key is to be kept in the cookies
// serializeUser determines which data of the user object should be stored in the session.
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialising the user from the keys on the cookies-- when user maek request this cookie is used to identify which user is making the request 
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user');
            return done(err);
        }
        return done(null,user);
    });
    
});

//check if user is authenticated 
passport.checkAuthentication=function(req,res,next){
    // if user is signrd in than pass on the request to next function (which is controller)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAunthenticatedUser =function(req,res,next){
    if (req.isAuthenticated()){
        //req contains the current signed in user from the session cookie and we just sending this to the locals for  view
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;