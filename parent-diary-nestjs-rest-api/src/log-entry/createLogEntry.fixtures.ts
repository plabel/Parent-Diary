import { LogEntry } from "./log-entry.model";

type CreateLogEntryTestCase = {
  description: string;
  fakeLogEntry: LogEntry;
  expectedResult: LogEntry;
  expectedError: Error | null;
};

const fakeLogEntry: LogEntry = {
    dataValues: {
        id: 1,
        entry: 'This is a test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
} as LogEntry;

export const createLogEntryTestCases: CreateLogEntryTestCase[] = [
  {
    description: 'should create a log entry',
    fakeLogEntry: fakeLogEntry,
    expectedResult: fakeLogEntry,
    expectedError: null,
  },
  {
    description: 'should not create a log entry, an error was thrown',
    fakeLogEntry: {} as LogEntry,
    expectedResult: {} as LogEntry,
    expectedError: new TypeError("Cannot read properties of undefined (reading 'familyMembers')"),
  },
  {
    description: 'should create a log entry with family members',
    fakeLogEntry: {
        ...fakeLogEntry,
        familyMembers: [1, 2],
    } as unknown as LogEntry,
    expectedResult: {
        ...fakeLogEntry,
        familyMembers: [1, 2],
    } as unknown as LogEntry,
    expectedError: null,
  },
];