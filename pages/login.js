import React from "react";
import loginStyle from "../styles/pages/login.module.css";
import Image from "next/image";
import Link from "next/link";

function Login() {
  return (
    <>
      <div className={loginStyle.Login}>
        <div className="container-sm ">
          <div className="row justify-content-center text-center">
            <div className="col-8 mt-5">
              <Image
                src="/images/loginuser.png"
                width="184px"
                height="205px"
                alt="image"
              />
              <div className="card-body">
                <h1 className={loginStyle.title}>Welcome !</h1>
                <p className={loginStyle.description}>
                  Log in to your exiting account.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-11 mt-4 ">
              <div className="mb-4 ">
                <div className={loginStyle.icon}>
                  <Image
                    src="/images/user.png"
                    width="24px"
                    height="24px"
                    alt="user"
                  />
                </div>
                <div className={loginStyle.form}>
                  <input
                    type="email"
                    className="form-control form-control-lg bg-light"
                    id="exampleFormControlInput1"
                    placeholder="examplexxx@gmail.com"
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className={loginStyle.icon}>
                  <Image
                    src="/images/lock.png"
                    width="24px"
                    height="24px"
                    alt="user"
                  />
                </div>
                <div className={loginStyle.form}>
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                  ></input>
                </div>
              </div>
              <div className=" mt-2 d-flex justify-content-end">
                <p className={loginStyle.description}>Forgot Password?</p>
              </div>
              <div className="d-grid gap-2 mb-4">
                <button className="btn btn-warning btn-lg" type="button">
                  <h1 className={loginStyle.buttonText}>LOG IN</h1>
                </button>
              </div>
              <div className=" mt-2 d-flex justify-content-center">
                <p className={loginStyle.description}>
                  Don`t have account?{" "}
                  <Link href="/register" passHref>
                    <a className={loginStyle.textLink}>Sign Up</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
