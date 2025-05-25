"use client";

import Link from "next/link";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useAlert } from "../_global/alert/alert-provider";
import createLogEntry from "./createLogEntry";

export default function LogEntryPage() {
  const showAlert = useAlert();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({
    entry: false,
  });
  return (
    <main className={`w-50 m-auto`}>
      <Form
        noValidate
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setLoading(true);
          createLogEntry(new FormData(e.currentTarget), showAlert, setFormErrors, formErrors, setLoading);
        }}
      >
        <h1 className="h3 mb-3 fw-normal">Write a new log entry</h1>
        <div className="form-floating mb-2">
          <Form.Control
            type="text"
            name="entry"
            as="textarea" 
            rows={6}
            className="form-control h-50"
            id="floatingInput"
            placeholder="name@example.com"
            required
            isInvalid={formErrors.entry}
          />
          <label htmlFor="floatingInput">Log entry</label>
          <Form.Control.Feedback type="invalid">
            Please provide a valid log entry.
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
