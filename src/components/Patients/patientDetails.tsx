// import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

const PatientAdmissionDetails = ({ patientData }: any) => {
  //   const navigate = useNavigate();
  //   const location = useLocation();
  const item = patientData;
  console.log("✌️item --->", item);

  return (
    <>
      <div className="d-flex flex-column">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-flex flex-column ">
                <label htmlFor="doctor" className="pb-2 fs-5 text-gray-600">
                  Admission Date:
                </label>
                <span className="fs-5 text-gray-800">{item.admissionDate}</span>
              </div>
              <div className="col-md-6 d-flex flex-column ">
                <label htmlFor="email" className="pb-2 fs-5 text-gray-600">     
                  Discharge Date:
                </label>
                <span className="fs-5 text-gray-800">
                  {item.dischargeDate ?? "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-md-flex align-items-center justify-content-between">
        <h4 className="title_sm my-3">Doctor Details</h4>
      </div>
      <div className="d-flex flex-column">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-flex flex-column">
                <label htmlFor="address1" className="pb-2 fs-5 text-gray-600">
                  Firstname:
                </label>
                <span className="fs-5 text-gray-800">
                  {item.doctorId.firstName ?? "N/A"}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column">
                <label htmlFor="address2" className="pb-2 fs-5 text-gray-600">
                  Lastname:
                </label>
                <span className="fs-5 text-gray-800">
                  {item.doctorId.lastName ?? "N/A"}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column">
                <label htmlFor="city" className="pb-2 fs-5 text-gray-600">
                  Email:
                </label>
                <span className="fs-5 text-gray-800">
                  {item.doctorId.email}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column">
                <label htmlFor="zip" className="pb-2 fs-5 text-gray-600">
                  Mobile Number:
                </label>
                <span className="fs-5 text-gray-800">
                  {item.doctorId.mobileNumber ?? "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-md-flex align-items-center justify-content-between">
        <h4 className="title_sm my-3">Patient Details</h4>
      </div>
      <div className="d-flex flex-column">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="address1" className="pb-2 fs-5 text-gray-600">
                  Name:
                </label>
                <span className="fs-5 text-gray-800">
                  {item.patientId.firstName ?? "N/A"}{" "}
                  {item.patientId.lastName ?? "N/A"}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="address2" className="pb-2 fs-5 text-gray-600">
                  Email:
                </label>
                <span className="fs-5 text-gray-800">
                  {item.patientId.emailAddress ?? "N/A"}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="city" className="pb-2 fs-5 text-gray-600">
                  Mobile Number:
                </label>
                <span className="fs-5 text-gray-800">
                  {item.patientId.mobileNumber}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="zip" className="pb-2 fs-5 text-gray-600">
                  Birthdate:
                </label>
                <span className="fs-5 text-gray-800">
                  {item.patientId.birthDate ?? "N/A"}
                </span>
              </div>
              <div className="col-md-6 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="zip" className="pb-2 fs-5 text-gray-600">
                  Gender:
                </label>
                <span className="fs-5 text-gray-800">
                  {item.patientId.gender ?? "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientAdmissionDetails;
