module.exports.home=function(req,res){
    console.log(req.cookies);
    res.cookie('userid','3');
    return res.render('home',{title:"home"});
};