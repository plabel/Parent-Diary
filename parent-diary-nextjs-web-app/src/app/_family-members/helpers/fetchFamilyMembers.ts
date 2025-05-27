import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { FamilyMember } from "../types";

export const fetchFamilyMembers = async (
  setFamilyMembers: (familyMembers: FamilyMember[]) => void
) => {
  const response = await fetchWrapper<FamilyMember[]>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/family-member`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  setFamilyMembers(response.data);
};
