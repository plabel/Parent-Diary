"use client"
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import DeleteUserModal from "../_users/delete-user-modal";
import { submitLogOut } from "../login/helpers/submitLogout";
import { useAlert } from "../_global/alert/alert-provider";
import { useEffect, useState } from "react";
import { verifySession } from "./helpers/verifySession";
import ShowOtpQrCodeModal from "./show-otp-qr-code-modal";
import ResetRecoveryCodeModal from "../_users/reset-recovery-code";
import ExportDataBtn from "../_users/export-data-btn";


export default function AppHeader({ activeLink }: { activeLink: string }) {
    const [_userId, setUserId] = useState<string | null>(null);
    useEffect(() => {
      const fetchUserId = async () => {
        const userId = await verifySession();
        setUserId(userId);
      };
      fetchUserId();
    }, []);
    const showAlert = useAlert();
    return (
        <header>
        <Navbar expand="lg" className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <Container>
            <Navbar.Brand >Parent Diary</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link active={activeLink === "home"} href="/home">Home</Nav.Link>
                <Nav.Link active={activeLink === "family-members"} href="/family-members">Family members</Nav.Link>
                <Nav.Link href="/log-entry">New log entry</Nav.Link>
                <Nav.Link href="/new-family-member">New family member</Nav.Link>
                <NavDropdown title="User" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => submitLogOut(showAlert)}>
                    Log out
                  </NavDropdown.Item>
                  <ShowOtpQrCodeModal />
                  <ResetRecoveryCodeModal />
                  <ExportDataBtn />
                  <DeleteUserModal />
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
}