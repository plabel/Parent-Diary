import { submitLogIn } from '@/app/login/helpers/submitLogIn';
import { fetchWrapper } from '@/app/_global/helpers/fetchWrapper';
import { testCases } from './submitLogIn.fixtures';
jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
  fetchWrapper: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('submitLogIn', () => {
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
      await submitLogIn(
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
