import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { caseHandlerQualifications } from "../Doctor/staticData";
import CreatableSelect from "react-select/creatable";


const AddCaseHandler = () => {

  
  const navigate = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthdate] = useState<Date | null>(null);
  const [profile, setProfile] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(
    null
  );
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const [cPassword, setCPassword] = useState("");

  const [errors, setErrors] = useState<any>({});
    const [qualificationOptions, setQualificationOptions] = useState(
      caseHandlerQualifications
    );
  const [selectedQualification, setSelectedQualification] = useState(null);


  const AddCaseHandler = async () => {
      console.log(qualification);
    const validationErrors: any = {};
    if (!firstName) {
      validationErrors.firstName = "firstname is required.";
    }

    if (!lastName) {
      validationErrors.lastName = "lastname is required.";
    }

    if (!email) {
      validationErrors.email = "Email is required.";
    }

    if (!password) {
      validationErrors.password = "password is required.";
    }
    if (!cPassword) {
      validationErrors.cPassword = "confirm password is required.";
    } else if (cPassword !== password) {
      errors.cPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        firstName,
        lastName,
        email,
        designation,
        phone,
        gender,
        qualification,
        bloodGroup: selectedBloodGroup,
        profile,
        address1,
        address2,
        city,
        zip,
        password,
        birthDate,
      };
      console.log(submitData);

      let response: any = await postApi(
        "hospital/patient/caseHandler/add",
        submitData
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/patients?tab=casehandler");
      } else {
        toast.error(response.response.data.message);
      }
    }
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGender(e.target.value);
  };
  const handleBloodGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBloodGroup(e.target.value);
  };
 const handleQualificationChange = (newValue:any) => {
   setSelectedQualification(newValue);
   setQualification(newValue ? newValue.value : "");
 };

 const handleQualificationCreate = (inputValue:any) => {
   const newOption = { value: inputValue, label: inputValue };
   setQualificationOptions((prevOptions) => [...prevOptions, newOption]);
   handleQualificationChange(newOption); // Auto-select the newly created option
 };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">New Case Handler</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/patients?tab=casehandler")}
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
                        <label htmlFor="formfirstname" className="form-label">
                          Firstname <span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formfirstname"
                          placeholder="firstname"
                          value={firstName}
                          onChange={(e) => setfirstName(e.target.value)}
                        />
                        {errors.firstName && (
                          <span className="error">{errors.firstName}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formlastname" className="form-label">
                          Lastname <span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formlastname"
                          placeholder="lastname"
                          value={lastName}
                          onChange={(e) => setlastName(e.target.value)}
                        />
                        {errors.lastName && (
                          <span className="error">{errors.lastName}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formemail" className="form-label">
                          email <span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formemail"
                          placeholder="email"
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
                        <label htmlFor="formPhone" className="form-label">
                          Phone <span className="required"></span>
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="formPhone"
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          pattern="[0-9]"
                          maxLength={10}
                          title="Phone number must be 10 digits"
                        />
                        {errors.phone && (
                          <span className="error">{errors.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formbirthDate" className="form-label">
                          Case Date <span className="required"></span>
                        </label>
                        <DatePicker
                          selected={birthDate}
                          onChange={(date) => setBirthdate(date)}
                          className="form-control"
                          id="formbirthDate"
                          placeholderText="Case Date"
                          maxDate={new Date()}
                          showYearDropdown
                          showMonthDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={100}
                          dateFormat="dd/MM/yyyy"
                        />
                        {errors.birthDate && (
                          <span className="error">{errors.birthDate}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formdesignation" className="form-label">
                          Designation
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formdesignation"
                          placeholder="designation"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                        />
                        {errors.designation && (
                          <span className="error">{errors.designation}</span>
                        )}
                      </div>
                    </div>

                    {/* <div className="col-md-3">
                      <div className="mb-sm-7 mb-4">
                        <label
                          htmlFor="formqualification"
                          className="form-label"
                        >
                          Qualification
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formqualification"
                          placeholder="qualification"
                          value={qualification}
                          onChange={(e) => setQualification(e.target.value)}
                        />
                        {errors.qualification && (
                          <span className="error">{errors.qualification}</span>
                        )}
                      </div>
                    </div> */}
                    <div className="col-md-4">
                      <label
                        htmlFor="qualification"
                        className="form-label pb-2 fs-5 text-gray-600"
                      >
                        Qualification <span className="required"></span>
                      </label>
                      <CreatableSelect
                        id="qualification"
                        name="qualification"
                        options={qualificationOptions}
                        value={selectedQualification}
                        onChange={handleQualificationChange}
                        onCreateOption={handleQualificationCreate}
                        isClearable
                        isSearchable
                      />
                      {errors.qualification && (
                        <span className="error">{errors.qualification}</span>
                      )}
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="bloodGroup" className="form-label">
                          Blood group <span className="required"></span>
                        </label>
                        <select
                          className="form-select"
                          name="bloodGroup"
                          id="bloodGroup"
                          onChange={handleBloodGroupChange}
                          value={
                            selectedBloodGroup !== null
                              ? selectedBloodGroup
                              : ""
                          }
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          {/* Add more blood groups as needed */}
                        </select>
                        {errors.bloodgroup && (
                          <span className="error">{errors.bloodgroup}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="gender" className="form-label">
                          gender <span className="required"></span>
                        </label>
                        <select
                          className="form-select"
                          name="gender"
                          id="gender"
                          onChange={handleGenderChange}
                          value={selectedGender !== null ? selectedGender : ""}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.gender && (
                          <span className="error">{errors.gender}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="password" className="form-label">
                          Password <span className="required"></span>
                        </label>
                        <input
                          type="Password"
                          className="form-control"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <span className="error">{errors.password}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="password" className="form-label">
                          Confirm Password <span className="required"></span>
                        </label>
                        <input
                          type="Password"
                          className="form-control"
                          name="password"
                          onChange={(e) => setCPassword(e.target.value)}
                        />
                        {errors.cPassword && (
                          <span className="error">{errors.cPassword}</span>
                        )}
                      </div>
                    </div>

                    <h5 className="mb-3">Address</h5>
                    <div className="col-md-12">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="address1" className="form-label">
                          Address1
                        </label>
                        <textarea
                          id="address"
                          rows={2}
                          className="form-control"
                          onChange={(e) => setAddress1(e.target.value)}
                        />
                        {errors.address && (
                          <span className="error">{errors.address}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="address2" className="form-label">
                          Address2
                        </label>
                        <textarea
                          id="address"
                          rows={2}
                          className="form-control"
                          onChange={(e) => setAddress2(e.target.value)}
                        />
                        {errors.address2 && (
                          <span className="error">{errors.address2}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="city" className="form-label">
                          City <span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          onChange={(e) => setCity(e.target.value)}
                        />
                        {errors.city && (
                          <span className="error">{errors.city}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="zip" className="form-label">
                          zip <span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="zip"
                          onChange={(e) => setZip(e.target.value)}
                        />
                        {errors.zip && (
                          <span className="error">{errors.zip}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <input
                      className="btn btn_style me-2"
                      id="saveBtn"
                      type="button"
                      value="Save"
                      onClick={AddCaseHandler}
                    />
                    <button
                      type="button"
                      onClick={() => navigate("/patients")}
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

export default AddCaseHandler;
