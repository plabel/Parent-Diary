import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-pool';
@Injectable()
export class EmailService {
    private transporter: Transporter;
    constructor (private configService: ConfigService) {
        const mailOptions: MailOptions = {
            ...this.configService.get('email'),
            auth: {
                ...this.configService.get('email.auth'),
                pass: process.env.MAIL_PASSWORD ?? "",
            },
        } as MailOptions;
        this.transporter = createTransport(mailOptions);
    }
    async sendEmail(to: string, subject: string, text: string) {
        const info = await this.transporter.sendMail({
            from: this.configService.get('email.auth.user'),
            to,
            subject,
            text
        });
        return info.messageId;
    }
    async sendConfirmationEmail(to: string, token: string) {
        const url = `${process.env.URL}/users/confirm-email?token=${token}`;
        const html = `
            Please confirm your email by clicking the link below:
            ${url}
        `;
        await this.sendEmail(to, 'Confirm email', html);
    }
}
