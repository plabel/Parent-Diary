import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FamilyMemberLogEntries, LogEntry } from './log-entry.model';
import { FamilyMember } from '../family-member/family-member.model';
import { Includeable, Op, Sequelize, WhereOptions } from 'sequelize';

@Injectable()
export class LogEntryService {
  constructor(
    @InjectModel(LogEntry)
    private logEntryModel: typeof LogEntry,
    @InjectModel(FamilyMemberLogEntries)
    private familyMemberLogEntriesModel: typeof FamilyMemberLogEntries,
  ) {}
  /**
   * Create a log entry
   * @param logEntry - The log entry to create
   * @returns The created log entry
   */
  async createLogEntry(logEntry: Partial<LogEntry>): Promise<LogEntry | null> {
    const transaction = await this.logEntryModel.sequelize?.transaction();

    try {
      // Update the log entry
      const newLogEntry = await this.logEntryModel.create(logEntry, {
        transaction,
      });

      if (logEntry.familyMembers && logEntry.familyMembers.length > 0) {
        await this.familyMemberLogEntriesModel.bulkCreate(
          logEntry.familyMembers.map((familyMemberId) => ({
            logEntryId: newLogEntry.dataValues.id,
            familyMemberId: parseInt(familyMemberId.toString()),
          })),
          { transaction },
        );
      }

      await transaction?.commit();

      // Return updated entry with associations
      return this.logEntryModel.findByPk(newLogEntry.dataValues.id, {
        include: [FamilyMember],
      });
    } catch (error) {
      await transaction?.rollback();
      throw error;
    }
  }
  /**
   * Get log entries
   * @param userId - The ID of the user
   * @param page - The page number
   * @param search - The search query
   * @param sort - The sort order
   * @param familyMembers - The IDs of the family members
   * @param createdAfter - The creation date after
   * @param createdBefore - The creation date before
   * @returns The log entries
   */
  async getLogEntries(
    userId: number,
    page: number,
    search: string,
    sort: string,
    familyMembers: number[],
    createdAfter: string,
    createdBefore: string,
  ): Promise<LogEntry[]> {
    const limit = 10;
    const offset = (page - 1) * limit;
    const where: WhereOptions<LogEntry> = {
      userId,
      ...(familyMembers?.length > 0 && {
        [Op.and]: [
          Sequelize.literal(`EXISTS (
                        SELECT 1 
                        FROM FamilyMemberLogEntries fme 
                        WHERE fme.logEntryId = LogEntry.id 
                        AND fme.familyMemberId IN (${familyMembers.join(',')})
                    )`),
        ],
      }),
      ...(createdAfter && {
        createdAt: {
          [Op.gte]: createdAfter,
        },
      }),
      ...(createdBefore && {
        createdAt: {
          [Op.lte]: createdBefore,
        },
      }),
      ...(createdAfter &&
        createdBefore && {
          createdAt: {
            [Op.between]: [createdAfter, createdBefore],
          },
        }),
    };
    const include: Includeable[] = [
      {
        model: FamilyMember,
      },
    ];
    if (search) {
      where.entry = { [Op.like]: `%${search}%` };
    }

    return this.logEntryModel.findAll({
      include,
      where,
      limit,
      offset,
      order: [['createdAt', sort]],
    });
  }
  /**
   * Get all log entries for a user
   * @param userId - The ID of the user
   * @returns The log entries
   */
  async getAllLogEntries(userId: number): Promise<LogEntry[]> {
    return this.logEntryModel.findAll({
      include: [FamilyMember],
      where: { userId },
    });
  }
  /**
   * Delete a log entry
   * @param id - The ID of the log entry
   * @param userId - The ID of the user
   * @returns True if the log entry was deleted, false otherwise
   */
  async deleteLogEntry(id: number, userId: number): Promise<boolean> {
    const result = await this.logEntryModel.destroy({ where: { id, userId } });
    return result === 1;
  }
  /**
   * Update a log entry
   * @param id - The ID of the log entry
   * @param logEntry - The log entry to update
   * @param userId - The ID of the user
   * @returns The updated log entry
   */
  async updateLogEntry(
    id: number,
    logEntry: Partial<LogEntry>,
    userId: number,
  ): Promise<LogEntry | null> {
    const transaction = await this.logEntryModel.sequelize?.transaction();

    try {
      // Update the log entry
      await this.logEntryModel.update(
        { entry: logEntry.entry },
        { where: { id, userId }, transaction },
      );

      if (logEntry.familyMembers) {
        // Remove existing associations
        await this.familyMemberLogEntriesModel.destroy({
          where: { logEntryId: id },
          transaction,
        });

        // Create new associations
        if (logEntry.familyMembers.length > 0) {
          await this.familyMemberLogEntriesModel.bulkCreate(
            logEntry.familyMembers.map((familyMemberId) => ({
              logEntryId: id,
              familyMemberId: parseInt(familyMemberId.toString()),
            })),
            { transaction },
          );
        }
      }

      await transaction?.commit();

      // Return updated entry with associations
      return this.logEntryModel.findByPk(id, {
        include: [FamilyMember],
      });
    } catch (error) {
      await transaction?.rollback();
      throw error;
    }
  }
}
