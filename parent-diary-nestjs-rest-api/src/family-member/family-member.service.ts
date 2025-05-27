import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FamilyMember } from './family-member.model';

@Injectable()
export class FamilyMemberService {
  constructor(
    @InjectModel(FamilyMember)
    private familyMemberModel: typeof FamilyMember,
  ) {}

  async getFamilyMembers(userId: number): Promise<FamilyMember[]> {
    return this.familyMemberModel.findAll({ where: { userId } });
  }

  async deleteFamilyMember(id: number, userId: number): Promise<boolean> {
    const result = await this.familyMemberModel.destroy({ where: { id, userId } });
    return result === 1;
  }
}
