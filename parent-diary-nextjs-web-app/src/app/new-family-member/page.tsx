"use client";

import Link from "next/link";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useAlert } from "../_global/alert/alert-provider";
import createFamilyMember from "./helpers/createFamilyMember";
export default function LogEntryPage() {
  const showAlert = useAlert();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({
    firstName: false,
    lastName: false,
    petName: false,
  });
  return (
    <main className={`w-50 m-auto`}>
      <Form
        noValidate
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setLoading(true);
          createFamilyMember(new FormData(e.currentTarget), showAlert, setFormErrors, formErrors, setLoading);
        }}
      >
        <h1 className="h3 mb-3 fw-normal">Add a new family member</h1>
        <div className="form-floating mb-2">
          <Form.Control
            type="text"
            name="firstName"
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
      <div className="d-flex justify-content-between">
        <Link href="/home">Back to home</Link>
      </div>
    </main>
  );
}
