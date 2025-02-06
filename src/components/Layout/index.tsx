import React, { ReactNode } from "react";
import { Sidebar } from "../common/Sidebar";
import Header from "../common/Header";
import { navConfig } from "../../routes/navConfig";
import { useLocation } from "react-router";
// import { title } from "process";

interface LayoutProps {
  children: ReactNode;
}

const getSubTab = (pathname: string): any[] => {
  switch (pathname) {
    case "/appointment":
      return [
        { title: "Appointments", path: "/appointment" },
        {
          title: "Appointment Transaction",
          path: "/appointment?tab=appointment-transaction",
        },
      ];
    case "/doctor":
      return [{ title: "Doctor", path: "/doctor" }];
    case "/patients":
      return [
        { title: "Patients", path: "/patients" },
        {
          title: "Patients Admissions",
          path: "/patients?tab=patient-admissions",
        },
        { title: "Cases", path: "/patients?tab=cases" },
        { title: "Case Handler", path: "/patients?tab=casehandler" },
      ];
    case "/patients/view/:id":
      return [{ title: "Patients", path: "/patients" }];
    case "/hospital-dashboard":
      return [{ title: "Dashboard", path: "/hospital-dashboard" }];

    case "/bedtypes":
      return [
        { title: "Bed Types", path: "/bedtypes" },
        {
          title: "Bed",
          path: "/bedtypes?tab=bed",
        },
        {
          title: "Bed Assign",
          path: "/bedtypes?tab=bedassign",
        },
      ];
    case "/accounts":
      return [
        { title: "Accounts", path: "/accounts" },
        {
          title: "Invoice",
          path: "/accounts?tab=invoices",
        },
        {
          title: "Payments",
          path: "/accounts?tab=payments",
        },
        {
          title: "Payment Reports",
          path: "/accounts?tab=payment-reports",
        },
        {
          title: "Advance Payments",
          path: "/accounts?tab=advance-payment",
        },
        {
          title: "Bills",
          path: "/accounts?tab=bills",
        },
        {
          title: "Manual Billing Payments",
          path: "/accounts?tab=manual-billing-payments",
        },
      ];

    case "/IPD-patients":
      return [
        { title: "IPD", path: "/IPD-patients" },
        {
          title: "OPD",
          path: "/IPD-patients?tab=OPD-patients",
        },
      ];

    case "/users":
      return [{ title: "Users", path: "/users" }];
    case "/users/create":
      return [{ title: "Users", path: "/users/create" }];
    case "/users/view/:id":
      return [{ title: "Users", path: "/users/view/:id" }];
    case "/users/edit/:id":
      return [{ title: "Users", path: "/users/edit/:id" }];
    default:
      return [];
  }
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location: any = useLocation();
  const role: string | null = localStorage.getItem("role") as string;

  return (
    <div>
      <Sidebar routes={navConfig["hospital_admin"]} />
      <div className="dashboard-body">
        <Header
          linkTexts={getSubTab(location?.pathname.toString())}
          children=""
        />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
