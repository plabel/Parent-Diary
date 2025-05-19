"use client";
import { useState, useEffect } from "react";
import { verifySession } from "../_global/helpers/verifySession";
import { submitLogOut } from "../login/helpers/submitLogout";
import { useAlert } from "../_global/alert/alert-provider";
import DeleteUserModal from "../_users/delete-user-modal";
export default function LogIn() {
  const showAlert = useAlert();
  const [userId, setUserId] = useState<string | null>(null);
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
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Fixed navbar</a>
            <button className="navbar-toggler" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item"> <a className="nav-link active" aria-current="page" href="#">Home</a> </li>
                <li className="nav-item"> <a className="nav-link" href="#">Link</a> </li>
                <li className="nav-item"> <a className="nav-link disabled" aria-disabled="true">Disabled</a> </li>
              </ul>
              <DeleteUserModal />
              <button onClick={() => submitLogOut(showAlert)} className="btn btn-outline-secondary" type="submit">Log out</button>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5">Sticky footer with fixed navbar</h1>
          {userId === null ? "..." : `Hello ${userId}`}
          <p className="lead">
            Pin a footer to the bottom of the viewport in desktop browsers with
            this custom HTML and CSS. A fixed navbar has been added with{" "}
            <code className="small">padding-top: 60px;</code> on the{" "}
            <code className="small">main &gt; .container</code>.
          </p>
          <p>
            Back to
            <a href="/docs/5.3/examples/sticky-footer/">
              the default sticky footer
            </a>
            minus the navbar.
          </p>
        </div>
      </main>
    </>
  );
}
