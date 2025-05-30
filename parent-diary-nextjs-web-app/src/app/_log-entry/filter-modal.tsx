import { Modal, Form } from "react-bootstrap";
import { Dispatch, SetStateAction, useState } from "react";
import { FamilyMember } from "../_family-members/types";

type FilterModalProps = {
  allFamilyMembers: FamilyMember[];
  selectedFamilyMembers: FamilyMember[];
  setSelectedFamilyMembers: (familyMembers: FamilyMember[]) => void;
  createdAfter: Date | null;
  createdBefore: Date | null;
  setCreatedAfter: Dispatch<SetStateAction<Date | null>>;
  setCreatedBefore: Dispatch<SetStateAction<Date | null>>;
};

export default function FilterModal({
  allFamilyMembers,
  selectedFamilyMembers,
  setSelectedFamilyMembers,
  createdAfter,
  createdBefore,
  setCreatedAfter,
  setCreatedBefore,
}: FilterModalProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const datesAreInvalid =
    (createdAfter && createdBefore && createdAfter > createdBefore) ?? false;
  return (
    <>
      <button
        className="btn btn-dark rounded-circle p-2 lh-1 me-1"
        type="button"
        onClick={handleShow}
      >
        <i className="bi bi-filter"></i>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter log entries</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-floating mb-2">
            <h5>Filter by family members</h5>
            {allFamilyMembers?.map((familyMember) => (
              <Form.Check // prettier-ignore
                key={familyMember.id}
                type={"checkbox"}
                checked={
                  selectedFamilyMembers.find(
                    (fm) => fm.id === familyMember.id
                  ) !== undefined
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFamilyMembers([
                      ...selectedFamilyMembers,
                      familyMember,
                    ]);
                  } else {
                    setSelectedFamilyMembers(
                      selectedFamilyMembers.filter(
                        (fm) => fm.id !== familyMember.id
                      )
                    );
                  }
                }}
                name="familyMembers"
                value={familyMember.id}
                label={familyMember.petName}
              />
            ))}
          </div>
          <div className="form-floating mb-2">
            <h5>Filter by date</h5>
            <Form.Group className="mb-3">
              <Form.Label>Created after</Form.Label>
              <Form.Control
                type="date"
                value={
                  createdAfter ? createdAfter.toISOString().split("T")[0] : ""
                }
                onChange={(e) =>
                  setCreatedAfter(
                    e.target.value ? new Date(e.target.value) : null
                  )
                }
                isInvalid={datesAreInvalid}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Created before</Form.Label>
              <Form.Control
                type="date"
                value={
                  createdBefore ? createdBefore.toISOString().split("T")[0] : ""
                }
                onChange={(e) =>
                  setCreatedBefore(
                    e.target.value ? new Date(e.target.value) : null
                  )
                }
                isInvalid={datesAreInvalid}
              />
              <Form.Control.Feedback type="invalid">
                The date range is invalid.
              </Form.Control.Feedback>
            </Form.Group>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setCreatedAfter(null);
                setCreatedBefore(null);
              }}
            >
              Clear dates
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
