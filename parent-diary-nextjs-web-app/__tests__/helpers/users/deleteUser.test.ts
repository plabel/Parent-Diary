import { deleteUser } from '@/app/_users/helpers/deleteUser';
import { fetchWrapper } from '@/app/_global/helpers/fetchWrapper';
import { testCases } from './deleteUser.fixtures';
jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
  fetchWrapper: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('deleteUser', () => {
  test.each(testCases)(
    '$description',
    async ({ fetchWrapperMockResult, showAlertNbOfCalls, showAlertArgs }) => {
      (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
      const showAlertFn = jest.fn();
      await deleteUser(showAlertFn);
      if (showAlertNbOfCalls > 0)
        expect(showAlertFn).toHaveBeenCalledWith(...showAlertArgs);
    },
  );
});
