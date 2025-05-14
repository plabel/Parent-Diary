export type FetchWrapperTestCase = {
  description: string;
  url: string;
  options: RequestInit;
  expected: unknown;
  fetchMock: typeof global.fetch;
};

export const testCases: FetchWrapperTestCase[] = [
  {
    description: `
          Given a valid url and options
          When the server responds but an error occurs
          Then the return should have an error
        `,
    url: "https://api.example.com",
    options: {
      method: "GET",
    },
    expected: {
      error: true,
    },
    fetchMock: () =>
      Promise.resolve({
        json: async () => ({
          error: true,
        }),
      } as unknown as Response),
  },
  {
    description: `
          Given a valid url and options
          When the server request times out
          Then the return should be handled by the catch block
        `,
    url: "https://api.example.com",
    options: {
      method: "GET",
    },
    expected: {
      data: null,
      error: {
        message: "Failed to fetch data, check your internet connection",
      },
    },
    fetchMock: () => Promise.reject(new Error("Timeout")),
  },
];
