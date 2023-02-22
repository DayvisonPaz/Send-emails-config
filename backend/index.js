const express = require('express');

const nodemailer = require('nodemailer');


const app = express();


app.get("/",(req,res)=>{
 
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
       
  host: process.env.EMAIL_H,

  port: process.env.EMAIL_P,
  
  auth: {
    user: process.env.EMAIL_U,    
    pass:process.env.EMAIL_P
  },  logger: true,
  transactionLog: true, // include SMTP traffic in the logs
  allowInternalNetworkInterfaces: false
    });

    
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'Dayvison', // sender address
        to: "teste@teste.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "message", // plain text body
        html: "<b>Hello world ?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);

})



app.listen(process.env.PORT || 5000, () => {console.log(`Server running on port ${process.env.PORT || 5000}`)});