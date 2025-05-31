import { useEffect, useState } from "react";
import { Modal, NavDropdown } from "react-bootstrap";
import { getOtpKeyUri } from "./helpers/getOtpKeyUri";
import { useAlert } from "./alert/alert-provider";
import QRCode from 'qrcode'

export default function ShowOtpQrCodeModal() {
  const [show, setShow] = useState(false);
  const [otpAuthUrl, setOtpAuthUrl] = useState<string | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const showAlert = useAlert();
  useEffect(() => {
    getOtpKeyUri(setOtpAuthUrl, showAlert);
  }, []);

  useEffect(() => {
    if (!otpAuthUrl) return;

    QRCode.toDataURL(otpAuthUrl)
      .then((url) => setQrCodeUrl(url))
      .catch((error) => {
        console.error("Failed to generate QR code:", error);
        setQrCodeUrl("");
      });
  }, [otpAuthUrl]);
  return (
    <>
      <NavDropdown.Item onClick={handleShow}>Show Otp QrCode</NavDropdown.Item>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Scan the Otp QrCode with your authenticator app </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {qrCodeUrl && (
            <img
              src={qrCodeUrl}
              alt="QR Code for 2FA"
              width={200}
              height={200}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
