import React from "react";
import RegisterStyle from "../styles/pages/Register.module.css";
import Link from "next/link";
import { FiUser, FiMail, FiPhone } from "react-icons/fi";
import { BiLockAlt, BiLockOpenAlt } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone_number, setPhone_number] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm_pass, setConfirm_pass] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isSucces, setisSucces] = React.useState(false);
  const [succesMsg, setSuccesMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleRegister = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:8001/userdata/add", {
        name: name,
        email: email,
        phone_number: phone_number,
        password: password,
        confirm_pass: confirm_pass,
      })
      .then((res) => {
        setIsError(false);
        setisSucces(true);
        setSuccesMsg(res?.data);
        router.push("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setisSucces(false);
        setErrorMsg(error?.response?.data);
      });
  };
  return (
    <>
      <div className={RegisterStyle.register}>
        <div className="container">
          {/* login title */}
          <div className="row justify-content-center text-center mb-4">
            <div className="col-10">
              {isError ? (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              ) : null}
              {isSucces ? (
                <div className="alert alert-warning" role="alert">
                  {succesMsg}
                </div>
              ) : null}
              <h3>Let`t Get Started !</h3>
              <p>Create new account to access all feautures</p>
            </div>
          </div>
          {/* login form */}
          <div>
            <div className="row justify-content-center text-center">
              <div className="col-11" onSubmit={(e) => e.preventDefault()}>
                {/* name input */}
                <div className="input-group mb-3">
                  <span
                    className={`${RegisterStyle.icon} input-group-text bg-light`}
                    id="basic-addon1"
                  >
                    <FiUser />
                  </span>
                  <input
                    type="text"
                    className={`${RegisterStyle.form} form-control form-control-lg bg-light`}
                    placeholder="Name"
                    id="exampleFormControlInput1"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* email input */}
                <div className="input-group mb-3">
                  <span
                    className={`${RegisterStyle.icon} input-group-text bg-light`}
                    id="basic-addon1"
                  >
                    <FiMail />
                  </span>
                  <input
                    type="email"
                    className={`${RegisterStyle.form} form-control form-control-lg bg-light`}
                    placeholder="E-mail"
                    id="exampleFormControlInput2"
                    pattern=".+@globex\.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* phone input */}
                <div className="input-group mb-3">
                  <span
                    className={`${RegisterStyle.icon} input-group-text bg-light`}
                    id="basic-addon1"
                  >
                    <FiPhone />
                  </span>
                  <input
                    type="text"
                    className={`${RegisterStyle.form} form-control form-control-lg bg-light`}
                    placeholder="Phone Number"
                    id="exampleFormControlInput3"
                    onChange={(e) => setPhone_number(e.target.value)}
                  />
                </div>
                {/* password input */}
                <div className="input-group mb-3">
                  <span
                    className={`${RegisterStyle.icon} input-group-text bg-light`}
                    id="basic-addon1"
                  >
                    <BiLockAlt />
                  </span>
                  <input
                    type="password"
                    className={`${RegisterStyle.form} form-control form-control-lg bg-light`}
                    placeholder="password"
                    id="exampleFormControlInput4"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* confirm password input */}
                <div className="input-group mb-3">
                  <span
                    className={`${RegisterStyle.icon} input-group-text bg-light`}
                    id="basic-addon1"
                  >
                    <BiLockOpenAlt />
                  </span>
                  <input
                    type="password"
                    className={`${RegisterStyle.form} form-control form-control-lg bg-light`}
                    placeholder="password"
                    id="exampleFormControlInput5"
                    onChange={(e) => setConfirm_pass(e.target.value)}
                  />
                </div>
                {/* button */}
                <div className="d-grid gap-2 mb-4">
                  <button
                    className="btn btn-warning btn-lg"
                    type="button"
                    disabled={isLoading}
                    onClick={handleRegister}
                  >
                    <h5> {isLoading ? "Loading..." : "CREATE"}</h5>
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
