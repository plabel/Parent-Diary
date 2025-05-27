import DeleteFamilyMemberModal from "./delete-family-member-modal";


export type FamilyMemberCardProps = {
  firstName: string;
  lastName: string;
  petName: string;
  deleteFn: (setLoading: (loading: boolean) => void) => Promise<void>;
  id: number;
  refreshLogEntries: () => Promise<void>;
};
export default function FamilyMemberCard({
  firstName,
  lastName,
  petName,
  id,
  deleteFn,
  refreshLogEntries,
}: FamilyMemberCardProps) {
  return (
    <div className="card w-100 mb-2">
      <div className="card-header">{petName}</div>
      <div className="card-body">
        <p>{firstName} {lastName}</p>
      </div>
      <div className="card-footer">
        <DeleteFamilyMemberModal deleteFn={deleteFn} />
      </div>
    </div>
  );
}
