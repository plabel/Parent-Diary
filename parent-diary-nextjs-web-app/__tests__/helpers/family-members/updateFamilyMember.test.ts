import updateFamilyMember from '@/app/_family-members/helpers/updateFamilyMember';
import { fetchWrapper } from '@/app/_global/helpers/fetchWrapper';
import { testCases } from './updateFamilyMember.fixtures';

jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
  fetchWrapper: jest.fn(),
}));

describe('updateFamilyMember', () => {
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
      await updateFamilyMember(
        1,
        formData,
        showAlertFn,
        () => {},
        {},
        () => {},
        async () => {},
        () => {},
      );
      expect(showAlertFn).toHaveBeenCalledTimes(showAlertNbOfCalls);
      if (showAlertNbOfCalls > 0)
        expect(showAlertFn).toHaveBeenCalledWith(...showAlertArgs);
    },
  );
});
