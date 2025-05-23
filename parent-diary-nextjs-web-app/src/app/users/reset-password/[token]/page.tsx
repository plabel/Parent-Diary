"use client";
import { useAlert } from "@/app/_global/alert/alert-provider";
import { Usable, useState, use } from "react";
import { Form } from "react-bootstrap";
import { resetPassword } from "./helpers/resetPassword";
import Link from "next/link";
type ResetPasswordProps = {
  params: Usable<{
    token: string;
  }>;
};

export default function ResetPassword({ params }: ResetPasswordProps) {
  const showAlert = useAlert();
  const token = use(params).token;
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({
    password: false,
    confirmPassword: false,
  });

  return (
    <main className={"centered-main w-100 m-auto"}>
      <Form
        noValidate
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setLoading(true);
          resetPassword(new FormData(e.currentTarget), token, showAlert, setFormErrors, formErrors, setLoading);
        }}
      >
        <h1 className="h3 mb-3 fw-normal">Parent Diary reset password</h1>
        <div className="form-floating mb-2">
          <Form.Control
            type="password"
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            isInvalid={formErrors.password}
          />
          <label htmlFor="floatingPassword">Password </label>
          <Form.Control.Feedback type="invalid">
            Please provide a valid password. At least 12 characters. Must
            contain at least one uppercase letter and one number. 
          </Form.Control.Feedback>
        </div>
        <div className="form-floating mb-2">
          <Form.Control
            type="password"
            name="confirmPassword"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            isInvalid={formErrors.confirmPassword}
          />
          <label htmlFor="floatingPassword">Confirm password </label>
          <Form.Control.Feedback type="invalid">
            Passwords must match.
          </Form.Control.Feedback>
        </div>
        <button disabled={loading}   className="btn btn-primary w-100 py-2 mb-2" type="submit">
          {loading ? "Resetting password..." : "Reset password"}
        </button>
      </Form>
      <Link href="/login">Back to login</Link>
    </main>
  );
}
