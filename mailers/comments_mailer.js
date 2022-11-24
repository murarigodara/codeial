const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment)=>{
   let htmlSting=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from :'murarigodara28@gmail.com',
        to: 'murarigodara28@gmail.com',
        subject:"tesing the mailer system",
        html:htmlSting

    },(err,info)=>{
        if(err){ console.log('error in sending the mail',err);return; }
        console.log('message delivered',info);
        return;
    }
    )
};