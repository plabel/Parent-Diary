import { useState } from "react";

export type LogEntryCardProps = {
  entry: string;
  createdAt: string;
  deleteFn: (setLoading: (loading: boolean) => void) => Promise<void>;
};
export default function LogEntryCard({
  entry,
  createdAt,
  deleteFn,
}: LogEntryCardProps) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="card w-100 mb-2">
      <div className="card-header">Created at: {createdAt}</div>
      <div className="card-body">
        <p>{entry}</p>
      </div>
      <div className="card-footer">
        <button
          className="btn btn-outline-danger rounded-circle p-2 lh-1"
          type="button"
          disabled={loading}
          onClick={() => deleteFn(setLoading)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}
