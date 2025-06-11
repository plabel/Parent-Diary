import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-pool';
import * as AES from 'crypto-js/aes';
import * as enc from 'crypto-js/enc-utf8';
@Injectable()
export class EmailService {
  private transporter: Transporter;
  constructor(private configService: ConfigService) {
    const mailOptions: MailOptions = {
      ...this.configService.get('email'),
      auth: {
        ...this.configService.get('email.auth'),
        pass: process.env.MAIL_PASSWORD ?? '',
      },
    } as MailOptions;
    this.transporter = createTransport(mailOptions);
  }
  /**
   * Send an email
   * @param to - The email address of the recipient
   * @param subject - The subject of the email
   * @param text - The text of the email
   * @returns The message ID of the email
   */
  async sendEmail(to: string, subject: string, text: string) {
    const info = await this.transporter.sendMail({
      from: this.configService.get('email.auth.user'),
      to,
      subject,
      text,
    });
    return info.messageId;
  }
  /**
   * Send a confirmation email
   * @param to - The email address of the recipient
   * @param token - The token to be used for confirmation
   * @returns The message ID of the email
   */
  async sendConfirmationEmail(to: string, token: string) {
    const tokenObj = {
      token,
      creationDate: new Date().getTime(),
    };
    const encryptedToken = AES.encrypt(
      JSON.stringify(tokenObj),
      this.configService.get('master_key'),
    ).toString(enc.Utf8);
    const encodedToken = encodeURIComponent(encryptedToken);
    const url = `${process.env.NEXT_JS_FRONT_URL}/users/confirm-email/${encodedToken}`;
    const html = `
            Please confirm your email by clicking the link below:
            ${url}
        `;
    await this.sendEmail(to, 'Confirm email', html);
  }
  /**
   * Send a password reset email
   * @param to - The email address of the recipient
   * @param token - The token to be used for password reset
   * @returns The message ID of the email
   */
  async sendPasswordResetEmail(to: string, token: string) {
    const tokenObj = {
      token,
      creationDate: new Date().getTime(),
    };
    const encryptedToken = AES.encrypt(
      JSON.stringify(tokenObj),
      this.configService.get('master_key'),
    ).toString(enc.Utf8);
    const encodedToken = encodeURIComponent(encryptedToken);
    const url = `${process.env.NEXT_JS_FRONT_URL}/users/reset-password/${encodedToken}`;
    const html = `
            Please reset your password by clicking the link below:
            ${url}
        `;
    await this.sendEmail(to, 'Reset password', html);
  }
  /**
   * Send a recovery code email
   * @param to - The email address of the recipient
   * @param recoveryCode - The recovery code to be used for recovery
   * @returns The message ID of the email
   */
  async sendRecoveryCodeEmail(to: string, recoveryCode: string) {
    const html = `
            Here is your recovery code, please save it in a safe place (it is also recommended to delete this email after saving the recovery code):
            ${recoveryCode}
        `;
    await this.sendEmail(to, 'Recovery code', html);
  }
}
