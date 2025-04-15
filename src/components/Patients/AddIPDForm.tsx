// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { postApi } from "../services/api";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const AddIPDPatient = () => {
//   const navigate = useNavigate();
//   const [patient, setPatient] = useState("");
//   const [doctor, setDoctor] = useState("");
//   const [caseType, setCaseType] = useState("");
//   const [bedType, setBedType] = useState("");
//   const [bed, setBed] = useState("");
//   const [weight, setWeight] = useState("");
//   const [height, setHeight] = useState("");
//   const [bloodPressure, setBloodPressure] = useState("");
//   const [admissionDate, setAdmissionDate] = useState<Date | null>(new Date());
//   const [isOldPatient, setIsOldPatient] = useState(false);
//   const [symptoms, setSymptoms] = useState("");
//   const [notes, setNotes] = useState("");
//   const [diet, setDiet] = useState("");
//   const [procedureSurgery, setProcedureSurgery] = useState("");
//   const [patientData, setPatientData] = useState([]);
//   const [doctorData, setDoctorData] = useState([]);
//   const [bedTypes, setBedTypes] = useState([]);
//   const [beds, setBeds] = useState([]);
//   const [caseTypes, setCaseTypes] = useState<any>([]);
//   const [errors, setErrors] = useState<any>({});
//   const [ipdNumber, setIpdNumber] = useState("");

//   useEffect(() => {
//     const getPatientsData = async () => {
//       const response = await postApi("hospital/patient/list", {});
//       if (response.status === 200) {
//         setPatientData(response.data.data.patient);
//       }
//     };

//     const getDoctorData = async () => {
//       const response = await postApi("hospital/doctor/list", {});
//       if (response.status === 200) {
//         setDoctorData(response.data.data.doctor);
//       }
//     };

//     const getBedTypes = async () => {
//       const response = await postApi("hospital/bedtype/list", {});
//       if (response.status === 200) {
//         setBedTypes(response.data.data.bedTypes);
//       }
//     };

//     const getBeds = async () => {
//       const response = await postApi("hospital/bed/list", {});
//       if (response.status === 200) {
//         setBeds(response.data.data.bed);
//         setBeds(response.data.data.bed);
//       }
//     };

//     const getCaseTypes = async () => {
//       const response = await postApi("hospital/case/list", {});
//       if (response.status === 200) {
//         setCaseTypes(response.data.data.caseTypes);
//       }
//     };

//     getPatientsData();
//     getDoctorData();
//     getBedTypes();
//     getBeds();
//     getCaseTypes();
//   }, []);

//   const handleSwitchToggle = () => {
//     setIsOldPatient(!isOldPatient);
//   };

//   const validateForm = () => {
//     const validationErrors: any = {};
//     if (!patient) {
//       validationErrors.patient = "Patient is required.";
//     }
//     if (!caseType) {
//       validationErrors.caseType = "Case type is required.";
//     }
//     if (!doctor) {
//       validationErrors.doctor = "Doctor is required.";
//     }
//     if (!admissionDate) {
//       validationErrors.admissionDate = "Admission Date is required.";
//     }
//     if (!bedType) {
//       validationErrors.bedType = "Bed Type is required.";
//     }
//     if (!bed) {
//       validationErrors.bed = "Bed is required.";
//     }
//     if (!weight || isNaN(Number(weight))) {
//       validationErrors.weight = "Weight must be a number.";
//     }
//     if (!height || isNaN(Number(height))) {
//       validationErrors.height = "Height must be a number.";
//     }

//     setErrors(validationErrors);

//     return Object.keys(validationErrors).length === 0;
//   };

//   const addIPDPatient = async () => {
//     if (!validateForm()) return;

//     const submitData = {
//       patientId: patient,
//       ipdNumber: ipdNumber,
//       doctorId: doctor,
//       caseType: caseType,
//       bedType: bedType,
//       bed: bed,
//       weight: weight,
//       height: height,
//       bloodPressure: bloodPressure,
//       admissionDate: admissionDate,
//       // isOldPatient: isOldPatient,
//       symptoms: symptoms,
//       notes: notes,
//       // diet: diet,
//       // procedureSurgery: procedureSurgery,
//     };

//     try {
//       const response = await postApi("hospital/ipd/add", submitData);

//       if (response.status === 200) {
//         navigate("/IPD-patients");
//         toast.success(response.data.message);
//       } else {
//         toast.error(response.message);
//       }
//     } catch (error) {
//       toast.error("Failed to add IPD Patient");
//     }
//   };

//   // Function to handle change in Patient selection
//   const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedPatient = e.target.value;
//     setPatient(selectedPatient);
//     // Reset related fields when patient changes
//     setCaseType("");
//   };

//   // Function to handle change in Bed Type selection
//   const handleBedTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedBedType = e.target.value;
//     setBedType(selectedBedType);
//     // Reset related fields when bed type changes
//     setBed("");
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h4 className="title-sm mb-0">New IPD Patient</h4>
//         <button
//           type="button"
//           className="btn btn_style"
//           onClick={() => navigate("/IPD-patients")}
//         >
//           Back
//         </button>
//       </div>
//       <div className="card">
//         <div className="card-body">
//           <form>
//             <div className="row g-3">
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label htmlFor="formSelectIPDNumber" className="form-label">
//                     IPD Number
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={ipdNumber}
//                     onChange={(e) => setIpdNumber(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label htmlFor="formSelectPatient" className="form-label">
//                     Patient <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className={`form-select ${
//                       errors.patient ? "is-invalid" : ""
//                     }`}
//                     value={patient}
//                     onChange={handlePatientChange} // Call handlePatientChange on change
//                   >
//                     <option value="">Select Patient</option>
//                     {patientData?.map((patient: any) => (
//                       <option key={patient._id} value={patient._id}>
//                         {patient.firstName} {patient.lastName}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.patient && (
//                     <div className="invalid-feedback d-block">
//                       {errors.patient}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label htmlFor="formSelectCase" className="form-label">
//                     Case Type <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className={`form-select ${
//                       errors.caseType ? "is-invalid" : ""
//                     }`}
//                     value={caseType}
//                     onChange={(e) => setCaseType(e.target.value)}
//                     disabled={!patient} // Disable if patient is not selected
//                   >
//                     <option value="">Choose Case Type</option>
//                     {Array.isArray(caseTypes) &&
//                       caseTypes?.map((caseType: any) => (
//                         <option key={caseType._id} value={caseType._id}>
//                           {caseType.name}
//                         </option>
//                       ))}
//                   </select>
//                   {errors.caseType && (
//                     <div className="invalid-feedback d-block">
//                       {errors.caseType}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label htmlFor="formSelectDoctor" className="form-label">
//                     Doctor <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className={`form-select ${
//                       errors.doctor ? "is-invalid" : ""
//                     }`}
//                     value={doctor}
//                     onChange={(e) => setDoctor(e.target.value)}
//                   >
//                     <option value="">Choose Doctor</option>
//                     {doctorData.map((doctor: any) => (
//                       <option key={doctor._id} value={doctor._id}>
//                         {doctor.firstName} {doctor.lastName}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.doctor && (
//                     <div className="invalid-feedback d-block">
//                       {errors.doctor}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <hr />
//             <div className="row g-3">
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label htmlFor="formSelectBedType" className="form-label">
//                     Bed Type <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className={`form-select ${
//                       errors.bedType ? "is-invalid" : ""
//                     }`}
//                     value={bedType}
//                     onChange={handleBedTypeChange} // Call handleBedTypeChange on change
//                   >
//                     <option value="">Choose Bed Type</option>
//                     {bedTypes.map((bedType: any) => (
//                       <option key={bedType._id} value={bedType._id}>
//                         {bedType.name}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.bedType && (
//                     <div className="invalid-feedback d-block">
//                       {errors.bedType}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label htmlFor="formSelectBed" className="form-label">
//                     Bed <span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className={`form-select ${errors.bed ? "is-invalid" : ""}`}
//                     value={bed}
//                     onChange={(e) => setBed(e.target.value)}
//                     disabled={!bedType} // Disable if bed type is not selected
//                   >
//                     <option value="">Choose Bed</option>
//                     {beds.map((bed: any) => (
//                       <option key={bed._id} value={bed._id}>
//                         {bed.bedNumber}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.bed && (
//                     <div className="invalid-feedback d-block">{errors.bed}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label htmlFor="formAdmissionDate" className="form-label">
//                     Admission Date <span className="text-danger">*</span>
//                   </label>
//                   <DatePicker
//                     selected={admissionDate}
//                     onChange={(date: Date) => setAdmissionDate(date)}
//                     className={`form-control ${
//                       errors.admissionDate ? "is-invalid" : ""
//                     }`}
//                     dateFormat="dd/MM/yyyy h:mm aa"
//                     showTimeInput
//                   />
//                   {errors.admissionDate && (
//                     <div className="invalid-feedback d-block">
//                       {errors.admissionDate}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <hr />
//             <div className="row g-3">
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label htmlFor="formWeight" className="form-label">
//                     Weight (kg)
//                   </label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       errors.weight ? "is-invalid" : ""
//                     }`}
//                     value={weight}
//                     onChange={(e) => setWeight(e.target.value)}
//                   />
//                   {errors.weight && (
//                     <div className="invalid-feedback d-block">
//                       {errors.weight}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label htmlFor="formHeight" className="form-label">
//                     Height (cm)
//                   </label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       errors.height ? "is-invalid" : ""
//                     }`}
//                     value={height}
//                     onChange={(e) => setHeight(e.target.value)}
//                   />
//                   {errors.height && (
//                     <div className="invalid-feedback d-block">
//                       {errors.height}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="mb-3">
//                   <label htmlFor="formBP" className="form-label">
//                     Blood Pressure
//                   </label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       errors.bloodPressure ? "is-invalid" : ""
//                     }`}
//                     value={bloodPressure}
//                     onChange={(e) => setBloodPressure(e.target.value)}
//                   />
//                   {errors.bloodPressure && (
//                     <div className="invalid-feedback d-block">
//                       {errors.bloodPressure}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="row g-3">
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label htmlFor="formSymptoms" className="form-label">
//                     Symptoms
//                   </label>
//                   <textarea
//                     className="form-control"
//                     value={symptoms}
//                     onChange={(e) => setSymptoms(e.target.value)}
//                     rows={3}
//                   />
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className="mb-3">
//                   <label htmlFor="formNotes" className="form-label">
//                     Notes
//                   </label>
//                   <textarea
//                     className="form-control"
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                     rows={3}
//                   />
//                 </div>
//               </div>
//             </div>

//             <hr />
//             <div className="d-flex justify-content-end align-items-end mx-4">
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={addIPDPatient}
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddIPDPatient;

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddIPDPatient = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [caseType, setCaseType] = useState("");
  const [bedType, setBedType] = useState("");
  const [bed, setBed] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [admissionDate, setAdmissionDate] = useState<Date | null>(null);
  const [isOldPatient, setIsOldPatient] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [notes, setNotes] = useState("");
  const [diet, setDiet] = useState("");
  const [procedureSurgery, setProcedureSurgery] = useState("");
  const [patientData, setPatientData] = useState([]);
  const [doctorData, setdoctorData] = useState<any>([]);
  const [bedTypes, setBedTypes] = useState([]);
  const [beds, setBeds] = useState([]);
  const [caseTypes, setCaseTypes] = useState([]);
  const [errors, setErrors] = useState<any>({});
  const [ipdNumber, setIpdNumber] = useState("");
  useEffect(() => {
    const getPatientsData = async () => {
      const response = await postApi("hospital/patient/list", {});
      if (response.status === 200) {
        setPatientData(response.data.data.patient);
      }
    };
    const getDoctorData = async () => {
      const response = await postApi("hospital/doctor/list", {});
      if (response.status === 200) {
        setdoctorData(response.data.data.doctor);
      }
    };
    getPatientsData();
    getDoctorData();
  }, []);
  useEffect(() => {
    const getCaseTypes = async () => {
      const response = await postApi("hospital/patient/case/patient_by/list", {
        patientId: patient,
      });
      if (response.status === 200) {
        setCaseTypes(response.data.data);
      }
    };
    getCaseTypes();
  }, [patient]);
  useEffect(() => {
    const getBedTypes = async () => {
      const response = await postApi("hospital/bed_type/list", {});
      if (response.status === 200) {
        setBedTypes(response.data.data.bedType);
      }
    };
    getBedTypes();
  }, []);

  useEffect(() => {
    const getBeds = async () => {
      const response = await postApi("hospital/bed/bed_type_according/list", {
        bedType: bedType,
      });
      if (response.status === 200) {
        setBeds(response.data.data);
      }
    };
    getBeds();
  }, [bedType]);
  const handleSwitchToggle = () => {
    setIsOldPatient(!isOldPatient);
  };
  const validateForm = () => {
    const validationErrors: any = {};
    if (!patient) {
      validationErrors.patient = "Patient is required.";
    }
    if (!caseType) {
      validationErrors.caseType = "Case type is required.";
    }
    if (!doctor) {
      validationErrors.doctor = "doctor is required.";
    }
    if (!admissionDate) {
      validationErrors.admissionDate = "Admission Date is required.";
    }
    if (!bedType) {
      validationErrors.bedType = "Bed Type is required.";
    }
    if (!bed) {
      validationErrors.bed = "Bed is required.";
    }
    if (!weight || isNaN(Number(weight))) {
      validationErrors.weight = "Weight must be a number.";
    }
    if (!height || isNaN(Number(height))) {
      validationErrors.height = "Height must be a number.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  const addIPDPatient = async () => {
    if (!validateForm()) return;
    const submitData = {
      patientId: patient,
      ipdNumber: ipdNumber,
      doctorId: doctor,
      caseId: caseType,
      bedType: bedType,
      bed: bed,
      weight: weight,
      height: height,
      bloodPressure: bloodPressure,
      admissionDate: admissionDate,
      // isOldPatient: isOldPatient,
      symptoms: symptoms,
      notes: notes,
      // diet: diet,
      // procedureSurgery: procedureSurgery,
    };
    console.log(submitData);

    try {
      const response = await postApi("hospital/ipd_patient/add", submitData);
      if (response.status === 200) {
        navigate("/IPD-patients");
        toast.success(response.data.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add IPD Patient");
    }
  };
  // Function to handle change in Patient selection
  const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPatient = e.target.value;
    setPatient(selectedPatient);
    // Reset related fields when patient changes
    setCaseType("");
  };
  // Function to handle change in Bed Type selection
  const handleBedTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBedType = e.target.value;
    setBedType(selectedBedType);
    // Reset related fields when bed type changes
    setBed("");
  };
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="title_sm mb-0">New IPD Patient</h4>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/IPD-patients")}
        >
          Back
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="formSelectPatient" className="form-label">
                    Patient <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      errors.patient ? "is-invalid" : ""
                    }`}
                    value={patient}
                    onChange={handlePatientChange} // Call handlePatientChange on change
                  >
                    <option value="">Select Patient</option>
                    {patientData.map((patient: any) => (
                      <option key={patient._id} value={patient._id}>
                        {patient.firstName} {patient.lastName}
                      </option>
                    ))}
                  </select>
                  {errors.patient && (
                    <div className="invalid-feedback d-block">
                      {errors.patient}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="formSelectCase" className="form-label">
                    Case <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      errors.caseType ? "is-invalid" : ""
                    }`}
                    value={caseType}
                    onChange={(e) => setCaseType(e.target.value)}
                    disabled={!patient} // Disable if patient is not selected
                  >
                    <option value="">Choose Case</option>
                    {caseTypes.map((caseType: any) =>
                      caseType ? (
                        <option key={caseType._id} value={caseType._id}>
                          {caseType.caseId}
                        </option>
                      ) : (
                        <option value="">No case Found</option>
                      )
                    )}
                  </select>
                  {errors.caseType && (
                    <div className="invalid-feedback d-block">
                      {errors.caseType}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="formSelectDoctor" className="form-label">
                    Doctor <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      errors.doctor ? "is-invalid" : ""
                    }`}
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                  >
                    <option value="">Choose Doctor</option>
                    {doctorData.map((doctor: any) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.firstName} {doctor.lastName}
                      </option>
                    ))}
                  </select>
                  {errors.doctor && (
                    <div className="invalid-feedback d-block">
                      {errors.doctor}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div className="row g-3">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="formSelectBedType" className="form-label">
                    Bed Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${
                      errors.bedType ? "is-invalid" : ""
                    }`}
                    value={bedType}
                    onChange={handleBedTypeChange} // Call handleBedTypeChange on change
                  >
                    <option value="">Choose Bed Type</option>
                    {bedTypes.map((bedType: any) => (
                      <option key={bedType._id} value={bedType._id}>
                        {bedType.bedType}
                      </option>
                    ))}
                  </select>
                  {errors.bedType && (
                    <div className="invalid-feedback d-block">
                      {errors.bedType}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="formSelectBed" className="form-label">
                    Bed <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.bed ? "is-invalid" : ""}`}
                    value={bed}
                    onChange={(e) => setBed(e.target.value)}
                    disabled={!bedType} // Disable if bed type is not selected
                  >
                    <option value="">Choose Bed</option>
                    {beds.map((bed: any) => (
                      <option key={bed._id} value={bed._id}>
                        {bed.name}
                      </option>
                    ))}
                  </select>
                  {errors.bed && (
                    <div className="invalid-feedback d-block">{errors.bed}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="formAdmissionDate" className="form-label">
                    Admission Date <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    selected={admissionDate}
                    onChange={(date: any) => setAdmissionDate(date)}
                    className={`form-control ${
                      errors.admissionDate ? "is-invalid" : ""
                    }`}
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeInput
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    maxDate={new Date()}
                  />
                  {errors.admissionDate && (
                    <div className="invalid-feedback d-block">
                      {errors.admissionDate}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <hr />
            <div className="row g-3">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="formWeight" className="form-label">
                    Weight (kg)
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.weight ? "is-invalid" : ""
                    }`}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  {errors.weight && (
                    <div className="invalid-feedback d-block">
                      {errors.weight}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="formHeight" className="form-label">
                    Height (cm)
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.height ? "is-invalid" : ""
                    }`}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  {errors.height && (
                    <div className="invalid-feedback d-block">
                      {errors.height}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="formBP" className="form-label">
                    Blood Pressure
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.bloodPressure ? "is-invalid" : ""
                    }`}
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(e.target.value)}
                  />
                  {errors.bloodPressure && (
                    <div className="invalid-feedback d-block">
                      {errors.bloodPressure}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="formSymptoms" className="form-label">
                    Symptoms
                  </label>
                  <textarea
                    className="form-control"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="formNotes" className="form-label">
                    Notes
                  </label>
                  <textarea
                    className="form-control"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-end align-items-center mx-4">
              <button
                type="button"
                className="btn btn_style"
                onClick={addIPDPatient}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary mx-2"
                onClick={() => navigate("/IPD-patients")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddIPDPatient;
