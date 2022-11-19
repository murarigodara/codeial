

const express=require('express');
const passport = require('passport');
const router=express.Router();

const usersConstroller=require('../controllers/users_controllers');

router.get('/profile/:id',passport.checkAuthentication,usersConstroller.profile);
router.post('/update/:id',passport.checkAuthentication,usersConstroller.update);
router.get('/sign-up',usersConstroller.signUp);
router.get('/sign-in',usersConstroller.signIn);
router.get('/sign-out',usersConstroller.destroySession);
router.post('/create',usersConstroller.create);
//use middle to authenticate 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usersConstroller.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersConstroller.createSession);
module.exports=router;