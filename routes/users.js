const express=require('express');
const router=express.Router();

const usersConstroller=require('../controllers/users_controllers');

router.get('/profile',usersConstroller.profile);
router.get('/post',require('./post'));
module.exports=router;
