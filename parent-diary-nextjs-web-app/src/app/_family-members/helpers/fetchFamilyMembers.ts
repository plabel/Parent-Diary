import { fetchWrapper } from '@/app/_global/helpers/fetchWrapper';
import { FamilyMember } from '../types';

/**
 * Fetch family members
 * @param setFamilyMembers - The function to set the family members
 * @returns The family members
 */
export const fetchFamilyMembers = async (
  setFamilyMembers: (familyMembers: FamilyMember[]) => void,
) => {
  const response = await fetchWrapper<FamilyMember[]>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/family-member`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  setFamilyMembers(response.data ?? []);
};
