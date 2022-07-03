const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controllers');
console.log('router is loaded');
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));



module.exports=router;