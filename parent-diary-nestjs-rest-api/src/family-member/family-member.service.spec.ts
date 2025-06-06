import { Test, TestingModule } from '@nestjs/testing';
import { FamilyMemberService } from './family-member.service';
import { FamilyMember } from './family-member.model';
import { getModelToken } from '@nestjs/sequelize';

describe('FamilyMemberService', () => {
  let service: FamilyMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyMemberService, {
        provide: getModelToken(FamilyMember),
        useValue: {
          create: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
        },
      }],
    }).compile();

    service = module.get<FamilyMemberService>(FamilyMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
