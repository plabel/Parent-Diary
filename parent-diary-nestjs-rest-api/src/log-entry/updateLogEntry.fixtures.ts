import { LogEntry } from "./log-entry.model";

type UpdateLogEntryTestCase = {
  description: string;
  id: number,
  logEntry: Partial<LogEntry>,
  userId: number,
  expectedResult: LogEntry | null;
  expectedError: Error | null;
};

export const updateLogEntryTestCases: UpdateLogEntryTestCase[] = [
  {
    description: 'should update a log entry',
    id: 1,
    logEntry: {
      entry: 'This is a test log entry',
    },
    userId: 1,
    expectedResult: null,
    expectedError: null,
  },
  {
    description: 'should update a log entry with family members',
    id: 1,
    logEntry: {
      entry: 'This is a test log entry',
      familyMembers: [1, 2],
    } as unknown as LogEntry,
    userId: 1,
    expectedResult: null,
    expectedError: null,
  },
];