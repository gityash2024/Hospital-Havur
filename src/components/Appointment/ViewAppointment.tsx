import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/api";
import { toast } from "react-toastify";

const ViewAppointment = () => {
  const navigate = useNavigate();
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [patientData, setPatientData] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");
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

  const addAppointment = async (): Promise<void> => {
    const validationErrors: any = {};
    if (!patient) {
      validationErrors.patient = "Patient is required.";
    }

    if (!doctor) {
      validationErrors.doctor = "Doctor is required.";
    }

    // if (!appointmentDate) {
    //   validationErrors.appointmentDate = "Slot Time is required.";
    // }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        slotTime: appointmentDate,
        doctorId: doctor,
        patientId: patient,
      };
      console.log(submitData);

      let response: any = await postApi(
        "hospital/appointment/create",
        submitData
      );

      if (response.status === 200) {
        navigate("/appointment");
        toast.success(response.data.message);
      } else {
        toast.error(response.response.data);
      }
    }
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-3">
            <h1 className="mb-0 title_sm">Add Appointment</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/appointment")}
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
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="patient" className="form-label">
                          Patient <span className="required"></span>
                        </label>
                        <select
                          className="form-select"
                          name="patient"
                          id="patient"
                          onChange={(e) => setPatient(e.target.value)}
                        >
                          <option value="">Select Patient</option>
                          {patientData.map((item: any) => (
                            <option value={item._id}>
                              {item.firstName} {item.lastName}
                            </option>
                          ))}
                          {/* <option value="patient2">Patient 2</option>
                          <option value="patient3">Patient 3</option> */}
                        </select>
                        {errors.patient && (
                          <span className="error">{errors.patient}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="doctor" className="form-label">
                          Doctor <span className="required"></span>
                        </label>
                        <select
                          className="form-select"
                          name="doctor"
                          id="doctor"
                          onChange={(e) => setDoctor(e.target.value)}
                        >
                          <option value="">Select Doctor</option>
                          {doctorData.map((item: any) => (
                            <option value={item._id}>
                              {item.firstName} {item.lastName}
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
                        <label htmlFor="appointmentDate" className="form-label">
                          Slot Time <span className="required"></span>
                        </label>
                        <DatePicker
                          selected={appointmentDate}
                          onChange={(date) => setAppointmentDate(date)}
                          className="form-control"
                          id="appointmentDate"
                          placeholderText="Select Date"
                          showTimeInput
                          showYearDropdown
                          showMonthDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={100}
                          minDate={new Date()}
                        />
                        {errors.appointmentDate && (
                          <span className="error">
                            {errors.appointmentDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <input
                      className="btn btn_style me-2"
                      id="saveButton"
                      type="button"
                      value="Save"
                      onClick={() => addAppointment()}
                    />
                    <button
                      type="button"
                      onClick={() => navigate("/appointment")}
                      className="btn btn-secondary me-2"
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

export default ViewAppointment;
