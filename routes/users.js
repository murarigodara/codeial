

const express=require('express');
const router=express.Router();

const usersConstroller=require('../controllers/users_controllers');

router.get('/profile',usersConstroller.profile);

router.get('/sign-up',usersConstroller.signUp);
router.get('/sign-in',usersConstroller.signIn);
router.post('/create',usersConstroller.create);
router.post('/create-session',usersConstroller.createSession);
module.exports=router;