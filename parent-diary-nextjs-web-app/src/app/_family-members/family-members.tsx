import { useEffect, useState } from "react";
import { FamilyMember } from "./types";
import FamilyMemberCard from "./family-member-card";
import { fetchWrapper } from "../_global/helpers/fetchWrapper";
import { useAlert } from "../_global/alert/alert-provider";
import { deleteFamilyMember } from "./helpers/deleteFamilyMember";

export default function FamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const showAlert = useAlert();
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
          deleteFn={(setLoading) => deleteFamilyMember(familyMember.id, setLoading, showAlert, fetchFamilyMembers)}
          refreshLogEntries={fetchFamilyMembers}
        />
      ))}
      {familyMembers?.length === 0 && <p>No family members found</p>}
    </div>
  );
}
