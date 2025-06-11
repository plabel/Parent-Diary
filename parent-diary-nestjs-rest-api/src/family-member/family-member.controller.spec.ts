import { Test, TestingModule } from '@nestjs/testing';
import { FamilyMemberController } from './family-member.controller';
import { FamilyMemberService } from './family-member.service';
import { FamilyMember } from './family-member.model';
import { getModelToken } from '@nestjs/sequelize';

describe('FamilyMemberController', () => {
  let controller: FamilyMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyMemberController],
      providers: [
        FamilyMemberService,
        {
          provide: getModelToken(FamilyMember),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FamilyMemberController>(FamilyMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
