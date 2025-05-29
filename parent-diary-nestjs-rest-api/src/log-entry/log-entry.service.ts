import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FamilyMemberLogEntries, LogEntry } from './log-entry.model';
import { FamilyMember } from 'src/family-member/family-member.model';
import { Op, WhereOptions } from 'sequelize';

@Injectable()
export class LogEntryService {
    constructor(
          @InjectModel(LogEntry)
          private logEntryModel: typeof LogEntry,
          @InjectModel(FamilyMemberLogEntries)
          private familyMemberLogEntriesModel: typeof FamilyMemberLogEntries,
      ) {}

      async createLogEntry(logEntry: Partial<LogEntry>): Promise<LogEntry | null> {
        const transaction = await this.logEntryModel.sequelize?.transaction();
    
        try {
            // Update the log entry
            const newLogEntry = await this.logEntryModel.create(logEntry, { transaction });
    
            if (logEntry.familyMembers && logEntry.familyMembers.length > 0) {
                await this.familyMemberLogEntriesModel.bulkCreate(
                    logEntry.familyMembers.map(familyMemberId => ({
                        logEntryId: newLogEntry.dataValues.id,
                        familyMemberId: parseInt(familyMemberId.toString())
                    })),
                    { transaction }
                );
            }
    
            await transaction?.commit();
    
            // Return updated entry with associations
            return this.logEntryModel.findByPk(newLogEntry.dataValues.id, {
                include: [FamilyMember]
            });
        } catch (error) {
            await transaction?.rollback();
            throw error;
        }
      }

      async getLogEntries(userId: number, page: number, search: string, sort: string): Promise<LogEntry[]> {
        const limit = 10;
        const offset = (page - 1) * limit;
        const where: WhereOptions<LogEntry> = { userId };
        if (search) {
            where.entry = { [Op.like]: `%${search}%` };
        }

        return this.logEntryModel.findAll({ include: [FamilyMember], where, limit, offset, order: [['createdAt', sort]] });
      } 

      async deleteLogEntry(id: number, userId: number): Promise<boolean> {
        const result = await this.logEntryModel.destroy({ where: { id, userId } });
        return result === 1;
      }

      async updateLogEntry(id: number, logEntry: Partial<LogEntry>, userId: number): Promise<LogEntry | null> {
        const transaction = await this.logEntryModel.sequelize?.transaction();
    
        try {
            // Update the log entry
            await this.logEntryModel.update(
                { entry: logEntry.entry },
                { where: { id, userId }, transaction }
            );
    
            if (logEntry.familyMembers) {
                // Remove existing associations
                await this.familyMemberLogEntriesModel.destroy({
                    where: { logEntryId: id },
                    transaction
                });
    
                // Create new associations
                if (logEntry.familyMembers.length > 0) {
                    await this.familyMemberLogEntriesModel.bulkCreate(
                        logEntry.familyMembers.map(familyMemberId => ({
                            logEntryId: id,
                            familyMemberId: parseInt(familyMemberId.toString())
                        })),
                        { transaction }
                    );
                }
            }
    
            await transaction?.commit();
    
            // Return updated entry with associations
            return this.logEntryModel.findByPk(id, {
                include: [FamilyMember]
            });
        } catch (error) {
            await transaction?.rollback();
            throw error;
        }
      }
      
}
