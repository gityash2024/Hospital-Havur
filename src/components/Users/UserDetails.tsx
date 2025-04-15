import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;

  // Helper function to render "N/A" for null or undefined values
  const renderValue = (value: any) => {
    return value ? value : "N/A";
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">User Details</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/users")}
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
              <label htmlFor="doctor" className="pb-2 fs-5 text-gray-600">
                Firstname:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.firstName)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="doctor" className="pb-2 fs-5 text-gray-600">
                Lastname:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.lastName)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="email" className="pb-2 fs-5 text-gray-600">
                Email:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.email)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="phone" className="pb-2 fs-5 text-gray-600">
                Phone:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.phone)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="designation" className="pb-2 fs-5 text-gray-600">
                Role:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.role)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="dob" className="pb-2 fs-5 text-gray-600">
                Date of Birth:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.dob)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="status" className="pb-2 fs-5 text-gray-600">
                Status:
              </label>
              <span className="fs-5 text-gray-800">
                <div className="badge bg-light-success">
                  {renderValue(item.status.toString())}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
