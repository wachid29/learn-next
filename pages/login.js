import React from "react";
import loginStyle from "../styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { BiLockAlt } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/router";
function Login() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handlelogin = () => {
    setIsLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsError(false);
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        router.push("/");
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMsg(error?.response?.data);
      });
  };

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
                {isError ? (
                  <div className="alert alert-danger" role="alert">
                    {errorMsg}
                  </div>
                ) : null}
                <h1 className={loginStyle.title}>Welcome !</h1>
                <p className={loginStyle.description}>
                  Log in to your exiting account.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-11 mt-4" onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4 ">
                <div className="input-group mb-3">
                  <span
                    className={`${loginStyle.icon} input-group-text bg-light`}
                    id="basic-addon1"
                  >
                    <FiUser />
                  </span>
                  <input
                    type="email"
                    className={`${loginStyle.form} form-control form-control-lg bg-light`}
                    placeholder="examplexxx@gmail.com"
                    id="exampleFormControlInput1"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <div className="input-group mb-3">
                  <span
                    className={`${loginStyle.icon} input-group-text bg-light`}
                    id="basic-addon1"
                  >
                    <BiLockAlt />
                  </span>
                  <input
                    type="password"
                    className={`${loginStyle.form} form-control form-control-lg bg-light`}
                    placeholder="password"
                    id="exampleFormControlInput2"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className=" mt-2 d-flex justify-content-end">
                <p className={loginStyle.description}>Forgot Password?</p>
              </div>
              <div className="d-grid gap-2 mb-4">
                <button
                  className="btn btn-warning btn-lg"
                  type="button"
                  disabled={isLoading}
                  onClick={handlelogin}
                >
                  <h1 className={loginStyle.buttonText}>
                    {isLoading ? "Loading..." : "LOG IN"}
                  </h1>
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
