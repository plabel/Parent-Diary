"use client";
import { Form } from "react-bootstrap";
  import { useAlert } from "../_global/alert/alert-provider";
  import { submitLogIn } from "./helpers/submitLogIn";
import { useState } from "react";

export default function LogIn() {
  const showAlert = useAlert();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({
    email: false,
    firstName: false,
    lastName: false,
    password: false,
  });
  return (
    <main className={`centered-main w-100 m-auto`}>
      <Form
        noValidate
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setLoading(true);
          submitLogIn(new FormData(e.currentTarget), showAlert, setFormErrors, formErrors, setLoading);
        }}
      >
        <h1 className="h3 mb-3 fw-normal">Parent Diary log in</h1>
        <div className="form-floating">
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
        <div className="form-floating">
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
        </div>
        <button disabled={loading}   className="btn btn-primary w-100 py-2" type="submit">
          {loading ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </main>
  );
}
