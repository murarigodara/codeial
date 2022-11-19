const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use this startegy for google login
passport.use(new googleStrategy({
    clientID:"471183355914-oqq1142idd08nqq1g1hbtm9q6mk5kehn.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
function(accessToken,refreshToken,profile,done){
    // find user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('error in google startegy password',err); return ;}
        console.log(profile);
        // if user found set user in as req.user
        if(user){
            return done(null,user);
        }else{
            // if user not found create new user  and set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log('error in creating user in google startegy password',err); return ;}
                return done(null,user);
            });

    
        }
    })
}
))



module.exports=passport;