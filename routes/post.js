const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local-strategy');
const post_controller=require('../controllers/post_controllers');

router.post('/create',passport.checkAuthentication,post_controller.create);
router.get('/destroy/:id',passport.checkAuthentication,post_controller.destroy);
module.exports=router;