"use client";
import { useState, useEffect } from "react";
import { verifySession } from "../_global/helpers/verifySession";
import { submitLogOut } from "../login/helpers/submitLogout";
import { useAlert } from "../_global/alert/alert-provider";
import DeleteUserModal from "../_users/delete-user-modal";
import LogEntries from "../_log-entry/log-entries";
import { Nav, NavDropdown } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
export default function LogIn() {
  const showAlert = useAlert();
  const [_userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await verifySession();
      setUserId(userId);
    };
    fetchUserId();
  }, []);
  return (
    <>
      <header>
        <Navbar expand="lg" className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <Container>
            <Navbar.Brand href="#home">Parent Diary</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/log-entry">New log entry</Nav.Link>
                <NavDropdown title="User" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => submitLogOut(showAlert)}>
                    Log out
                  </NavDropdown.Item>
                  <DeleteUserModal />
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main className={`w-100 m-auto`}>
        <div className="container pt-5">
          <LogEntries />
        </div>
      </main>
    </>
  );
}
