import { fetchWrapper } from '@/app/_global/helpers/fetchWrapper';
import { deleteFamilyMember } from '@/app/_family-members/helpers/deleteFamilyMember';
import { testCases } from './deleteFamilyMember.fixtures';
jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
  fetchWrapper: jest.fn(),
}));

describe('deleteFamilyMember', () => {
  test.each(testCases)(
    '$description',
    async ({ fetchWrapperMockResult, showAlertArgs }) => {
      (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
      const showAlertFn = jest.fn();
      await deleteFamilyMember(
        1,
        () => {},
        showAlertFn,
        () => {},
      );
      expect(showAlertFn).toHaveBeenCalledWith(...showAlertArgs);
    },
  );
});
