const mailer = require("../nodemailer/nodemailer");

const routes = (app) => {
    app.get("/", (require, response) => {
        response.send("get message");
    })

    app.post("/send", (request, response) => {
        console.log(request.body)
        const data = request.body;
        const {project_name, admin_email, form_subject, radioTelephone, name, phone, email, letter} = data;

        const html = `
            <table style='width: 100%;'>
                <tr style='width: 100%; background-color: #f8f8f8;'>
                    <td style='width: 30px; padding: 10px; border: #e9e9e9 1px solid;'><b>Где заполнена форма</b></td>
                    <td style='width: 70px; padding: 10px; border: #e9e9e9 1px solid;'${form_subject}</td>
                </tr>
                <tr style='width: 100%; background-color: #f8f8f8;'>
                    <td style='width: 30px; padding: 10px; border: #e9e9e9 1px solid;'><b>Имя</b></td>
                    <td style='width: 70px; padding: 10px; border: #e9e9e9 1px solid;'>${name}</td>
                </tr>
                <tr style='width: 100%; background-color: #f8f8f8;'>
                    <td style='width: 30px; padding: 10px; border: #e9e9e9 1px solid;'><b>Телефон</b></td>
                    <td style='width: 70px; padding: 10px; border: #e9e9e9 1px solid;'>${phone}</td>
                </tr>
                <tr style='width: 100%; background-color: #f8f8f8;'>
                    <td style='width: 30px; padding: 10px; border: #e9e9e9 1px solid;'><b>E-mail</b></td>
                    <td style='width: 70px; padding: 10px; border: #e9e9e9 1px solid;'>${email}</td>
                </tr>
                <tr style='width: 100%; background-color: #f8f8f8;'>
                    <td style='width: 30px; padding: 10px; border: #e9e9e9 1px solid;'><b>Сообщение</b></td>
                    <td style='width: 70px; padding: 10px; border: #e9e9e9 1px solid;'>${letter}</td>
                </tr>
            </table>
        `
        mailer({
            subject: project_name,
            text: "SOME TEXT",
            html: html,
            attachments: []
        })
            // .then(responseMailer => responseMailer.json())
            .then(data => response.json({msg: "email message has been sent"}))
            .catch(error => response.status(404).json({msg: error.message}));
    })
}

module.exports = routes;