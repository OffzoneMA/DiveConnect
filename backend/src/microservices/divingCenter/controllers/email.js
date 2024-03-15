const nodemailer = require('nodemailer');
const DivingCenter = require('../models/DivingCenter');

exports.sendEmail = async (req, res) => {
  try {
    const divingCenter = await DivingCenter.findById(req.params.id);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: divingCenter.email,
      subject: 'Test Email',
      text: 'This is a test email',
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
