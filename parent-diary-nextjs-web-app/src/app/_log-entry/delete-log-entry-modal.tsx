import { useState } from "react";
import Modal from "react-bootstrap/Modal";

type DeleteLogEntryModalProps = {
  deleteFn: (setLoading: (loading: boolean) => void) => Promise<void>;
};

export default function DeleteLogEntryModal({
  deleteFn,
}: DeleteLogEntryModalProps) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        className="btn btn-outline-danger rounded-circle p-2 lh-1 me-1"
        type="button"
        disabled={loading}
        onClick={handleShow}
      >
        <i className="bi bi-trash"></i>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete log entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button
            disabled={loading}
            className="btn btn-danger w-100 py-2 mb-2"
            type="submit"
            onClick={() => {
              setLoading(true);
              deleteFn(setLoading);
            }}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
