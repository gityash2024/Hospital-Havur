import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import FormFooter from "../common/FormFooter";

const AddPatientForm = () => {
  const navigate = useNavigate();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [dateOfWedding, setDateOfWedding] = useState<Date | null>(null);
  const [gender, setGender] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [reference, setReference] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedReligion, setSelectedReligion] = useState<string | null>(null);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<
    string | null
  >(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [estimate, setEstimate] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pancard, setPanCard] = useState("");
  const [membershipId, setMemberShipId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [occupation, setOccupation] = useState("");
  const [spouseOccupation, setSpouseOccupation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [education, setEducation] = useState("");
  const [mediclaim, setMediclaim] = useState("");
  const [remark, setRemark] = useState("");
  const [residence, setResidence] = useState("");
  const [office, setOffice] = useState("");
  const [other, setOther] = useState("");
  const [age, setAge] = useState("");

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      calculatedAge--;
    }
    return calculatedAge;
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDateOfBirth(date);
      const calculatedAge = calculateAge(date);
      setAge(calculatedAge.toString());
    }
  };

  const addNewPatient = async () => {
    const validationErrors: any = {};
    if (!firstname) {
      validationErrors.firstname = "First Name is required.";
    }
    if (!middlename) {
      validationErrors.middlename = "Middle Name is required.";
    }

    if (!lastname) {
      validationErrors.lastname = "Last Name is required.";
    }

    if (!age) {
      validationErrors.age = "Age is required.";
    }

    // if (!reference) {
    //   validationErrors.reference = "Reference is required.";
    // }

    if (!selectedLanguage) {
      validationErrors.language = "Language is required.";
    }

    if (!selectedReligion) {
      validationErrors.religion = "Religion is required.";
    }

    if (!selectedMaritalStatus) {
      validationErrors.maritialstatus = "Marital Status is required.";
    }

    if (!weight) {
      validationErrors.weight = "Weight is required.";
    }

    if (!height) {
      validationErrors.height = "Height is required.";
    }

    if (!selectedBloodGroup) {
      validationErrors.bloodgroup = "Blood Group is required.";
    }

    if (!address) {
      validationErrors.address = "Address is required.";
    }

    if (!area) {
      validationErrors.area = "Area is required.";
    }

    if (!city) {
      validationErrors.city = "City is required.";
    }

    if (!state) {
      validationErrors.state = "State is required.";
    }

    if (!pin) {
      validationErrors.pin = "Pin is required.";
    }

    if (!estimate) {
      validationErrors.estimate = "Estimate is required.";
    }

    if (!aadhar) {
      validationErrors.aadhar = "Aadhar No. is required.";
    }

    if (!pancard) {
      validationErrors.pancard = "Pan No. is required.";
    }

    if (!membershipId) {
      validationErrors.membership = "Membership Id. is required.";
    }

    if (!employeeId) {
      validationErrors.employee = "Employee Id. is required.";
    }

    if (!occupation) {
      validationErrors.occupation = "Occupation is required.";
    }

    if (!spouseOccupation) {
      validationErrors.spouseoccupation = "Spouse Occupation is required.";
    }

    if (!companyName) {
      validationErrors.companyname = "Company Name is required.";
    }

    if (!education) {
      validationErrors.education = "Education is required.";
    }

    if (!mediclaim) {
      validationErrors.mediclaim = "Mediclaim is required.";
    }

    if (!remark) {
      validationErrors.remark = "Remark is required.";
    }
    if (!emailAddress) {
      validationErrors.emailAddress = "Email is required.";
    }

    if (!mobileNumber) {
      validationErrors.mobileNumber = "Mobile Number is required.";
    }

    if (!password) {
      validationErrors.password = "Password is required.";
    }

    if (!cPassword) {
      validationErrors.cPassword = "Confirm Password is required.";
    }

    if (!dateOfBirth) {
      validationErrors.dateOfBirth = "Date of birth is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        firstName: firstname,
        middleName: middlename,
        lastName: lastname,
        birthDate: dateOfBirth,
        age: age, // Convert to string as expected by schema
        gender: gender,
        wedding: dateOfWedding, // Corrected from weddingDate to wedding
        // referenceBy: reference, // Ensure this is an ObjectId in the actual implementation
        language: selectedLanguage,
        religion: selectedReligion,
        weight: weight,
        height: height,
        maritialStatus: selectedMaritalStatus,

        residence: residence, // From form data
        office: office, // From form data
        other: other, // From form data

        emailAddress: emailAddress,

        address: address,
        area: area,
        city: city,
        state: state,
        pin: pin,
        estimate: estimate,
        aadharNo: aadhar,
        panNo: pancard,
        memberShipId: membershipId,
        employeeId: employeeId,
        occupation: occupation,
        spouseOccupation: spouseOccupation,
        companyName: companyName,
        confirmPassword: cPassword,
        education: education,
        mediclaim: mediclaim,
        remark: remark,
        password: password,
        mobileNumber: mobileNumber,
        photo: selectedImage, // Corrected from image to photo
      };
      console.log("Submitting data:", submitData);

      let response: any = await postApi("hospital/patient/add", submitData);

      if (response.status === 200) {
        navigate("/patients");
        toast.success(response.data.message);
      } else {
        // repo;
        toast.error(response.message);
      }
    }
  };

  // select  gender
  const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSex(e.target.value);
  };
  // select language
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };
  // select Religion
  const handleReligionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReligion(e.target.value);
  };
  // select marital status
  const handleMaritalStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMaritalStatus(e.target.value);
  };
  // handle bloodgroup
  const handleBloodGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBloodGroup(e.target.value);
  };
  return (
    <div>
      <div>
        <div className="content d-flex flex-column flex-column-fluid pt-7">
          <div className="container-fluid">
            <div className="d-md-flex align-items-center justify-content-between mb-5">
              <h1 className="mb-0 title_sm">Add Patient</h1>
              <div className="text-end mt-4 mt-md-0">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/patients")}
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
                <input
                  className="isEdit"
                  name="isEdit"
                  type="hidden"
                  value="1"
                />
                <div className="card-body p-12">
                  <form action="#">
                    <div className="row mb-5">
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="firstName" className="form-label">
                            First Name <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstname"
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                          {errors.firstname && (
                            <span className="error">{errors.firstname}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="middleName" className="form-label">
                            Middle Name <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="middlename"
                            onChange={(e) => setMiddleName(e.target.value)}
                          />
                          {errors.middlename && (
                            <span className="error">{errors.middlename}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="lastName" className="form-label">
                            Last Name <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          {errors.lastname && (
                            <span className="error">{errors.lastname}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="dateOfBirth" className="form-label">
                            Date Of Birth <span className="required"></span>
                          </label>
                          <DatePicker
                            selected={dateOfBirth}
                            onChange={handleDateChange}
                            className="form-control"
                            id="dateOfBirth"
                            placeholderText="Date of Birth"
                            maxDate={new Date()}
                            showYearDropdown
                            showMonthDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                          />
                          {errors.dateOfBirth && (
                            <span className="error">{errors.dateOfBirth}</span>
                          )}
                        </div>
                      </div>
                      {/* <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="age" className="form-label">
                            Age <span className="required"></span>
                          </label>
                          <div className="select_age">
                            <select
                              className="form-select"
                              name="year"
                              id="year"
                              onChange={handleYearChange}
                              value={selectedYear !== null ? selectedYear : ""}
                            >
                              <option value=""> Year</option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>

                            <select
                              className="form-select"
                              name="month"
                              id="month"
                              onChange={handleMonthChange}
                              value={
                                selectedMonth !== null ? selectedMonth : ""
                              }
                              disabled={selectedYear === null}
                            >
                              <option value=""> Month</option>
                              {months.map((month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>

                            <select
                              className="form-select"
                              name="day"
                              id="day"
                              onChange={handleDayChange}
                              value={selectedDay !== null ? selectedDay : ""}
                              disabled={
                                selectedYear === null || selectedMonth === null
                              }
                            >
                              <option value=""> Day</option>
                              {days.map((day) => (
                                <option key={day} value={day}>
                                  {day}
                                </option>
                              ))}
                            </select>
                          </div>
                          {errors.age && (
                            <span className="error">{errors.age}</span>
                          )}
                        </div>
                      </div> */}
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="age" className="form-label">
                            Age <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="age"
                            value={age}
                            readOnly
                            onChange={(e) => setAge(e.target.value)}
                          />
                          {errors.age && (
                            <span className="error">{errors.age}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-2">
                        <label htmlFor="doctor" className="form-label">
                          Sex <span className="required"></span>
                        </label>
                        <select
                          className="form-select"
                          name="sex"
                          id="sex"
                          onChange={handleSexChange}
                          value={selectedSex !== null ? selectedSex : ""}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="dateOfWedding" className="form-label">
                            Wedding <span className="required"></span>
                          </label>
                          <DatePicker
                            selected={dateOfWedding}
                            onChange={(date) => setDateOfWedding(date)}
                            className="form-control"
                            id="weddingDate"
                            placeholderText="Wedding"
                          />
                          {errors.dateOfWedding && (
                            <span className="error">
                              {errors.dateOfWedding}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="reference" className="form-label">
                            Reference By <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="reference"
                            onChange={(e) => setReference(e.target.value)}
                            placeholder="Reference By"
                          />
                          {errors.reference && (
                            <span className="error">{errors.reference}</span>
                          )}
                        </div>
                      </div> */}
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="language" className="form-label">
                            Language <span className="required"></span>
                          </label>
                          <select
                            className="form-select"
                            name="language"
                            id="language"
                            onChange={handleLanguageChange}
                            value={
                              selectedLanguage !== null ? selectedLanguage : ""
                            }
                          >
                            <option value="">Select Language</option>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                            <option value="chinese">Chinese</option>
                            {/* Add more languages as needed */}
                          </select>
                          {errors.language && (
                            <span className="error">{errors.language}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="religion" className="form-label">
                            Religion <span className="required"></span>
                          </label>
                          <select
                            className="form-select"
                            name="religion"
                            id="religion"
                            onChange={handleReligionChange}
                            value={
                              selectedReligion !== null ? selectedReligion : ""
                            }
                          >
                            <option value="">Select Religion</option>
                            <option value="hindu">Hindu</option>
                            <option value="christianity">Christianity</option>
                            <option value="buddhism">Buddhism</option>
                            <option value="judaism">Judaism</option>
                            {/* Add more religions as needed */}
                          </select>
                          {errors.religion && (
                            <span className="error">{errors.religion}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="maritalStatus" className="form-label">
                            Marital Status <span className="required"></span>
                          </label>
                          <select
                            className="form-select"
                            name="maritalStatus"
                            id="maritalStatus"
                            onChange={handleMaritalStatusChange}
                            value={
                              selectedMaritalStatus !== null
                                ? selectedMaritalStatus
                                : ""
                            }
                          >
                            <option value="">Select Marital Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                            {/* Add more marital statuses as needed */}
                          </select>
                          {errors.maritialstatus && (
                            <span className="error">
                              {errors.maritialstatus}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="weight" className="form-label">
                            Weight <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="weight"
                            onChange={(e) => setWeight(e.target.value)}
                          />
                          {errors.weight && (
                            <span className="error">{errors.weight}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="height" className="form-label">
                            Height <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="height"
                            onChange={(e) => setHeight(e.target.value)}
                          />
                          {errors.height && (
                            <span className="error">{errors.height}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
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
                      {/* <div className="col-md-3">
                        <FileUploader label="Profile"/>
                      </div> */}
                      <hr className="mt-2 mb-4" />
                      <h5 className="mb-3">Communication no.</h5>
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="contact" className="form-label">
                            Mobile Number <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="contact"
                            onChange={(e) => setMobileNumber(e.target.value)}
                          />
                          {errors.mobileNumber && (
                            <span className="error">{errors.mobileNumber}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="residence" className="form-label">
                            Residence:
                          </label>
                          <input
                            type="text"
                            id="residence"
                            className="form-control"
                            onChange={(e) => setResidence(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="office" className="form-label">
                            Office:
                          </label>
                          <input
                            type="text"
                            id="office"
                            className="form-control"
                            onChange={(e) => setOffice(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="other" className="form-label">
                            Other:
                          </label>
                          <input
                            type="text"
                            id="other"
                            className="form-control"
                            onChange={(e) => setOther(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="email" className="form-label">
                            Email <span className="required"></span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={(e) => setEmailAddress(e.target.value)}
                          />
                          {errors.emailAddress && (
                            <span className="error">{errors.emailAddress}</span>
                          )}
                        </div>
                      </div>
                      <h5 className="mb-3">Address</h5>
                      <div className="col-md-12">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="address" className="form-label">
                            Address <span className="required"></span>
                          </label>
                          <textarea
                            id="address"
                            rows={2}
                            className="form-control"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          {errors.address && (
                            <span className="error">{errors.address}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="area" className="form-label">
                            Area <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="area"
                            onChange={(e) => setArea(e.target.value)}
                          />
                          {errors.area && (
                            <span className="error">{errors.area}</span>
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
                          <label htmlFor="state" className="form-label">
                            State <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            onChange={(e) => setState(e.target.value)}
                          />
                          {errors.state && (
                            <span className="error">{errors.state}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="pin" className="form-label">
                            Pin <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="pin"
                            onChange={(e) => setPin(e.target.value)}
                          />
                          {errors.pin && (
                            <span className="error">{errors.pin}</span>
                          )}
                        </div>
                      </div>
                      {/* <hr className="mt-2 mb-4" /> */}
                      {/* <h5 className="mb-3">Photograph</h5>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="picture" className="form-label">
                          Select Picture
                        </label>
                        <div className="change_img">
                          <img
                            src={
                              selectedImage
                                ? URL.createObjectURL(selectedImage)
                                : "/image/nav_img.svg"
                            }
                            alt="Selected Image1"
                          />
                          <button className="edit_button">
                            <BsPencil style={{ cursor: "pointer" }} />
                          </button>
                          <input
                            type="file"
                            id="fileInput"
                            name="fileInput"
                            className="file_input"
                            onChange={(e) => {
                              const file = (e.target as HTMLInputElement)
                                .files![0];
                              setSelectedImage(file || null);
                            }}
                          />
                        </div>
                      </div> */}
                      <hr className="mt-2 mb-4" />
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="estimate" className="form-label">
                            Estimate <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="estimate"
                            onChange={(e) => setEstimate(e.target.value)}
                          />
                          {errors.estimate && (
                            <span className="error">{errors.estimate}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="aadhar" className="form-label">
                            Aadhar No. <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="aadhar"
                            onChange={(e) => setAadhar(e.target.value)}
                          />
                          {errors.aadhar && (
                            <span className="error">{errors.aadhar}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="pan" className="form-label">
                            Pan No. <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="pan"
                            onChange={(e) => setPanCard(e.target.value)}
                          />
                          {errors.pancard && (
                            <span className="error">{errors.pancard}</span>
                          )}
                        </div>
                      </div>
                      <hr className="mt-2 mb-4" />
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="membershipId" className="form-label">
                            Membership Id <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="membershipId"
                            onChange={(e) => setMemberShipId(e.target.value)}
                          />
                          {errors.membership && (
                            <span className="error">{errors.membership}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="employeeId" className="form-label">
                            Employee Id <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="employeeId"
                            onChange={(e) => setEmployeeId(e.target.value)}
                          />
                          {errors.employee && (
                            <span className="error">{errors.employee}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-3">
                          <label htmlFor="occupation" className="form-label">
                            Occupation <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="occupation"
                            onChange={(e) => setOccupation(e.target.value)}
                          />
                          {errors.occupation && (
                            <span className="error">{errors.occupation}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label
                            htmlFor="spouseOccupation"
                            className="form-label"
                          >
                            Spouse Occupation <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="spouseOccupation"
                            onChange={(e) =>
                              setSpouseOccupation(e.target.value)
                            }
                          />
                          {errors.spouseoccupation && (
                            <span className="error">
                              {errors.spouseoccupation}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="companyName" className="form-label">
                            Company Name <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            onChange={(e) => setCompanyName(e.target.value)}
                          />
                          {errors.companyname && (
                            <span className="error">{errors.companyname}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="education" className="form-label">
                            Education <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="education"
                            onChange={(e) => setEducation(e.target.value)}
                          />
                          {errors.education && (
                            <span className="error">{errors.education}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="mediclaim" className="form-label">
                            Mediclaim <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="mediclaim"
                            onChange={(e) => setMediclaim(e.target.value)}
                          />
                          {errors.mediclaim && (
                            <span className="error">{errors.mediclaim}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-sm-7 mb-4">
                          <label htmlFor="remark" className="form-label">
                            Remark <span className="required"></span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="remark"
                            onChange={(e) => setRemark(e.target.value)}
                          />
                          {errors.remark && (
                            <span className="error">{errors.remark}</span>
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

                      <div className="col-md-6 d-flex align-items-center">
                        <div className="mb-sm-7 mb-4">
                          <label className="form-label">Gender:</label>
                          <div className="form-check d-flex align-items-center">
                            <input
                              type="radio"
                              className="form-check-input me-2"
                              name="gender"
                              value="male"
                              checked={gender === "male"}
                              onChange={handleGenderChange}
                            />
                            <label
                              className="form-check-label me-4"
                              htmlFor="male"
                            >
                              Male
                            </label>
                            <input
                              type="radio"
                              className="form-check-input me-2"
                              name="gender"
                              value="female"
                              checked={gender === "female"}
                              onChange={handleGenderChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="female"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <FormFooter
                      onSave={addNewPatient} // onSave event handler
                      saveButtonText="Submit"
                      onCancel={() => navigate("/patients")}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddPatientForm;
