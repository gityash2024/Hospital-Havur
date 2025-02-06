import * as React from "react";
import { BsSearch } from "react-icons/bs";
import AdminTable from "../common/AdminTable";
import { useNavigate } from "react-router-dom";

const DoctorListing = () => {
  const navigate = useNavigate();
  const [searchDoc, setSearchDoctor] = React.useState("");

  return (
    <div>
      <div className="d-lg-flex justify-content-between align-items-center mb-sm-7 mb-4">
        <div className="body_search">
          <BsSearch />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchDoctor(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-end flex-wrap">
          <button
            type="button"
            className="btn btn_style"
            onClick={() => navigate("/doctor/create")}
          >
            Add New Doctor
          </button>
        </div>
      </div>
      <AdminTable searchQuery={searchDoc} />
    </div>
  );
};

export default DoctorListing;
