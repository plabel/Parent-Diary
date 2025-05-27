import { useEffect, useState } from "react";
import { FamilyMember } from "./types";
import FamilyMemberCard from "./family-member-card";
import { useAlert } from "../_global/alert/alert-provider";
import { deleteFamilyMember } from "./helpers/deleteFamilyMember";
import { fetchFamilyMembers } from "./helpers/fetchFamilyMembers";

export default function FamilyMembers() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const showAlert = useAlert();

  useEffect(() => {
    fetchFamilyMembers(setFamilyMembers);
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
          deleteFn={(setLoading) => deleteFamilyMember(familyMember.id, setLoading, showAlert, () => fetchFamilyMembers(setFamilyMembers))}
          refreshFamilyMembers={() => fetchFamilyMembers(setFamilyMembers)}
        />
      ))}
      {familyMembers?.length === 0 && <p>No family members found</p>}
    </div>
  );
}
