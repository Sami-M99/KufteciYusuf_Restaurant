
// const nodemailer = require("nodemailer")



// const sendEmail = async options => {

//     // 1) create transformer
//     var transport = nodemailer.createTransport({
//         host: process.env.Email_Host,
//         port: process.env.Email_Port,
//         auth: {
//             user: process.env.Email_Username,
//             pass: process.env.Email_Password,
//         }
//     });

//     // 2) email oprions
//     const mailOptions = {
//         from: "bashir isse<bashka@gmail.ocm>",
//         to: options.email,
//         subject: options.subject,

//         text: options.message
//         // html
//     }

//     //3)   send email

//     await transport.sendMail(mailOptions)
// }


// const sendVerificationCode = async (options) => {
//     // Create transporter
//     const transporter = nodemailer.createTransport({
//         host: process.env.Email_Host,
//         port: process.env.Email_Port,
//         auth: {
//             user: process.env.Email_Username,
//             pass: process.env.Email_Password,
//         }
//     });

//     // Define email options
//     const mailOptions = {
//         from: "bashir isse <bashka@gmail.com>",
//         to: options.email,
//         subject: options.subject || "Verification Code",
//         text: options.message || `Your verification code is: ${ options.verificationCode }`
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);
// }

// module.exports = { sendEmail, sendVerificationCode }