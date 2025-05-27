import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useAlert } from "../_global/alert/alert-provider";
import { Form } from "react-bootstrap";
import updateFamilyMember from "./helpers/updateFamilyMember";

type UpdateFamilyMemberModalProps = {
  firstName: string;
  lastName: string;
  petName: string;
  id: number;
  refreshFamilyMembers: () => Promise<void>;
};

function UpdateFamilyMemberModal({
  firstName,
  lastName,
  petName,
  id,
  refreshFamilyMembers,
}: UpdateFamilyMemberModalProps) {
  const [show, setShow] = useState(false);
  const showAlert = useAlert();
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({
    firstName: false,
    lastName: false,
    petName: false,
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
          <Modal.Title>Update family member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              setLoading(true);
              updateFamilyMember(
                id,
                new FormData(e.currentTarget),
                showAlert,
                setFormErrors,
                formErrors,
                setLoading,
                refreshFamilyMembers,
                handleClose
              );
            }}
          >
            <div className="form-floating mb-2">
              <Form.Control
                type="text"
                name="firstName"
                defaultValue={firstName}
                className="form-control h-50"
                id="floatingInput"
                placeholder="name@example.com"
                required
                isInvalid={formErrors.firstName}
              />
              <label htmlFor="floatingInput">First name</label>
              <Form.Control.Feedback type="invalid">
                Please provide a valid first name.
              </Form.Control.Feedback>
            </div>
            <div className="form-floating mb-2">
              <Form.Control
                type="text"
                name="lastName"
                defaultValue={lastName}
                className="form-control h-50"
                id="floatingInput"
                placeholder="name@example.com"
                required
                isInvalid={formErrors.lastName}
              />
              <label htmlFor="floatingInput">Last name</label>
              <Form.Control.Feedback type="invalid">
                Please provide a valid last name.
              </Form.Control.Feedback>
            </div>
            <div className="form-floating mb-2">
              <Form.Control
                type="text"
                name="petName"
                defaultValue={petName}
                className="form-control h-50"
                id="floatingInput"
                placeholder="name@example.com"
                required
                isInvalid={formErrors.petName}
              />
              <label htmlFor="floatingInput">Pet name</label>
              <Form.Control.Feedback type="invalid">
                Please provide a valid pet name.
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

export default UpdateFamilyMemberModal;
