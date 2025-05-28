import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useAlert } from "../_global/alert/alert-provider";
import { Form } from "react-bootstrap";
import updateLogEntry from "./helpers/updateLogEntry";
import { FamilyMember } from "../_family-members/types";
import { useFamilyMembersContext } from "../_family-members/family-member-context";

type UpdateLogEntryModalProps = {
  entry: string;
  id: number;
  refreshLogEntries: () => Promise<void>;
  familyMembers: FamilyMember[];
};

function UpdateLogEntryModal({
  entry,
  id,
  refreshLogEntries,
  familyMembers,
}: UpdateLogEntryModalProps) {
  const allFamilyMembers = useFamilyMembersContext();
  const [show, setShow] = useState(false);
  const showAlert = useAlert();
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({
    entry: false,
  });
  return (
    <>
      <button
        className="btn btn-outline-secondary rounded-circle p-2 lh-1 me-1"
        type="button"
        onClick={handleShow}
      >
        <i className="bi bi-pencil"></i>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update log entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              setLoading(true);
              updateLogEntry(
                id,
                new FormData(e.currentTarget),
                showAlert,
                setFormErrors,
                formErrors,
                setLoading,
                refreshLogEntries,
                handleClose
              );
            }}
          >
          <div className="form-floating mb-2">
            <h5>Family members</h5>
            {allFamilyMembers.map((familyMember) => (
              <Form.Check // prettier-ignore
                key={familyMember.id}
                type={"checkbox"}
                defaultChecked={familyMembers.find((fm) => fm.id === familyMember.id) !== undefined}
                name="familyMembers"
                value={familyMember.id}
                label={familyMember.petName}
              />
            ))}
          </div>
            <div className="form-floating mb-2">
              <Form.Control
                type="text"
                name="entry"
                defaultValue={entry}
                as="textarea"
                rows={6}
                className="form-control h-50"
                id="floatingInput"
                placeholder="name@example.com"
                required
                isInvalid={formErrors.entry}
              />
              <label htmlFor="floatingInput">Log entry</label>
              <Form.Control.Feedback type="invalid">
                Please provide a valid log entry.
              </Form.Control.Feedback>
            </div>
            <button
              disabled={loading}
              className="btn btn-success w-100 py-2 mb-2"
              type="submit"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateLogEntryModal;
