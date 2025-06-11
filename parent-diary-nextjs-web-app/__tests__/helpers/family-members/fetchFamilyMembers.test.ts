import { fetchFamilyMembers } from '@/app/_family-members/helpers/fetchFamilyMembers';
import { fetchWrapper } from '@/app/_global/helpers/fetchWrapper';
import { testCases } from './fetchFamilyMembers.fixtures';

jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
  fetchWrapper: jest.fn(),
}));

describe('fetchFamilyMembers', () => {
  test.each(testCases)(
    '$description',
    async ({ fetchWrapperMockResult, setFamilyMembersArgs }) => {
      (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
      const setFamilyMembersFn = jest.fn();
      await fetchFamilyMembers(setFamilyMembersFn);
      expect(setFamilyMembersFn).toHaveBeenCalledWith(...setFamilyMembersArgs);
    },
  );
});
