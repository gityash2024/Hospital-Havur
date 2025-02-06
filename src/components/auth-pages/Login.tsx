import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import "../../styles/css/auth.scss";
import brand from "../../styles/assets/image/brand.svg";

export function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const onLogin = async (): Promise<void> => {
    const validationErrors: any = {};
    if (!userName) {
      validationErrors.email = "Email OR user name is required.";
    }

    if (!password) {
      validationErrors.password = "Password is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        name: userName,
        password: password,
      };
      let response: any = await postApi("hospital/login", submitData);

      if (response.status === 200) {
        localStorage.setItem("isLogin", "true");
        const token = response.headers.get("x-auth-token");
        localStorage.setItem("token", token);
        navigate("/hospital-dashboard");
        window.location.href = "/hospital-dashboard";
        toast.success(response.data?.message);
      } else {
        toast.error(response.response.data?.message);
      }
    }
  };

  return (
    <>
      <div className="page_body">
        <div className="col-12 y pt-5 ">
          <a href="#" className="image mb-5 mb-sm-10">
            <img src={brand} className="login_brand" alt="Nav Image1" />
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
                {errors.email && <span className="error">{errors.email}</span>}
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
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
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
              {/* <div className="d-flex align-items-center mt-4">
                <span className="text-gray-700 me-2">
                  {" "}
                  Don’t have an account?
                </span>
                <a href="#" className="link-info fs-6 text-decoration-none">
                  Sign Up
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
