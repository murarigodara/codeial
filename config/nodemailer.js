const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'murarigodara28@gmail.com',
        pass:'Godara@80589'
    }
});


let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname+'../views/mailers'),
        data,
        function(err,template){
            if(err){console.log('error in rendering mail'); return ;}
            mailHTML=template;
        }  
    )
    return mailHTML;
        
    
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}