const Handlebars = require('handlebars');
const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');

async function mailer(info) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'alguno',
            auth: {
                user: " ",
                pass: " "
            },
        });
        let filePath = "";
        let source = "";
        let template = "";
        let user = info.email;
        let url = ``;
        let subject = "";

        switch (info.type) {
            case "confirmation":
                filePath = path.join('confirm', '../views/confirm.html');
                source = fs.readFileSync(filePath, 'utf-8').toString();
                template = Handlebars.compile(source);
                url = `http://localhost:3000/confirm?token=${info.token}`;
                subject = "Account confirmation";
                break;
            case "reset":
                filePath = path.join('Reset', '../views/Reset.html');
                source = fs.readFileSync(filePath, 'utf-8').toString();
                template = Handlebars.compile(source);
                subject = "Reset password";
                url = `http://localhost:3000/reset?token=${info.token}`;
                break;
            case "confirmOrder":
                filePath = path.join('ConfirmOrder', '../views/ConfirmOrder.html');
                source = fs.readFileSync(filePath, 'utf-8').toString();
                template = Handlebars.compile(source);
                subject = "Order confirmation";
                break;
            case "inProcess":
                filePath = path.join('InProcess', '../views/InProcess.html');
                source = fs.readFileSync(filePath, 'utf-8').toString();
                template = Handlebars.compile(source);
                url = `http://localhost:3000/home`;
                subject = "Account confirmation";
                break;
            default:
                break;
        }
        let options = await transporter.sendMail({
            from: " ", //sender address
            to: user,
            subject: subject,
            html: template({ url })
        });

        return options.messageId;
        
    } catch (error) {
        console.log('Error: ' + error);
    }
};

module.exports = mailer;