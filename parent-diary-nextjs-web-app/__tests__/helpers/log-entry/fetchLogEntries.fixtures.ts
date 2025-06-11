type FetchLogEntriesTestCase = {
  description: string;
  fetchWrapperMockResult: any;
  setLogEntriesArgs: any[];
  createdAfter: Date | null;
  createdBefore: Date | null;
};

export const testCases: FetchLogEntriesTestCase[] = [
  {
    description: 'should fetch log entries',
    fetchWrapperMockResult: {
      data: [],
      error: null,
    },
    setLogEntriesArgs: [[]],
    createdAfter: null,
    createdBefore: null,
  },
  {
    description: 'should fetch log entries, fetch error',
    fetchWrapperMockResult: {
      data: null,
      error: {
        message: 'Fetch error',
      },
    },
    setLogEntriesArgs: [[]],
    createdAfter: null,
    createdBefore: null,
  },
  {
    description: 'should fetch log entries, fetches 1 entry',
    fetchWrapperMockResult: {
      data: [
        {
          id: 1,
          entry: 'Test entry',
          createdAt: '2021-01-01',
        },
      ],
      error: null,
    },
    setLogEntriesArgs: [
      [
        {
          id: 1,
          entry: 'Test entry',
          createdAt: '2021-01-01',
        },
      ],
    ],
    createdAfter: null,
    createdBefore: null,
  },
  {
    description: 'should fetch log entries, with date filters',
    fetchWrapperMockResult: {
      data: [],
      error: null,
    },
    setLogEntriesArgs: [[]],
    createdAfter: new Date('2021-01-01'),
    createdBefore: new Date('2021-01-02'),
  },
];
