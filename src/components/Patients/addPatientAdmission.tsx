import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { Form } from "react-bootstrap";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FileUploader from "../common/FileUploader";

const AddPatientAddmission = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(""); // State for patient selection
  const [doctor, setDoctor] = useState(""); // State for package selection
  // const [insurance, setInsurance] = useState(""); // State for insurance selection
  // const [bed, setBed] = useState(""); // State for bed selection
  const [admissionDate, setAdmissionDate] = useState<Date | null>(null); // State for admission date
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null); // State for discharge date
  const [checked, setChecked] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [errors, setErrors] = useState<any>({});

  const handleSwitchToggle = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    const getPatientsData = async () => {
      const response = await postApi("hospital/patient/list", {});

      if (response.status === 200) {
        setPatientData(response.data.data.patient);
      }
    };

    const getDoctorData = async () => {
      const response = await postApi("hospital/doctor/list", {});

      if (response.status === 200) {
        setDoctorData(response.data.data.doctor);
      }
    };

    getPatientsData();
    getDoctorData();
  }, []);

  const addNewAdmission = async () => {
    const validationErrors: any = {};
    if (!patient) {
      validationErrors.patient = "Patient is required.";
    }

    if (!doctor) {
      validationErrors.doctor = "Doctor is required.";
    }

    if (!admissionDate) {
      validationErrors.admissionDate = "Admission Date is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        patientId: patient,
        doctorId: doctor,
        admissionDate: admissionDate,
        dischargeDate: dischargeDate,
      };
      let response: any = await postApi("hospital/admission/add", submitData);

      if (response.status === 200) {
        navigate("/patients?tab=patient-admissions");
        toast.success(response.data.message);
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="content d-flex flex-column flex-column-fluid pt-7">
          <div className="container-fluid">
            <div className="d-md-flex align-items-center justify-content-between mb-5">
              <h1 className="mb-0 title_sm">Edit Patient Admission</h1>
              <div className="text-end mt-4 mt-md-0">
                <button
                  type="button"
                  className="btn btn_style"
                  onClick={() => navigate("/patients?tab=patient-admissions")}
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
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-sm-7 mb-4">
                          <label
                            htmlFor="formSelectPatient"
                            className="form-label"
                          >
                            Patient <span className="required"></span>
                          </label>
                          <select
                            className="form-select"
                            value={patient}
                            onChange={(e) => setPatient(e.target.value)}
                          >
                            <option value="">Select Patient</option>
                            {patientData.map((patient: any) => {
                              return (
                                <option value={patient._id}>
                                  {patient.firstName} {patient.lastName}
                                </option>
                              );
                            })}
                            {/* <option value="patient1">Patient 1</option>
                            <option value="patient2">Patient 2</option>
                            <option value="patient3">Patient 3</option> */}
                          </select>
                          {errors.patient && (
                            <span className="error">{errors.patient}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-sm-7 mb-4">
                          <label
                            htmlFor="formPackageType"
                            className="form-label"
                          >
                            Select Docctor
                            <span className="required"></span>
                          </label>
                          <select
                            className="form-select"
                            value={doctor}
                            onChange={(e) => setDoctor(e.target.value)}
                          >
                            <option value="">Select Docctor</option>
                            {doctorData.map((doctor: any) => {
                              return (
                                <option value={doctor._id}>
                                  {doctor.firstName} {doctor.lastName}
                                </option>
                              );
                            })}
                            {/* <option value="package1">Docctor 1</option>
                            <option value="package2">Docctor 2</option>
                            <option value="package3">Docctor 3</option> */}
                          </select>
                          {errors.doctor && (
                            <span className="error">{errors.doctor}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-sm-7 mb-4">
                          <label
                            htmlFor="formAdmissionDate"
                            className="form-label"
                          >
                            Admission Date <span className="required"></span>
                          </label>
                          <DatePicker
                            selected={admissionDate}
                            onChange={(date) => setAdmissionDate(date)}
                            className="form-control"
                            id="formAdmissionDate"
                            placeholderText="Admission Date"
                            showYearDropdown
                            showMonthDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            maxDate={new Date()}
                          />
                          {errors.admissionDate && (
                            <span className="error">
                              {errors.admissionDate}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-sm-7 mb-4">
                          <label
                            htmlFor="formDischargeDate"
                            className="form-label"
                          >
                            Discharge Date
                          </label>
                          <DatePicker
                            selected={dischargeDate}
                            onChange={(date) => setDischargeDate(date)}
                            className="form-control"
                            id="formDischargeDate"
                            placeholderText="Discharge Date"
                            showYearDropdown
                            showMonthDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            maxDate={new Date()}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <FileUploader label="Patient Profile" />
                      </div>
                      <div className="col-md-6">
                        <FileUploader label="Doctor Profile" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <input
                        className="btn btn_style me-2"
                        id="saveBtn"
                        type="button"
                        value="Save"
                        onClick={() => addNewAdmission()}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          navigate("/patients?tab=patient-admissions")
                        }
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
    </div>
  );
};

export default AddPatientAddmission;
