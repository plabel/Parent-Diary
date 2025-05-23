"use client";
import { Form } from "react-bootstrap";
import { useAlert } from "@/app/_global/alert/alert-provider";
import { useState } from "react";
import { sendResetPasswordEmail } from "./helpers/sendResetPasswordEmail";
import Link from "next/link";

export default function SendResetPasswordEmail() {
  const showAlert = useAlert();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({
    email: false,
  });
  return (
    <main className={`centered-main w-100 m-auto`}>
      <Form
        noValidate
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setLoading(true);
          sendResetPasswordEmail(new FormData(e.currentTarget), showAlert, setFormErrors, formErrors, setLoading);
        }}
      >
        <h1 className="h3 mb-3 fw-normal">Parent Diary send reset password email</h1>
        <div className="form-floating mb-2">
          <Form.Control
            type="email"
            name="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            isInvalid={formErrors.email}
          />
          <label htmlFor="floatingInput">Email address</label>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email address.
          </Form.Control.Feedback>
        </div>
        <button disabled={loading}   className="btn btn-primary w-100 py-2 mb-2" type="submit">
          {loading ? "Sending reset password email..." : "Send reset password email"}
        </button>
      </Form>
      <Link href="/login">Back to login</Link>
    </main>
  );
}
