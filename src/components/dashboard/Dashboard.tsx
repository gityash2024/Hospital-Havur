import React from "react";
import AdminWidget from "./AdminWidgate";
import Enquiries from "./Enquiries";
import UpcomingAppointments from "./UpcomingAppointments";
import NoticeBoards from "./NoticeBoards";

const Dashboard = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 mb-7 mb-xxl-0">
            <AdminWidget />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-7 mb-xxl-0">
            <Enquiries />
          </div>
          <div className="col-lg-6 mb-7 mb-xxl-0">
            <NoticeBoards />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-7 mb-xxl-0">
            <UpcomingAppointments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;