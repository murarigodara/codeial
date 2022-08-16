const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local-strategy');
const comments_Controller=require('../controllers/comments_controllers');

router.post('/create',passport.checkAuthentication,comments_Controller.create);
module.exports=router;