const nodemailer = require("nodemailer")

const userEmail = process.env.SMTP_USER_EMAIL;
const passEmail = process.env.SMTP_USER_PASSWORD;
const pointEmail = process.env.POINT_EMAIL;

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.mail.ru",
    auth: {
        user: userEmail,
        pass: passEmail
    },
    secure: true
})

const mailer = async ({subject, text, html, attachments}) => {
    const mailData = {
        from: userEmail,
        to: pointEmail,
        subject: subject,
        text: text,
        html: html,
        attachments: attachments
    }
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailData, function(error, info) {
            if(error) {
                reject(error);
                return
            }
            resolve(info)
        })
    })
}

module.exports = mailer;