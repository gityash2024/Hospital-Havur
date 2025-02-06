import React from "react";
import { MdEmail } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const ViewCaseHandler = () => {
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
    };
    return date.toLocaleDateString("en-US", options);
  };

  console.log("Received item:", item);

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">Case Handlers Details</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => navigate("/patients?tab=casehandler")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        {/* Personal Information */}
        <div className="card mb-5">
          <div className="card-header">
            <h5 className="card-title">Personal Information</h5>
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
                        {renderValue(item.firstName)}{" "}
                        {renderValue(item.lastName)}
                      </a>
                    </h2>
                    <span className="text-gray-600 fs-5">
                      <a className="text-gray-600 text-decoration-none fs-5">
                        <MdEmail /> {renderValue(item.email)}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="designation"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Designation:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.designation)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="mobileNumber"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Mobile Number:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.phone)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="gender" className="pb-2 fs-5 text-gray-600">
                  Gender:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.gender)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label
                  htmlFor="qualification"
                  className="pb-2 fs-5 text-gray-600"
                >
                  Qualification:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.qualification)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="birthDate" className="pb-2 fs-5 text-gray-600">
                  Date of Birth:
                </label>
                <span className="fs-5 text-gray-800">
                  {formatDate(item.birthDate)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="bloodGroup" className="pb-2 fs-5 text-gray-600">
                  Blood Group:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.bloodGroup)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="card mb-5">
          <div className="card-header">
            <h5 className="card-title">Address Information</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="address1" className="pb-2 fs-5 text-gray-600">
                  Address Line 1:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.address1)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="address2" className="pb-2 fs-5 text-gray-600">
                  Address Line 2:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.address2)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="city" className="pb-2 fs-5 text-gray-600">
                  City:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.city)}
                </span>
              </div>
              <div className="col-sm-6 col-md-4 d-flex flex-column mb-md-10 mb-5">
                <label htmlFor="zip" className="pb-2 fs-5 text-gray-600">
                  Zip Code:
                </label>
                <span className="fs-5 text-gray-800">
                  {renderValue(item.zip)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCaseHandler;
