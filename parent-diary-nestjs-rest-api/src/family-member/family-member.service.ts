import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FamilyMember } from './family-member.model';

@Injectable()
export class FamilyMemberService {
  constructor(
    @InjectModel(FamilyMember)
    private familyMemberModel: typeof FamilyMember,
  ) {}
  /**
   * Get all family members for a user
   * @param userId - The ID of the user
   * @returns An array of family members
   */
  async getFamilyMembers(userId: number): Promise<FamilyMember[]> {
    return this.familyMemberModel.findAll({ where: { userId } });
  }

  /**
   * Delete a family member
   * @param id - The ID of the family member
   * @param userId - The ID of the user
   * @returns True if the family member was deleted, false otherwise
   */
  async deleteFamilyMember(id: number, userId: number): Promise<boolean> {
    const result = await this.familyMemberModel.destroy({ where: { id, userId } });
    return result === 1;
  }

  /**
   * Create a family member
   * @param familyMember - The family member to create
   * @param userId - The ID of the user
   * @returns The created family member
   */
  async createFamilyMember(familyMember: FamilyMember, userId: number): Promise<FamilyMember> {
    return this.familyMemberModel.create({ ...familyMember, userId });
  }

  /**
   * Update a family member
   * @param id - The ID of the family member
   * @param familyMember - The family member to update
   * @param userId - The ID of the user
   * @returns The updated family member
   */
  async updateFamilyMember(id: number, familyMember: Partial<FamilyMember>, userId: number): Promise<FamilyMember | null> {
    await this.familyMemberModel.update(familyMember, { where: { id, userId } });
    return this.familyMemberModel.findByPk(id);
  }
}
