import { useState } from "react";
import UpdateLogEntryModal from "./update-log-entry-modal";

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
  const [loading, setLoading] = useState(false);
  return (
    <div className="card w-100 mb-2">
      <div className="card-header">Created at: {new Date(createdAt).toLocaleString()}</div>
      <div className="card-body">
        <p>{entry}</p>
      </div>
      <div className="card-footer">
        <button
          className="btn btn-outline-danger rounded-circle p-2 lh-1 me-1"
          type="button"
          disabled={loading}
          onClick={() => deleteFn(setLoading)}
        >
          <i className="bi bi-trash"></i>
        </button>
        <UpdateLogEntryModal refreshLogEntries={refreshLogEntries} entry={entry} id={id} />
      </div>
    </div>
  );
}
