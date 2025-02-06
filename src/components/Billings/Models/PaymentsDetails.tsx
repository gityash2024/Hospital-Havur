import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentsDetails: React.FC = () => {
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
            <h1 className="mb-0 title_sm">Payments Details</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => navigate("/accounts?tab=payments")}
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
                Account:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.accountId.name)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="doctor" className="pb-2 fs-5 text-gray-600">
                Payment Date:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.paymentDate)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="doctor" className="pb-2 fs-5 text-gray-600">
                Pay To:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.payTo)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="doctor" className="pb-2 fs-5 text-gray-600">
                Amount:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.amount)}
              </span>
            </div>

            <div className="col-sm-6 d-flex flex-column mb-md-10 mb-5">
              <label htmlFor="email" className="pb-2 fs-5 text-gray-600">
                Description:
              </label>
              <span className="fs-5 text-gray-800">
                {renderValue(item.description)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsDetails;
