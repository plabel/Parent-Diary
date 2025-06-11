import { FamilyMember } from '../_family-members/types';

export type LogEntry = {
  id: number;
  entry: string;
  createdAt: string;
  familyMembers: FamilyMember[];
};
