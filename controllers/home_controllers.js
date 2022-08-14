const passportLocal=require('../config/passport-local-strategy');
module.exports.home=function(req,res){
    // if(req.isAuthenticated()){
    //     return res.render('home',{title:"home"});
    // }
    return res.render('home',{title:"home"})
    
};