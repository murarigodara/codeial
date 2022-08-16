const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local-strategy');
const post_controller=require('../controllers/post_controllers');

router.post('/create',passport.checkAuthentication,post_controller.create);
module.exports=router;