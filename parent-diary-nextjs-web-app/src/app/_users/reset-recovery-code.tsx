import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAlert } from '../_global/alert/alert-provider';
import { NavDropdown } from 'react-bootstrap';
import { resetRecoveryCode } from './helpers/resetRecoveryCode';

function ResetRecoveryCodeModal() {
  const [show, setShow] = useState(false);
  const showAlert = useAlert();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item className='text-warning' onClick={handleShow}>
        Reset recovery code
      </NavDropdown.Item>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset recovery code</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to reset your recovery code?</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => {
            resetRecoveryCode(showAlert);
            handleClose();
          }}>
            Reset recovery code
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResetRecoveryCodeModal;