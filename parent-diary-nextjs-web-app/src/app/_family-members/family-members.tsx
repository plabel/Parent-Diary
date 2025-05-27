import { useEffect, useState } from "react";
import { FamilyMember } from "./types";
import FamilyMemberCard from "./family-member-card";
import { fetchWrapper } from "../_global/helpers/fetchWrapper";

export default function FamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const fetchFamilyMembers = async () => {
    const response = await fetchWrapper<FamilyMember[]>(
      `${process.env.NEXT_PUBLIC_REST_API_URL}/family-member`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    setFamilyMembers(response.data);
  };
  useEffect(() => {
    fetchFamilyMembers();
  }, []);
  return (
    <div>
      {familyMembers?.map((familyMember) => (
        <FamilyMemberCard
          key={familyMember.id}
          firstName={familyMember.firstName}
          lastName={familyMember.lastName}
          petName={familyMember.petName}
          id={familyMember.id}
          refreshLogEntries={fetchFamilyMembers}
        />
      ))}
      {familyMembers?.length === 0 && <p>No family members found</p>}
    </div>
  );
}
