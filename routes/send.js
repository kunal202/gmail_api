const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/checkauth');
const nodemailer = require("nodemailer");

// GET /mail/send
router.get('/send', ensureAuth, (req, res)=>{
    res.send('<p>Please use postman to send Mail</p>');
})

// GET mail/send
router.post('/send', ensureAuth,(req, res) => {
    const reciever = req.body.email;
    const subject = req.body.subject;
    const body = req.body.text;
    if(!reciever||!subject){
        return res.send('Please fill the form')
    }

    let testAccount = nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: name, // sender address
        to: reciever, // list of receivers
        subject: subject, // Subject line
        text: body
    });
    
    res.send('Mail is Sent')
})

module.exports = router;