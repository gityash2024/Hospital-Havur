import React from "react";
import { MdEmail } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const ViewPatient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;

  // Helper function to render "N/A" for null or undefined values
  const renderValue = (value: any) => {
    return value ? value : "N/A";
  };
  console.log("Received item:", item);
  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">Patient Details</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/patients")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
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
                      {renderValue(item.firstName)}{" "}
                      {renderValue(item.middleName)}{" "}
                      {renderValue(item.lastName)}
                    </a>
                  </h2>
                  <span className="text-gray-600 fs-5">
                    <a className="text-gray-600 text-decoration-none fs-5">
                      <MdEmail /> {renderValue(item.emailAddress)}
                    </a>
                  </span>
                  <span className="d-flex align-items-start me-sm-5 mb-2 mt-2 text-gray-600 fs-5 justify-content-center justify-content-sm-start">
                    <span className="text-start">
                      {renderValue(item.address.city)},{" "}
                      {renderValue(item.address.state)},{" "}
                      {renderValue(item.address.pin)}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="mobileNumber" className="pb-2 fs-5 text-gray-600">
                Mobile Number:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.mobileNumber)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="birthDate" className="pb-2 fs-5 text-gray-600">
                Date of Birth:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.birthDate)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="gender" className="pb-2 fs-5 text-gray-600">
                Gender:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.gender)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="wedding" className="pb-2 fs-5 text-gray-600">
                Wedding Date:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.wedding)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="language" className="pb-2 fs-5 text-gray-600">
                Language:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.language)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="religion" className="pb-2 fs-5 text-gray-600">
                Religion:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.religion)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="weight" className="pb-2 fs-5 text-gray-600">
                Weight:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.weight)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="height" className="pb-2 fs-5 text-gray-600">
                Height:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.height)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label
                htmlFor="maritialStatus"
                className="pb-2 fs-5 text-gray-600"
              >
                Marital Status:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.maritialStatus)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label
                htmlFor="communication"
                className="pb-2 fs-5 text-gray-600"
              >
                Other Communication:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.communication.other)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="aadharNo" className="pb-2 fs-5 text-gray-600">
                Aadhar Number:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.aadharNo)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="panNo" className="pb-2 fs-5 text-gray-600">
                PAN Number:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.panNo)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="memberShipId" className="pb-2 fs-5 text-gray-600">
                Membership ID:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.memberShipId)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="employeeId" className="pb-2 fs-5 text-gray-600">
                Employee ID:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.employeeId)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="occupation" className="pb-2 fs-5 text-gray-600">
                Occupation:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.occupation)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label
                htmlFor="spouseOccupation"
                className="pb-2 fs-5 text-gray-600"
              >
                Spouse Occupation:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.spouseOccupation)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="companyName" className="pb-2 fs-5 text-gray-600">
                Company Name:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.companyName)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="education" className="pb-2 fs-5 text-gray-600">
                Education:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.education)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="mediclaim" className="pb-2 fs-5 text-gray-600">
                Mediclaim:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.mediclaim)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="remark" className="pb-2 fs-5 text-gray-600">
                Remark:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.remark)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
