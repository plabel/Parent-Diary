import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-pool';
import * as AES from 'crypto-js/aes';
import * as enc from 'crypto-js/enc-utf8';
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
        const encryptedToken = AES.encrypt(token, this.configService.get('master_key')).toString(enc.Utf8);
        const encodedToken = encodeURIComponent(encryptedToken);
        const url = `${process.env.NEXT_JS_FRONT_URL}/users/confirm-email/${encodedToken}`;
        const html = `
            Please confirm your email by clicking the link below:
            ${url}
        `;
        await this.sendEmail(to, 'Confirm email', html);
    }
    async sendPasswordResetEmail(to: string, token: string) {
        const encryptedToken = AES.encrypt(token, this.configService.get('master_key')).toString(enc.Utf8);
        const encodedToken = encodeURIComponent(encryptedToken);
        const url = `${process.env.NEXT_JS_FRONT_URL}/users/reset-password/${encodedToken}`;
        const html = `
            Please reset your password by clicking the link below:
            ${url}
        `;
        await this.sendEmail(to, 'Reset password', html);
    }
}
