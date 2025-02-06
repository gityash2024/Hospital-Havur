import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewAppointmentDetails = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { item } = location.state;
  console.log("✌️item --->", item);
  return (
    <div>
      <div className="d-md-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0 title_sm">Appointment Details</h4>
        <div className="text-end mt-4 mt-md-0">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => navigate("/appointment")}
          >
            Back
          </button>
        </div>
      </div>

      <div className="d-flex flex-column mb-3">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="appointmentId"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Appointment Id:
                </label>
                <span id="appointmentId" className="fs-5 text-gray-800">
                  {item._id}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="appointmentDate"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Date:
                </label>
                <span id="appointmentDate" className="fs-5 text-gray-800">
                  {item.slotTime}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="appointmentTime"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Time:
                </label>
                <span id="appointmentTime" className="fs-5 text-gray-800">
                  5:30 PM
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="appointmentStatus"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Status:
                </label>
                <span id="appointmentStatus" className="fs-5 text-gray-800">
                  <div className="badge bg-light-success">
                    {item.status.toString()}
                  </div>
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="tokenNo" className="pb-2 fs-5 text-gray-600">
                  Token No:
                </label>
                <span id="tokenNo" className="fs-5 text-gray-800">
                  {item.appointmentBy === "hospital" ? (
                    <div className="badge bg-light-success">{item.tokenNo}</div>
                  ) : (
                    <div className="badge bg-light-info">{item.tokenNo}</div>
                  )}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="appointmentTime"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Charge:
                </label>
                <span id="appointmentTime" className="fs-5 text-gray-800">
                  {item.appointmentCharge ?? "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-md-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0 title_sm">Doctor Details</h4>
      </div>
      <div className="d-flex flex-column mb-3">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="doctorFirstname"
                  className="pb-2 fs-5 text-gray-600"
                >
                  First Name:
                </label>
                <span id="doctorFirstname" className="fs-5 text-gray-800">
                  {item.doctorId.firstName}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="doctorLastname"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Last Name:
                </label>
                <span id="doctorLastname" className="fs-5 text-gray-800">
                  {item.doctorId.lastName}
                </span>
              </div>
              {/* <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="doctorEmail"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Email:
                </label>
                <span id="doctorEmail" className="fs-5 text-gray-800">
                  {item.doctorId.email}
                </span>
              </div> */}
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="doctorMobile"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Mobile No:
                </label>
                <span id="doctorMobile" className="fs-5 text-gray-800">
                  {item.doctorId.mobileNumber}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-md-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0 title_sm">Hospital Details</h4>
      </div>
      <div className="d-flex flex-column mb-3">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="hospitalEmail"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Email:
                </label>
                <span id="hospitalEmail" className="fs-5 text-gray-800">
                  {item.hospitalId.emailAddress}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="hospitalName"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Name:
                </label>
                <span id="hospitalName" className="fs-5 text-gray-800">
                  {item.hospitalId.name}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="hospitalMobile"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Mobile No:
                </label>
                <span id="hospitalMobile" className="fs-5 text-gray-800">
                  {item.hospitalId.mobileNumber}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-md-flex align-items-center justify-content-between mb-3">
        <h4 className="mb-0 title_sm">Patient Details</h4>
      </div>
      <div className="d-flex flex-column mb-3">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="patientName"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Name:
                </label>
                <span id="patientName" className="fs-5 text-gray-800">
                  {item.patientId.firstName} {item.patientId.lastName}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="patientEmail"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Email:
                </label>
                <span id="patientEmail" className="fs-5 text-gray-800">
                  {item.patientId.emailAddress}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="patientDob" className="pb-2 fs-5 text-gray-600">
                  DOB:
                </label>
                <span id="patientDob" className="fs-5 text-gray-800">
                  {item.patientId.birthDate}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="patientGender"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Gender:
                </label>
                <span id="patientGender" className="fs-5 text-gray-800">
                  {item.patientId.gender}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="patientMobile"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Mobile No:
                </label>
                <span id="patientMobile" className="fs-5 text-gray-800">
                  {item.patientId.mobileNumber}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointmentDetails;
