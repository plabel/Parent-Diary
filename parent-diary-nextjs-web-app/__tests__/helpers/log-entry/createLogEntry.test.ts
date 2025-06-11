import { fetchWrapper } from '@/app/_global/helpers/fetchWrapper';
import createLogEntry from '@/app/log-entry/helpers/createLogEntry';
import { testCases } from './createLogEntry.fixtures';

jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
  fetchWrapper: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('createLogEntry', () => {
  test.each(testCases)(
    '$description',
    async ({
      fetchWrapperMockResult,
      showAlertNbOfCalls,
      showAlertArgs,
      formData,
    }) => {
      (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
      const showAlertFn = jest.fn();
      await createLogEntry(
        formData,
        showAlertFn,
        () => {},
        {},
        () => {},
      );
      if (showAlertNbOfCalls > 0)
        expect(showAlertFn).toHaveBeenCalledWith(...showAlertArgs);
    },
  );
});
