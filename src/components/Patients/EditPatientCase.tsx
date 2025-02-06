import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const EditPatientCase = () => {
  const location = useLocation();
  const { item } = location.state;
  const navigate = useNavigate();
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [caseDate, setCaseDate] = useState<Date | null>(null);
  const [phone, setPhone] = useState(item.phone);
  const [fee, setFee] = useState(item.fee);
  const [description, setDescription] = useState(item.description);
  const [patientData, setPatientData] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [errors, setErrors] = useState<any>({});

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

  const EditPatientCase = async () => {
    const validationErrors: any = {};
    if (!patient) {
      validationErrors.patient = "Patient is required.";
    }

    if (!doctor) {
      validationErrors.doctor = "Doctor is required.";
    }

    if (!caseDate) {
      validationErrors.caseDate = "Case Date is required.";
    }

    if (!fee) {
      validationErrors.fee = "Fee is required.";
    } else if (isNaN(Number(fee))) {
      validationErrors.fee = "Fee must be a number.";
    }

    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      validationErrors.phone =
        "Phone number is required and must be 10 digits.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        patientId: patient,
        doctorId: doctor,
        caseDate: caseDate,
        phone: phone,
        fee: fee,
        description: description,
        id: item._id,
      };
      console.log(submitData);

      let response: any = await postApi(
        "hospital/patient/case/update",
        submitData
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/patients?tab=cases");
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">Edit Case</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/patients?tab=cases")}
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
                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label
                          htmlFor="formSelectPatient"
                          className="form-label"
                        >
                          Patient <span className="required">*</span>
                        </label>
                        <select
                          className="form-select"
                          value={patient}
                          onChange={(e) => setPatient(e.target.value)}
                        >
                          <option value="">
                            {item.patientId.firstName} {item.patientId.lastName}
                          </option>
                          {patientData.map((patient: any) => (
                            <option key={patient._id} value={patient._id}>
                              {patient.firstName} {patient.lastName}
                            </option>
                          ))}
                        </select>
                        {errors.patient && (
                          <span className="error">{errors.patient}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label
                          htmlFor="formSelectDoctor"
                          className="form-label"
                        >
                          Doctor <span className="required">*</span>
                        </label>
                        <select
                          className="form-select"
                          value={doctor}
                          onChange={(e) => setDoctor(e.target.value)}
                        >
                          <option value="">
                            {item.doctorId.firstName} {item.doctorId.lastName}
                          </option>
                          {doctorData.map((doctor: any) => (
                            <option key={doctor._id} value={doctor._id}>
                              {doctor.firstName} {doctor.lastName}
                            </option>
                          ))}
                        </select>
                        {errors.doctor && (
                          <span className="error">{errors.doctor}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formCaseDate" className="form-label">
                          Case Date <span className="required">*</span>
                        </label>
                        <DatePicker
                          selected={caseDate}
                          onChange={(date) => setCaseDate(date)}
                          className="form-control"
                          id="formCaseDate"
                          placeholderText="Case Date"
                          showYearDropdown
                          showMonthDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={100}
                          dateFormat="dd/MM/yyyy"
                          maxDate={new Date()}
                        />
                        {errors.caseDate && (
                          <span className="error">{errors.caseDate}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formPhone" className="form-label">
                          Phone <span className="required">*</span>
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
                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formFee" className="form-label">
                          Fee <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formFee"
                          placeholder="Fee"
                          value={fee}
                          onChange={(e) => setFee(e.target.value)}
                        />
                        {errors.fee && (
                          <span className="error">{errors.fee}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formDescription" className="form-label">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="formDescription"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <input
                      className="btn btn_style me-2"
                      id="saveBtn"
                      type="button"
                      value="Save"
                      onClick={EditPatientCase}
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

export default EditPatientCase;
