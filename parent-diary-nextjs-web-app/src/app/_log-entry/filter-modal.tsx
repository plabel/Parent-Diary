import { Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { FamilyMember } from "../_family-members/types";

type FilterModalProps = {
  allFamilyMembers: FamilyMember[],
  selectedFamilyMembers: FamilyMember[],
  setSelectedFamilyMembers: (familyMembers: FamilyMember[]) => void
}

export default function FilterModal({ allFamilyMembers, selectedFamilyMembers, setSelectedFamilyMembers }: FilterModalProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return <>
    <button
        className="btn btn-dark rounded-circle p-2 lh-1 me-1"
        type="button"
        onClick={handleShow}
    >
        <i className="bi bi-filter"></i>
    </button>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter log entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-floating mb-2">
            <h5>Family members</h5>
            {allFamilyMembers?.map((familyMember) => (
              <Form.Check // prettier-ignore
                key={familyMember.id}
                type={"checkbox"}
                checked={selectedFamilyMembers.find((fm) => fm.id === familyMember.id) !== undefined}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFamilyMembers([...selectedFamilyMembers, familyMember]);
                  } else {
                    setSelectedFamilyMembers(selectedFamilyMembers.filter((fm) => fm.id !== familyMember.id));
                  }
                }}
                name="familyMembers"
                value={familyMember.id}
                label={familyMember.petName}
              />
            ))}
          </div>
        </Modal.Body>
      </Modal>       
  </>;
}