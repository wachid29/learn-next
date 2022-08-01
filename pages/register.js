import React from "react";
import RegisterStyle from "../styles/pages/Register.module.css";
import Link from "next/link";

function Register() {
  return (
    <>
      <div className={RegisterStyle.register}>
        <div className="container">
          {/* login title */}
          <div className="row justify-content-center text-center mb-4">
            <div className="col-10">
              <h3>Let`t Get Started !</h3>
              <p>Create new account to access all feautures</p>
            </div>
          </div>
          {/* login form */}
          <div>
            <div className="row justify-content-center text-center">
              <div className="col-11">
                {/* name input */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light"
                    id="exampleFormControlInput2"
                    placeholder="Name"
                  ></input>
                </div>
                {/* email input */}
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg bg-light"
                    id="exampleFormControlInput2"
                    placeholder="E-mail"
                  ></input>
                </div>
                {/* phone input */}
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control form-control-lg bg-light"
                    id="exampleFormControlInput2"
                    placeholder="Phone Number"
                  ></input>
                </div>
                {/* password input */}
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                  ></input>
                </div>
                {/* confirm password input */}
                <div className="mb-5">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light"
                    id="exampleFormControlInput2"
                    placeholder="Confirm password"
                  ></input>
                </div>
                {/* button */}
                <div className="d-grid gap-2 mb-4">
                  <button className="btn btn-warning btn-lg" type="button">
                    <h5>CREATE</h5>
                  </button>
                </div>
                <div>
                  <p>
                    Already have account?{" "}
                    <Link href="/login" passHref>
                      <a> Log in Here</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
