"use client";
import { Form } from "react-bootstrap";
import { useAlert } from "../_global/alert/alert-provider";
import { submitSignIn } from "./helpers/submitSignIn";
import { useState } from "react";
import Link from "next/link";

export default function SignIn() {
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
          submitSignIn(new FormData(e.currentTarget), showAlert, setFormErrors, formErrors, setLoading);
        }}
      >
        <h1 className="h3 mb-3 fw-normal">Parent Diary sign up</h1>
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
        <div className="form-floating mb-2">
          <Form.Control
            type="text"
            name="firstName"
            className="form-control"
            id="floatingFirstName"
            placeholder="First Name"
            required
            isInvalid={formErrors.firstName}
          />
          <label htmlFor="floatingFirstName">First Name</label>
          <Form.Control.Feedback type="invalid">
            Please provide a valid first name.
          </Form.Control.Feedback>
        </div>
        <div className="form-floating mb-2">
          <Form.Control
            type="text"
            name="lastName"
            className="form-control"
            id="floatingLastName"
            placeholder="Last Name"
            required
            isInvalid={formErrors.lastName}
          />
          <label htmlFor="floatingLastName">Last Name</label>
          <Form.Control.Feedback type="invalid">
            Please provide a valid last name.
          </Form.Control.Feedback>
        </div>
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
          <small>At least 12 characters. Must
          contain at least one uppercase letter and one number.</small>
        </div>
        <button disabled={loading}   className="btn btn-primary w-100 py-2 mb-2" type="submit">
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </Form>
      <Link href="/login">Login</Link>
    </main>
  );
}
