import { Module } from '@nestjs/common';
import { FamilyMemberService } from './family-member.service';
import { FamilyMemberController } from './family-member.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { FamilyMember } from './family-member.model';

@Module({
  imports: [SequelizeModule.forFeature([FamilyMember]), ConfigModule],
  providers: [FamilyMemberService],
  controllers: [FamilyMemberController]
})
export class FamilyMemberModule {}
