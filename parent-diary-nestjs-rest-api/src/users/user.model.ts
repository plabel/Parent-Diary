import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  passwordHash: string;

  @Column
  isEmailVerified: boolean;

  @Column
  salt: string;

  @Column
  otpSecret: string;

  @Column
  recoveryCode: string;
}
