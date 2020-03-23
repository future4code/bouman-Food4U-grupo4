const nodemailer = require('nodemailer');

export class Nodemailer {
    private SECRET_HOST: string
    private SECRET_USER: string
    private SECRET_PASSWORD: string

    constructor() {
        this.SECRET_HOST = "host aqui"
        this.SECRET_USER = "usuario aqui"
        this.SECRET_PASSWORD = "senha aqui"
    }

    public sendMailPassword(userEmail: string, userName: string, newPassword: string) {

        const transporter = nodemailer.createTransport({
            host: this.SECRET_HOST,
            port: 2525,
            auth: {
                user: this.SECRET_USER,
                pass: this.SECRET_PASSWORD
            }
        });

        const message = {
            from: "food4U@f4.com",
            to: userEmail,
            subject: "Esqueci minha senha",
            text: `Olá, ${userName} \n
Aqui está a sua nova senha: ${newPassword}\n
Com ela, você conseguirá acessar a sua conta do nosso aplicativo.\n
Para redefini-la, siga o fluxo de "troca de senha" já implementado no nosso sistema. \n
Agradecemos a preferência!`
        }

        transporter.sendMail(message, function (error: Error, info: any) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });

    }
}