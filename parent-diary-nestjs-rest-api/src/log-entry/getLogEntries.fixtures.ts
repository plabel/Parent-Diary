import { LogEntry } from './log-entry.model';

type GetLogEntriesTestCase = {
  description: string;
  userId: number;
  page: number;
  search: string;
  sort: string;
  familyMembers: number[];
  createdAfter: string;
  createdBefore: string;
  expectedResult: LogEntry[];
  expectedError: Error | null;
};

export const getLogEntriesTestCases: GetLogEntriesTestCase[] = [
  {
    description: 'should get log entries',
    userId: 1,
    page: 1,
    search: '',
    sort: '',
    familyMembers: [],
    createdAfter: '',
    createdBefore: '',
    expectedResult: [],
    expectedError: null,
  },
  {
    description: 'should get log entries with search',
    userId: 1,
    page: 1,
    search: 'test',
    sort: '',
    familyMembers: [],
    createdAfter: '',
    createdBefore: '',
    expectedResult: [],
    expectedError: null,
  },
];
