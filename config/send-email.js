const Otp = require('../models/otp');

function getOtp(){
  var min = 100000;
  var max = 999999;
  var random = Math.floor(Math.random() * (max - min)) + min;
  return random;
}

module.exports.sendEmail = async function(user){

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bhargavponduridjango@gmail.com',
        pass: 'ramaposb'
      }
    });
    
    var myotp = getOtp();
    var body = "Your OTP is : "+myotp;

    var otp_obj = await Otp.findOne({user:user.id});
    otp_obj.otp = myotp;
    otp_obj.save();

    var mailOptions = {
      from: 'bhargavponduridjango@gmail.com',
      to: user.email,
      subject: 'Sending Email using Node.js',
      text: body
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}