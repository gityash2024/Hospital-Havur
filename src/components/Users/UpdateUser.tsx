import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const UpdateUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;
  const [firstName, setFirstName] = useState(item.firstName);
  const [lastName, setLastName] = useState(item.lastName);
  const [dob, setDob] = useState<Date | null>(item.dob);
  const [email, setEmail] = useState(item.email);
  const [gender, setGender] = useState(item.gender);
  const [role, setRole] = useState(item.role);
  const [phone, setPhone] = useState(item.phone);
  const [errors, setErrors] = useState<any>({});

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDob(date);
    }
  };

  const UpdateUser = async () => {
    const validationErrors: any = {};

    if (!firstName) {
      validationErrors.firstName = "Firstname is required.";
    }

    if (!lastName) {
      validationErrors.lastName = "Lastname is required.";
    }

    if (!email) {
      validationErrors.email = "Email is required.";
    }

    if (!gender) {
      validationErrors.gender = "Gender is required.";
    }

    if (!role) {
      validationErrors.role = "Role is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        id: item._id,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        phone: phone,
        email: email,
        gender: gender,
        role: role,
      };

      let response: any = await postApi(
        "hospital/receptionist/update",
        submitData
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/users");
      } else {
        toast.error(response.response.data.message);
      }
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">Edit User</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/users")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap flex-column-fluid">
        <div className="container-fluid">
          <div className="d-flex flex-column">
            <div className="card">
              <div className="card-body p-12">
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formname" className="form-label">
                          Firstname<span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formname"
                          placeholder="Enter Firstname"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && (
                          <span className="error">{errors.firstName}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formname" className="form-label">
                          Lastname<span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formname"
                          placeholder="Enter Lastname"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && (
                          <span className="error">{errors.lastName}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4 mb-3">
                      <label
                        htmlFor="dob"
                        className="form-label fs-5 text-gray-600"
                      >
                        Date Of Birth:
                      </label>
                      <DatePicker
                        selected={dob}
                        onChange={handleDateChange}
                        className="form-control custom-datepicker"
                        id="formAdmissionDate"
                        placeholderText="Date Of Birth"
                        maxDate={new Date()}
                        showYearDropdown
                        showMonthDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100} // Extends the year range to 100 years
                      />
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formname" className="form-label">
                          Email<span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formname"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <span className="error">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formname" className="form-label">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formname"
                          placeholder="Enter Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formname" className="form-label">
                          Gender<span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formname"
                          placeholder="Enter Gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        {errors.gender && (
                          <span className="error">{errors.gender}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4 mb-3">
                      <label
                        htmlFor="role"
                        className="form-label fs-5 text-gray-600"
                      >
                        Role<span className="required"></span>
                      </label>
                      <select
                        className="form-select"
                        name="role"
                        id="role"
                        onChange={handleRoleChange}
                        value={role}
                      >
                        <option value="" disabled>
                          Select Role
                        </option>
                        <option value="Receptionist">Receptionist</option>
                      </select>
                      {errors.role && (
                        <span className="error">{errors.role}</span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <input
                      className="btn btn_style me-2"
                      id="saveBtn"
                      type="button"
                      value="Save"
                      onClick={UpdateUser}
                    />
                    <button
                      type="button"
                      onClick={() => navigate("/users")}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
