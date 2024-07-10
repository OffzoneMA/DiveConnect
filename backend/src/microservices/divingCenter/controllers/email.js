const nodemailer = require("nodemailer");
// const sgMail = require("@sendgrid/mail");
// testing
exports.sendEmailTest = async (center, formData) => {
  // let testAccount = await nodemailer.createTestAccount();
  let emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .email-container {
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
    }
    .email-header {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .email-section {
      margin-bottom: 15px;
    }
    .email-section span {
      display: block;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">Dive Booking Confirmation</div>
    <div class="email-section">
      <span>Name:</span> ${formData.name}
    </div>
    <div class="email-section">
      <span>Email:</span> ${formData.email}
    </div>
    <div class="email-section">
      <span>Phone:</span> ${formData.phone}
    </div>
    <div class="email-section">
      <span>Number of Dives:</span> ${formData.divesNum}
    </div>
    <div class="email-section">
      <span>The number of Diver's Level 1:</span> ${formData.diversLevel1}
    </div>
    <div class="email-section">
      <span>The number of Diver's Level 2:</span> ${formData.diversLevel2}
    </div>
    <div class="email-section">
      <span>The number of Diver's Level 3:</span> ${formData.diversLevel3}
    </div>
    <div class="email-section">
      <span>Total divers:</span> ${formData.total}
    </div>
    <div class="email-section">
      <span>Dive Center:</span> ${center.name}
    </div>
  </div>
</body>
</html>
`;
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  let info = await transporter.sendMail({
    from: formData.email,
    to: center.email,
    subject: "Demande de réservation de plongée",
    html: `<h2>${emailContent}</h2>`,
  });
  return info;
};
// production
exports.sendEmailProduction = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const formData = req.body;
  console.log(req.body);
  let emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .email-container {
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
    }
    .email-header {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .email-section {
      margin-bottom: 15px;
    }
    .email-section span {
      display: block;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">Dive Booking Confirmation</div>
    <div class="email-section">
      <span>Name:</span> ${formData.name}
    </div>
    <div class="email-section">
      <span>Email:</span> ${formData.email}
    </div>
    <div class="email-section">
      <span>Phone:</span> ${formData.phone}
    </div>
    <div class="email-section">
      <span>Number of Dives:</span> ${formData.divesNum}
    </div>
    <div class="email-section">
      <span>Diver's Level:</span> ${formData.diversLevel}
    </div>
    <div class="email-section">
      <span>Total Cost:</span> $${formData.total}
    </div>
    <div class="email-section">
      <span>Dive Center:</span> ${formData.center.name}
    </div>
  </div>
</body>
</html>
`;
  const msg = {
    to: formData.center.email,
    from: formData.email,
    subject: "Demande de réservation de plongée",
    text: "and easy to do anywhere",
    html: emailContent,
  };
  const info = await sgMail.send(msg);
  res.json(info);
};

// const nodemailer = require("nodemailer");
// const DivingCenter = require("../models/DivingCenter");

// exports.sendEmail = async (req, res) => {
//   try {
//     const divingCenter = await DivingCenter.findById(req.params.id);
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: divingCenter.email,
//       subject: "Test Email",
//       text: "This is a test email",
//     };
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
