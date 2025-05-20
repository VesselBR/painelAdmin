import React from "react";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState();
  return (
    <div className="">
      <nav className="bg-dark py-3">
        <div className="container text-center">
          <img src="\assets\img\logo-home.svg" alt="Logo Vessel" width={150} />
        </div>
      </nav>
      <div>
        <div className="container form-login col-sm-12 col-md-10 col-lg-6 col-xl-5 text-center ">
          <div className="  text-center">
              <h1 className="my-5  ">Reset your password</h1>
              <span className=" ">
                Enter your email address below and we will send you a link to reset
                your password.
              </span>
          </div>
          <div className="mb-3 my-3">
            <input
              className="form-control"
              type="email"
              name="username"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 p-2 mt-2 ">
            Send password reset email
          </button>
        </div>
      </div>
    </div>
  );
}
