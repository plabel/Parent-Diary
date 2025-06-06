import { Controller, Get, Req, UseGuards, Delete, Param, Post, Body, Patch } from '@nestjs/common';
import { FamilyMemberService } from './family-member.service';
import { FamilyMember } from './family-member.model';
import { AuthGuard } from '../guard/auth/auth.guard';

@Controller('family-member')
export class FamilyMemberController {
    constructor(private readonly familyMemberService: FamilyMemberService) {}

    @Get()
    @UseGuards(AuthGuard)
    getFamilyMembers(@Req() request: Request & { session: { userId: string }}): Promise<FamilyMember[]> {
        const userId = (request.session as any).userId;
        return this.familyMemberService.getFamilyMembers(userId);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteFamilyMember(@Param('id') id: string, @Req() request: Request & { session: { userId: string }}): Promise<boolean> {
        const userId = (request.session as any).userId;
        return this.familyMemberService.deleteFamilyMember(parseInt(id), userId);
    }

    @Post()
    @UseGuards(AuthGuard)
    createFamilyMember(@Body() familyMember: FamilyMember, @Req() request: Request & { session: { userId: string }}): Promise<FamilyMember> {
        const userId = (request.session as any).userId;
        return this.familyMemberService.createFamilyMember(familyMember, userId);
    }
    @Patch(':id')
    @UseGuards(AuthGuard)
    updateFamilyMember(@Param('id') id: string, @Body() familyMember: FamilyMember, @Req() request: Request & { session: { userId: string }}): Promise<FamilyMember | null> {
        const userId = (request.session as any).userId;
        return this.familyMemberService.updateFamilyMember(parseInt(id), familyMember, userId);
    }
}