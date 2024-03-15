const nodemailer = require('nodemailer');
const DivingAssociation = require('../models/DivingAssociation');

exports.sendEmail = async (req, res) => {
  try {
    const divingAssociation = await DivingAssociation.findById(req.params.id);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: divingAssociation.email,
      subject: 'Test Email',
      text: 'This is a test email',
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
