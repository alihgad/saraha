import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "alihgad2@gmail.com",
    pass: "tdiivogkfxgiqmbt",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email,otp,name) {
    const info = await transporter.sendMail({
  // send mail with defined transport object
    from: '"ali saraha app" <alihgad2@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "saraha sign up OTP", // Subject line
    html : `<p> welcome ${name} your OTP is </p>
            <h1>${otp}</h1>`
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export default main