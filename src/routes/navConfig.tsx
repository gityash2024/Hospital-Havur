import React from "react";
import {
  BsCalendarCheck,
  BsFillHospitalFill,
  BsFillPersonFill,
  BsFillHouseDoorFill,
  BsFillFileEarmarkMedicalFill,
  BsHospital,
} from "react-icons/bs";
import {
  FaBed,
  FaFilePrescription,
  FaHospitalAlt,
  FaHouseUser,
  FaMoneyBill,
} from "react-icons/fa";
// import Dashboard from "../components/Dashboard";
import { Login } from "../components/auth-pages/Login";
import Doctor from "../components/Doctor/Doctor";
import DoctorDetails from "../components/Doctor/DoctorDetails";
import AddDoctorForm from "../components/Doctor/AddDoctorForm";
import ViewAppointment from "../components/Appointment/ViewAppointment";
import Patients from "../components/Patients/Patients";
import AddPatientForm from "../components/Patients/AddPatientForm";
import ViewAppointmentDetails from "../components/Appointment/appointmentDetails";
import Appointment from "../components/Appointment/Appointment";
import ViewPatient from "../components/Patients/ViewPatient";
import AddPatientAddmission from "../components/Patients/addPatientAdmission";
import Dashboard from "../components/dashboard/Dashboard";
import BedManagement from "../components/Bed-management/BedManagement";
import BillingManagement from "../components/Billings/BillingManagement";
import IPDOPDManagement from "../components/IPD-OPD/IPD-OPDManagement";
import AddPatientCase from "../components/Patients/AddPatientCase";
import AddIPDPatient from "../components/Patients/AddIPDForm";
import AddOPDPatient from "../components/Patients/AddOPDForm";
import AddBedAssign from "../components/Bed-management/AddBedAssign";
import AddBedType from "../components/Bed-management/AddBedType";
import EditPatientCase from "../components/Patients/EditPatientCase";
import EditBedType from "../components/Bed-management/EditBedType";
import AddBed from "../components/Bed-management/AddBed";
import EditBed from "../components/Bed-management/EditBed";
import EditIPD from "../components/IPD-OPD/EditIPD";
import ViewIPD from "../components/IPD-OPD/ViewIPD";
import ViewOPD from "../components/IPD-OPD/ViewOPD";
import AddCaseHandler from "../components/Patients/AddCaseHandler";
import ViewCaseHandler from "../components/Patients/ViewCaseHandler";
import EditBedAssign from "../components/Bed-management/EditBedAssign";
import Users from "../components/Users/Users";
import AddUsers from "../components/Users/AddUsers";
import UserDetails from "../components/Users/UserDetails";
import UpdateUser from "../components/Users/UpdateUser";
import AddAccount from "../components/Billings/Models/AddAccountModel";
import EditAccount from "../components/Billings/Models/EditAccount";
import AccountDetails from "../components/Billings/Models/AccountDetails";
import AddBills from "../components/Billings/Models/AddBills";
import EditBills from "../components/Billings/Models/EditBills";
import AddPayments from "../components/Billings/Models/AddPayments";
import PaymentsDetails from "../components/Billings/Models/PaymentsDetails";
import EditPayments from "../components/Billings/Models/EditPayments";
import AddAdvancePayment from "../components/Billings/Models/AddAdvancePayment";
import EditAdvancePayment from "../components/Billings/Models/EditAdvancePayment";
import AddInvoice from "../components/Billings/Models/AddInvoice";
import EditInvoice from "../components/Billings/Models/EditInvoices";
import Prescriptions from "../components/Prescriptions/Prescriptions";
import AddPrescriptions from "../components/Prescriptions/AddPrescription";
import EditPrescription from "../components/Prescriptions/EditPrescription";

export interface RouteType {
  title: string;
  path: string;
  subPath?: string;
  isShowInSidebar?: boolean;
  component: JSX.Element;
  icon: any;
}

export const commonRoutes: RouteType[] = [
  {
    title: "Login",
    path: "/login",
    component: <Login />,
    icon: "",
  },
];

export const hospitalAdminRoute: RouteType[] = [
  {
    title: "Dashboard",
    path: "/hospital-dashboard",
    subPath: "dashboard",
    isShowInSidebar: true,
    component: <Dashboard />,
    icon: <BsCalendarCheck />,
  },
  {
    title: "Appointment",
    path: "/appointment",
    subPath: "appointment",
    isShowInSidebar: true,
    component: <Appointment />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Appointment",
    path: "/appointment/view/:id",
    subPath: "appointment",
    isShowInSidebar: false,
    component: <ViewAppointmentDetails />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Appointment",
    path: "/appointment/create",
    subPath: "appointment",
    isShowInSidebar: false,
    component: <ViewAppointment />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Doctor",
    path: "/doctor",
    subPath: "doctor",
    isShowInSidebar: true,
    component: <Doctor />,
    icon: <BsFillPersonFill />,
  },
  {
    title: "Doctor",
    path: "/doctor/:id",
    subPath: "",
    isShowInSidebar: false,
    component: <DoctorDetails />,
    icon: <BsFillPersonFill />,
  },
  {
    title: "Doctor",
    path: "/doctor/create",
    subPath: "",
    isShowInSidebar: false,
    component: <AddDoctorForm />,
    icon: <BsFillPersonFill />,
  },
  {
    title: "Patients",
    path: "/patients",
    subPath: "Patients",
    isShowInSidebar: true,
    component: <Patients />,
    icon: <BsFillFileEarmarkMedicalFill />,
  },
  {
    title: "Patients",
    path: "/patients/view/:id",
    subPath: "Patients",
    isShowInSidebar: false,
    component: <ViewPatient />,
    icon: <BsFillFileEarmarkMedicalFill />,
  },
  {
    title: "Patients",
    path: "/patients/create",
    subPath: "Patients",
    isShowInSidebar: false,
    component: <AddPatientForm />,
    icon: <BsFillFileEarmarkMedicalFill />,
  },
  {
    title: "Patients",
    path: "/patients/admission/create",
    subPath: "Patients",
    isShowInSidebar: false,
    component: <AddPatientAddmission />,
    icon: <BsFillFileEarmarkMedicalFill />,
  },

  {
    title: "Bed Management",
    path: "/bedtypes",
    subPath: "BedManagement",
    isShowInSidebar: true,
    component: <BedManagement />,
    icon: <FaBed />,
  },
  {
    title: "Billings",
    path: "/accounts",
    subPath: "Billings",
    isShowInSidebar: true,
    component: <BillingManagement />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/accounts/create",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <AddAccount />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/accounts/edit/:id",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <EditAccount />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/accounts/view/:id",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <AccountDetails />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/bills/create",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <AddBills />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/bills/edit/:id",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <EditBills />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/payments/create",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <AddPayments />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/payments/view/:id",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <PaymentsDetails />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/payments/edit/:id",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <EditPayments />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/advance-payments/create",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <AddAdvancePayment />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/advance-payments/edit/:id",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <EditAdvancePayment />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/invoices/create",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <AddInvoice />,
    icon: <FaMoneyBill />,
  },
  {
    title: "Billings",
    path: "/invoices/edit/:id",
    subPath: "Billings",
    isShowInSidebar: false,
    component: <EditInvoice />,
    icon: <FaMoneyBill />,
  },
  {
    title: "IPD/OPD",
    path: "/IPD-patients",
    subPath: "IPD/OPD",
    isShowInSidebar: true,
    component: <IPDOPDManagement />,
    icon: <FaHospitalAlt />,
  },
  {
    title: "Patient",
    path: "/patients/cases/create",
    subPath: "Patients",
    isShowInSidebar: false,
    component: <AddPatientCase />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Patients",
    path: "/patients/cases/edit/:id",
    subPath: "Patients",
    isShowInSidebar: false,
    component: <EditPatientCase />,
    icon: <BsFillFileEarmarkMedicalFill />,
  },
  {
    title: "Patient",
    path: "/patients/casehandler/create",
    subPath: "Patients",
    isShowInSidebar: false,
    component: <AddCaseHandler />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Patient",
    path: "/patients/casehandler/view/:id",
    subPath: "Patients",
    isShowInSidebar: false,
    component: <ViewCaseHandler />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "IPD",
    path: "/IPD-patients/create",
    subPath: "IPD",
    isShowInSidebar: false,
    component: <AddIPDPatient />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "IPD",
    path: "/IPD-patients/edit/:id",
    subPath: "IPD",
    isShowInSidebar: false,
    component: <EditIPD />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "IPD",
    path: "/IPD-patients/view/:id",
    subPath: "IPD",
    isShowInSidebar: false,
    component: <ViewIPD />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "OPD",
    path: "/OPD-patients/view/:id",
    subPath: "OPD",
    isShowInSidebar: false,
    component: <ViewOPD />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "OPD",
    path: "/OPD-patients/create",
    subPath: "OPD",
    isShowInSidebar: false,
    component: <AddOPDPatient />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Prescription",
    path: "/prescription",
    subPath: "Prescription",
    isShowInSidebar: true,
    component: <Prescriptions />,
    icon: <FaFilePrescription />,
  },
  {
    title: "Prescription",
    path: "/prescription/edit/:id",
    subPath: "Prescription",
    isShowInSidebar: false,
    component: <EditPrescription />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Prescription",
    path: "/prescription/create",
    subPath: "Prescription",
    isShowInSidebar: false,
    component: <AddPrescriptions />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Bed Assign",
    path: "/bedassign/create",
    subPath: "Bedassign",
    isShowInSidebar: false,
    component: <AddBedAssign />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Bed Assign",
    path: "/bedassign/edit/:id",
    subPath: "Bedassign",
    isShowInSidebar: false,
    component: <EditBedAssign />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Bed Type",
    path: "/bedtypes/create",
    subPath: "Bed Type",
    isShowInSidebar: false,
    component: <AddBedType />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Bed Type",
    path: "/bedtypes/edit/:id",
    subPath: "Bed Type",
    isShowInSidebar: false,
    component: <EditBedType />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Bed",
    path: "/bed/create",
    subPath: "Bed",
    isShowInSidebar: false,
    component: <AddBed />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Bed Type",
    path: "/bed/edit/:id",
    subPath: "Bed",
    isShowInSidebar: false,
    component: <EditBed />,
    icon: <BsFillHospitalFill />,
  },
  {
    title: "Users",
    path: "/users",
    subPath: "users",
    isShowInSidebar: true,
    component: <Users />,
    icon: <FaHouseUser />,
  },
  {
    title: "Users",
    path: "/users/create",
    subPath: "users",
    isShowInSidebar: false,
    component: <AddUsers />,
    icon: <FaHouseUser />,
  },
  {
    title: "Users",
    path: "/users/view/:id",
    subPath: "users",
    isShowInSidebar: false,
    component: <UserDetails />,
    icon: <FaHouseUser />,
  },
  {
    title: "Users",
    path: "/users/edit/:id",
    subPath: "users",
    isShowInSidebar: false,
    component: <UpdateUser />,
    icon: <FaHouseUser />,
  },
];

export interface NavConfigType {
  [key: string]: RouteType[];
}

export const navConfig: NavConfigType = {
  common: commonRoutes,
  hospital_admin: hospitalAdminRoute,
};
