import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class FamilyMember extends Model {
  @Column
  userId: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  petName: string;
}
