

const express=require('express');
const passport = require('passport');
const router=express.Router();

const usersConstroller=require('../controllers/users_controllers');

router.get('/profile',passport.checkAuthentication,usersConstroller.profile);

router.get('/sign-up',usersConstroller.signUp);
router.get('/sign-in',usersConstroller.signIn);
router.get('/sign-out',usersConstroller.destroySession);
router.post('/create',usersConstroller.create);
//use middle to authenticate 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
),usersConstroller.createSession);
module.exports=router;