import fp from "fastify-plugin"
import { LogRepository } from "../modules/log/log.repository";
import { getCustomRepository } from "typeorm";
const nodemailer = require("nodemailer");

const Mailer = {
  sendMail: async (emailData: any) => {
    if(!emailData.receiver){
      return "User not found"
    }
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    let info = await transporter.sendMail({
      from: emailData.sender,
      to: emailData.receiver,
      subject: "Account notification",
      text: "Your account has been banned by admin!",
      html: "<b>Your account has been banned by admin!</b>"
    })

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    await getCustomRepository(LogRepository)
      .save(getCustomRepository(LogRepository)
      .create({ description: `Banned ${emailData.receiver}`}))

    return "Message sent successfuly"
  }
}

export default fp((fastify, opts, done) => {
  fastify.decorate("mailer", Mailer);
  fastify.decorate("sendMail", Mailer.sendMail);
  done();
})