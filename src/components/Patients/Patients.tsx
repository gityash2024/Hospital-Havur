import React from "react";
import PatientListing from "./PatientListing";
import { useLocation } from "react-router-dom";
import PatientAdmission from "./PatientAdmission";
import Cases from "../Appointment/patientTabs/Cases";
import CaseHandler from "../Appointment/patientTabs/CaseHandler";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Patients = () => {
  const query = useQuery();
  const tab = query.get("tab");

  return (
    <div>
      {/* {tab !== "patient-admissions" ? <PatientListing /> : <PatientAdmission />} */}
      {tab === "patient-admissions" ? (
        <PatientAdmission />
      ) : tab === "casehandler" ? (
        <CaseHandler />
      ) : tab === "cases" ? (
        <Cases />
      ) : (
        <PatientListing />
      )}
      {/* <Patient_admission/> */}
      {/* <PatientListing /> */}
      {/* <Edit_patient_admission/> */}
      {/* <Edit_patient/> */}
    </div>
  );
};

export default Patients;
