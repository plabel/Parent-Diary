export type LogEntryCardProps = {
    entry: string;
    createdAt: string;
}
export default function LogEntryCard({entry, createdAt}: LogEntryCardProps) {
  return (
    <div className="card w-100 mb-2">
      <div className="card-header">Created at: {createdAt}</div>
      <div className="card-body">
        <p>{entry}</p>
      </div>
    </div>
  );
}
