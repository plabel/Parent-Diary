import DeleteFamilyMemberModal from "./delete-family-member-modal";
import UpdateFamilyMemberModal from "./update-family-member-modal";

export type FamilyMemberCardProps = {
  firstName: string;
  lastName: string;
  petName: string;
  deleteFn: (setLoading: (loading: boolean) => void) => Promise<void>;
  id: number;
  refreshFamilyMembers: () => Promise<void>;
};
export default function FamilyMemberCard({
  firstName,
  lastName,
  petName,
  id,
  deleteFn,
  refreshFamilyMembers,
}: FamilyMemberCardProps) {
  return (
    <div className="card w-100 mb-2">
      <div className="card-header">
        <span className="badge text-bg-secondary">{petName}</span>
      </div>
      <div className="card-body">
        <p>{firstName} {lastName}</p>
      </div>
      <div className="card-footer">
        <DeleteFamilyMemberModal deleteFn={deleteFn} />
        <UpdateFamilyMemberModal firstName={firstName} lastName={lastName} petName={petName} id={id} refreshFamilyMembers={refreshFamilyMembers} />
      </div>
    </div>
  );
}
