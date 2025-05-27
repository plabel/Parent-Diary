
import { BelongsToMany, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { FamilyMember } from 'src/family-member/family-member.model';

@Table
export class LogEntry extends Model {
  @Column
  userId: number;

  @Column
  entry: string;

  @BelongsToMany(() => FamilyMember, () => FamilyMemberLogEntries)
  familyMembers: FamilyMember[];
}

@Table
export class FamilyMemberLogEntries extends Model {
  @ForeignKey(() => FamilyMember)
  @Column
  familyMemberId: number;

  @ForeignKey(() => LogEntry)
  @Column
  logEntryId: number;
}