import React from "react";
import { MdEmail } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const ViewIPD = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;

  // Helper function to render "N/A" for null or undefined values
  const renderValue = (value: any) => {
    return value ? value : "N/A";
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  };

  console.log("Received item:", item);

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">IPD Patient Details</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => navigate("/IPD-patients")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        {/* Patient Information */}
        <div className="card mb-5">
          <div className="card-header">
            <h5 className="card-title">Patient Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12 d-flex flex-column mb-md-10 mb-5">
                <div className="d-sm-flex align-items-center mb-5 mb-xxl-0 text-center text-sm-start">
                  <div className="image image-circle image-small me-3">
                    <img
                      src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg"
                      alt="Patient Avatar"
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <div className="ms-0 ms-sm-10 mt-5 mt-sm-0">
                    <h2>
                      <a className="text-decoration-none">
                        {renderValue(item.patientId.firstName)}{" "}
                        {renderValue(item.patientId.lastName)}
                      </a>
                    </h2>
                    <span className="text-gray-600 fs-5">
                      <a className="text-gray-600 text-decoration-none fs-5">
                        <MdEmail /> {renderValue(item.patientId.emailAddress)}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="mobileNumber"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Mobile Number:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.patientId.mobileNumber)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="gender" className="pb-2 fs-5 text-gray-600">
                  Gender:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.patientId.gender)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="addmisiondate"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Admission Date:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.admissionDate)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="birthDate" className="pb-2 fs-5 text-gray-600">
                  Date of Birth:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.patientId.birthDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Case Information */}
        <div className="card mb-5">
          <div className="card-header">
            <h5 className="card-title">Case Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="caseDate" className="pb-2 fs-5 text-gray-600">
                  Case Date:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.caseId.caseDate)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="phone" className="pb-2 fs-5 text-gray-600">
                  Phone:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.caseId.phone)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="fee" className="pb-2 fs-5 text-gray-600">
                  Fee:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.caseId.fee)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="caseId" className="pb-2 fs-5 text-gray-600">
                  Case ID:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.caseId.caseId)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="card mb-5">
          <div className="card-header">
            <h5 className="card-title">Doctor Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="doctorName" className="pb-2 fs-5 text-gray-600">
                  Doctor Name:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.doctorId.firstName)}{" "}
                  {renderValue(item.doctorId.lastName)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="doctorPhone"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Mobile Number:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.doctorId.mobileNumber)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bed Information */}
        <div className="card mb-5">
          <div className="card-header">
            <h5 className="card-title">Bed Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="bedName" className="pb-2 fs-5 text-gray-600">
                  Bed Name:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.bed?.name)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="bedAvailability"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Availability:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.bed?.available)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="bedType" className="pb-2 fs-5 text-gray-600">
                  Bed Type:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.bedType?.bedType)} -{" "}
                  {renderValue(item.bedType?.description)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Other Information */}
        <div className="card mb-5">
          <div className="card-header">
            <h5 className="card-title">Other Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="weight" className="pb-2 fs-5 text-gray-600">
                  Weight:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.weight)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="height" className="pb-2 fs-5 text-gray-600">
                  Height:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.height)}
                </span>
              </div>

              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="bp" className="pb-2 fs-5 text-gray-600">
                  Blood Pressure:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.bloodPressure)}
                </span>
              </div>

              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="symptoms" className="pb-2 fs-5 text-gray-600">
                  Symptoms:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.symptoms)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewIPD;
