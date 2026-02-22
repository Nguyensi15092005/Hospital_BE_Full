import nodemailer from "nodemailer";
import Mailjet from "node-mailjet";

export const sendMail = (email: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Email của bạn
      pass: process.env.EMAIL_PASS, //MK
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Lỗi gửi mail:", error);
    } else {
      console.log("Email đã gửi: " + info.response);
    }
  });
};

// export const sendMail = async (to: string, subject: string, html: string) => {
//   try {
//     const mailjet = Mailjet.apiConnect(
//       process.env.MJ_APIKEY_PUBLIC!,
//       process.env.MJ_APIKEY_PRIVATE!
//     );

//     const request = await mailjet
//       .post("send", { version: "v3.1" })
//       .request({
//         Messages: [
//           {
//             From: {
//               Email: "vansi8809@gmail.com",  // email bạn đã đăng ký mailjet
//               Name: "Hospital Clinic",
//             },
//             To: [
//               {
//                 Email: to,
//               },
//             ],
//             Subject: subject,
//             HTMLPart: html,
//           },
//         ],
//       });

//     console.log("Mailjet Response:", request.body);
//     return true;
//   } catch (error) {
//     console.error("Mailjet error:", error);
//     return false;
//   }
// };

