import UpdateLogEntryModal from "./update-log-entry-modal";
import DeleteLogEntryModal from "./delete-log-entry-modal";

export type LogEntryCardProps = {
  entry: string;
  createdAt: string;
  deleteFn: (setLoading: (loading: boolean) => void) => Promise<void>;
  id: number;
  refreshLogEntries: () => Promise<void>;
};
export default function LogEntryCard({
  entry,
  createdAt,
  deleteFn,
  id,
  refreshLogEntries,
}: LogEntryCardProps) {
  return (
    <div className="card w-100 mb-2">
      <div className="card-header">Created at: {new Date(createdAt).toLocaleString()}</div>
      <div className="card-body">
        <p>{entry}</p>
      </div>
      <div className="card-footer">
        <DeleteLogEntryModal deleteFn={deleteFn} />
        <UpdateLogEntryModal refreshLogEntries={refreshLogEntries} entry={entry} id={id} />
      </div>
    </div>
  );
}
