
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class LogEntry extends Model {
  @Column
  userId: number;

  @Column
  entry: string;
}

