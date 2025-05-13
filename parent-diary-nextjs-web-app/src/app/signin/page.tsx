"use client";
import { useAlert } from "../_global/alert/alert-provider";
import { submitSignIn } from "./helpers/submitSignIn";
import styles from "./styles.module.css";

export default function SignIn() {
  const showAlert = useAlert();
  return (
    <main className={`centered-main w-100 m-auto`}>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          submitSignIn(new FormData(e.currentTarget), showAlert);
        }}
      >
        <h1 className="h3 mb-3 fw-normal">Parent Diary sign in</h1>
        <div className="form-floating">
          <input
            type="email"
            name="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            name="firstName"
            className="form-control"
            id="floatingFirstName"
            placeholder="First Name"
            required
          />
          <label htmlFor="floatingFirstName">First Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            name="lastName"
            className="form-control"
            id="floatingLastName"
            placeholder="Last Name"
            required
          />
          <label htmlFor="floatingLastName">Last Name</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-body-secondary">© 2025</p>
      </form>
    </main>
  );
}
