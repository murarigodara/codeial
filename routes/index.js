const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controllers');
const passport=require('../config/passport-local-strategy');
console.log('router is loaded');
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',passport.checkAuthentication,require('./post'));


module.exports=router;