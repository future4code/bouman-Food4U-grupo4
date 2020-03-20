import { UserDB } from "../../../data/UserDB";
import generator from 'generate-password';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "luanbonetto42@gmail.com",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "no-reply@diegopinho.com",
        pass: "senhaqualquerdeteste"
    },
    tls: { rejectUnauthorized: false }
});

export class ForgotPasswordUC {

    constructor(private db: UserDB) { }

    public async execute(input: ForgotPasswordInput) {
        const user = await this.db.getUserByEmail(input.userEmail)

        if (!user) {
            throw new Error('incorrect email')
        }

        const newPassword = generator.generate({
            length: 10,
            numbers: true
        })

        const mailOptions = {
            from: 'no-reply@diegopinho.com',
            to: 'camdyn8@creationuq.com',
            subject: 'Atualizando Senha',
            text: 'Sua nova senha é ${newPassword}'
        };

        transporter.sendMail(mailOptions, function(error:Error, info:any){
            if (error) {
              console.log(error);
            } else {
              console.log('Email enviado: ' + info.response);
            }
          });

    }

}

export interface ForgotPasswordInput {
    userEmail: string
}

