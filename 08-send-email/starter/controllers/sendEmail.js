const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
const sendEmailTest = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount()
  let transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'alessia.weimann47@ethereal.email',
      pass: 'CyNTGKv2rZHEhy5d55',
    },
  })
  let info = await transport.sendMail({
    from: '"Nobert Ayesiga",<ayesiganobert@gmail.com>',
    to: 'bar@example.com',
    subject: 'Hello you',
    html: '<b>Hello i need to see u</b>',
  })

  res.json(info)
}

const sendEmail = async (req, res) => {
  // const{email, name}= req.body
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'wisepro25@gmail.com', // Change to your recipient
    from: 'ayesiganobert@gmail.com', // Change to your verified sender
    subject: 'Thanks for contact me',
    text: 'You are the best',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}
module.exports = sendEmail
