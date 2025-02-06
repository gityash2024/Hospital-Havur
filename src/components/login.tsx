import React, { useState } from "react";
// import "../../Styles/app.css";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postApi } from "./services/api";
import { toast } from "react-toastify";
import image from "../styles/assets/image/brand.svg";

const Login = () => {
  const navigate = useNavigate();

  //   const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (): Promise<void> => {
    localStorage.setItem("isLogin", "true");
    //   localStorage.setItem("role", role);

    const submitData = {
      name: userName,
      password: password,
    };
    let response: any = await postApi("hospital/login", submitData);

    if (response.status === 200) {
      const token = response.headers.get("x-auth-token");
      localStorage.setItem("token", token);
      navigate("/hospital-dashboard");
      window.location.href = "/hospital-dashboard";
      toast.success(response.data.message);
    } else {
      toast.error(response.response.data.message);
    }
  };
  return (
    <>
      <div className="page_body">
        <div className="login_brand pt-5">
          <a href="#" className="image mb-5 mb-sm-10">
            <img src={image} alt="Nav Image1" />
          </a>
        </div>
        <div className="login_form">
          <div className="form_body bg-white  px-5 px-sm-7 py-10 mx-auto">
            <h1 className="text-center mb-5">Sign In</h1>

            <form>
              <div className="mb-sm-7 mb-4">
                <label htmlFor="formInputEmail" className="form-label">
                  Username OR Email <span className="required"></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder="Enter Email"
                  id="formInputEmail"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mb-sm-7 mb-4">
                <div className="d-flex justify-content-between">
                  <label className="form-label">
                    Password
                    <span className="required"></span>
                  </label>
                  <a href="#" className="link-info fs-6 text-decoration-none">
                    Forgot Password ?
                  </a>
                </div>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  id="formInputEmail"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-sm-7 mb-4 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="formCheck"
                  name="remember"
                />
                <label className="form-check-label">Remember Me</label>
              </div>
              <div className="form_btn">
                <button
                  type="button"
                  onClick={() => onLogin()}
                  className="btn btn-primary w-100"
                >
                  Login
                </button>
              </div>
              <div className="d-flex align-items-center mt-4">
                <span className="text-gray-700 me-2">
                  {" "}
                  Don’t have an account?
                </span>
                <a href="#" className="link-info fs-6 text-decoration-none">
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
