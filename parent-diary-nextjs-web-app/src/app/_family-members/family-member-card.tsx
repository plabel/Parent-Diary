

export type FamilyMemberCardProps = {
  firstName: string;
  lastName: string;
  petName: string;
  id: number;
  refreshLogEntries: () => Promise<void>;
};
export default function FamilyMemberCard({
  firstName,
  lastName,
  petName,
  id,
  refreshLogEntries,
}: FamilyMemberCardProps) {
  return (
    <div className="card w-100 mb-2">
      <div className="card-header">{petName}</div>
      <div className="card-body">
        <p>{firstName} {lastName}</p>
      </div>
      <div className="card-footer">
      </div>
    </div>
  );
}
