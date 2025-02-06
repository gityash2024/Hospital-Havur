// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { postApi } from "../services/api";
// import { toast } from "react-toastify";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// interface Patient {
//   firstName: string;
//   lastName: string;
//   id: string;
//   name: string;
// }

// interface Doctor {
//   firstName: string;
//   lastName: string;
//   id: string;
//   name: string;
// }

// interface Errors {
//   patient?: string;
//   caseType?: string;
//   appointmentDate?: string;
//   doctor?: string;
//   doctorOpdCharge?: string;
//   paymentMode?: string;
// }

// const AddOPDPatient = () => {
//   const [patients, setPatients] = useState<Patient[]>([]);
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [patient, setPatient] = useState<string>("");
//   const [caseType, setCaseType] = useState<string>("");
//   const [height, setHeight] = useState<string>("");
//   const [weight, setWeight] = useState<string>("");
//   const [bloodPressure, setBloodPressure] = useState<string>("");
//   const [appointmentDate, setAppointmentDate] = useState<Date | null>(
//     new Date()
//   );
//   const [doctor, setDoctor] = useState<string>("");
//   const [doctorOpdCharge, setDoctorOpdCharge] = useState<string>("");
//   const [paymentMode, setPaymentMode] = useState<string>("Cash"); // Default value
//   const [symptoms, setSymptoms] = useState<string>("");
//   const [notes, setNotes] = useState<string>("");
//   const [isOldPatient, setIsOldPatient] = useState<boolean>(false);
//   const [errors, setErrors] = useState<Errors>({});

//   useEffect(() => {
//     const getPatientsData = async () => {
//       const response = await postApi("doctor/patient/list", {});
//       if (response.status === 200) {
//         setPatients(response.data.data.patient);
//       }
//     };

//     const getDoctorData = async () => {
//       const response = await postApi("doctor/doctor/list", {});
//       if (response.status === 200) {
//         setDoctors(response.data.data.doctor);
//       }
//     };

//     getPatientsData();
//     getDoctorData();
//   }, []);

//   const handleSwitchToggle = () => {
//     setIsOldPatient(!isOldPatient);
//   };

//   const validateForm = () => {
//     const newErrors: Errors = {};
//     if (!patient) newErrors.patient = "Patient is required";
//     if (!caseType) newErrors.caseType = "Case is required";
//     if (!appointmentDate)
//       newErrors.appointmentDate = "Appointment Date is required";
//     if (!doctor) newErrors.doctor = "Doctor is required";
//     if (!doctorOpdCharge)
//       newErrors.doctorOpdCharge = "Doctor OPD Charge is required";
//     if (!paymentMode) newErrors.paymentMode = "Payment Mode is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const addOPDPatient = async () => {
//     if (!validateForm()) return;

//     const opdPatientData = {
//       patient,
//       caseType,
//       opdNo: "T9P8PTFX", // Replace with actual OPD No. if needed
//       height,
//       weight,
//       bloodPressure,
//       appointmentDate,
//       doctor,
//       doctorOpdCharge,
//       paymentMode,
//       symptoms,
//       notes,
//       isOldPatient,
//     };

//     try {
//       const response = await postApi("/opdPatients/add", opdPatientData);
//       toast.success("OPD Patient added successfully");

//       // Reset form after successful submission
//       setPatient("");
//       setCaseType("");
//       setHeight("");
//       setWeight("");
//       setBloodPressure("");
//       setAppointmentDate(new Date());
//       setDoctor("");
//       setDoctorOpdCharge("");
//       setPaymentMode("Cash"); // Reset to default payment mode
//       setSymptoms("");
//       setNotes("");
//       setIsOldPatient(false);
//     } catch (error) {
//       toast.error("Failed to add OPD Patient");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card mt-4">
//         <div className="card-header">
//           <h5>New OPD Patient</h5>
//         </div>
//         <div className="card-body">
//           <Form>
//             <div className="row">
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formPatient">
//                     Patient <span className="required">*</span>
//                   </Form.Label>
//                   <Form.Select
//                     id="formPatient"
//                     value={patient}
//                     onChange={(e) => setPatient(e.target.value)}
//                     className={errors.patient ? "is-invalid" : ""}
//                   >
//                     <option value="">Select Patient</option>
//                     {patients.map((patient) => (
//                       <option key={patient.id} value={patient.id}>
//                         {patient.firstName} {patient.lastName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.patient}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formCase">
//                     Case <span className="required">*</span>
//                   </Form.Label>
//                   <Form.Select
//                     id="formCase"
//                     value={caseType}
//                     onChange={(e) => setCaseType(e.target.value)}
//                     className={errors.caseType ? "is-invalid" : ""}
//                   >
//                     <option value="">Choose Case</option>
//                     {/* Add case types dynamically if available */}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.caseType}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formOpdNo">OPD No.</Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="formOpdNo"
//                     value="T9P8PTFX"
//                     readOnly
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formHeight">Height</Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="formHeight"
//                     placeholder="Height"
//                     value={height}
//                     onChange={(e) => setHeight(e.target.value)}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formWeight">Weight</Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="formWeight"
//                     placeholder="Weight"
//                     value={weight}
//                     onChange={(e) => setWeight(e.target.value)}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formBloodPressure">
//                     Blood Pressure
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="formBloodPressure"
//                     placeholder="Blood Pressure"
//                     value={bloodPressure}
//                     onChange={(e) => setBloodPressure(e.target.value)}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formAppointmentDate">
//                     Appointment Date <span className="required">*</span>
//                   </Form.Label>
//                   <DatePicker
//                     selected={appointmentDate}
//                     onChange={(date) => setAppointmentDate(date)}
//                     className={`form-control ${
//                       errors.appointmentDate ? "is-invalid" : ""
//                     }`}
//                     showTimeSelect
//                     dateFormat="Pp"
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.appointmentDate}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formDoctor">
//                     Doctor <span className="required">*</span>
//                   </Form.Label>
//                   <Form.Select
//                     id="formDoctor"
//                     value={doctor}
//                     onChange={(e) => setDoctor(e.target.value)}
//                     className={errors.doctor ? "is-invalid" : ""}
//                   >
//                     <option value="">Select Doctor</option>
//                     {doctors.map((doctor) => (
//                       <option key={doctor.id} value={doctor.id}>
//                         {doctor.firstName} {doctor.lastName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.doctor}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formDoctorOpdCharge">
//                     Doctor OPD Charge <span className="required">*</span>
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="formDoctorOpdCharge"
//                     placeholder="Doctor OPD Charge"
//                     value={doctorOpdCharge}
//                     onChange={(e) => setDoctorOpdCharge(e.target.value)}
//                     className={errors.doctorOpdCharge ? "is-invalid" : ""}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.doctorOpdCharge}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formPaymentMode">
//                     Payment Mode <span className="required">*</span>
//                   </Form.Label>
//                   <Form.Select
//                     id="formPaymentMode"
//                     value={paymentMode}
//                     onChange={(e) => setPaymentMode(e.target.value)}
//                     className={errors.paymentMode ? "is-invalid" : ""}
//                   >
//                     <option value="">Select Payment Mode</option>
//                     <option value="Cash">Cash</option>
//                     <option value="Credit Card">Credit Card</option>
//                     <option value="Debit Card">Debit Card</option>
//                     <option value="UPI">UPI</option>
//                     {/* Add more options as needed */}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.paymentMode}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-12">
//                 <Form.Group className="mb-4 form-check">
//                   <Form.Switch
//                     id="formIsOldPatient"
//                     checked={isOldPatient}
//                     onChange={handleSwitchToggle}
//                     label="Old Patient"
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-12">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formSymptoms">Symptoms</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     id="formSymptoms"
//                     placeholder="Symptoms"
//                     value={symptoms}
//                     onChange={(e) => setSymptoms(e.target.value)}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-12">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formNotes">Notes</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     id="formNotes"
//                     placeholder="Notes"
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                   />
//                 </Form.Group>
//               </div>
//             </div>
//             <Button variant="primary" onClick={addOPDPatient}>
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddOPDPatient;

// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { postApi } from "../services/api";
// import { toast } from "react-toastify";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// interface Patient {
//   firstName: string;
//   lastName: string;
//   id: string;
//   name: string;
// }

// interface Doctor {
//   firstName: string;
//   lastName: string;
//   id: string;
//   name: string;
// }

// interface Errors {
//   patient?: string;
//   caseType?: string;
//   appointmentDate?: string;
//   doctor?: string;
//   doctorOpdCharge?: string;
//   paymentMode?: string;
// }

// const AddOPDPatient = () => {
//   const [patients, setPatients] = useState<Patient[]>([]);
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [patient, setPatient] = useState<string>("");
//   const [caseType, setCaseType] = useState<string>("");
//   const [height, setHeight] = useState<string>("");
//   const [weight, setWeight] = useState<string>("");
//   const [bloodPressure, setBloodPressure] = useState<string>("");
//   const [appointmentDate, setAppointmentDate] = useState<Date | null>(
//     new Date()
//   );
//   const [doctor, setDoctor] = useState<string>("");
//   const [doctorOpdCharge, setDoctorOpdCharge] = useState<string>("");
//   const [paymentMode, setPaymentMode] = useState<string>("Cash"); // Default value
//   const [symptoms, setSymptoms] = useState<string>("");
//   const [notes, setNotes] = useState<string>("");
//   const [isOldPatient, setIsOldPatient] = useState<boolean>(false);
//   const [errors, setErrors] = useState<Errors>({});

//   useEffect(() => {
//     const getPatientsData = async () => {
//       const response = await postApi("doctor/patient/list", {});
//       if (response.status === 200) {
//         setPatients(response.data.data.patient);
//       }
//     };

//     const getDoctorData = async () => {
//       const response = await postApi("doctor/doctor/list", {});
//       if (response.status === 200) {
//         setDoctors(response.data.data.doctor);
//       }
//     };

//     getPatientsData();
//     getDoctorData();
//   }, []);

//   const handleSwitchToggle = () => {
//     setIsOldPatient(!isOldPatient);
//   };

//   const validateForm = () => {
//     const newErrors: Errors = {};
//     if (!patient) newErrors.patient = "Patient is required";
//     if (!caseType) newErrors.caseType = "Case is required";
//     if (!appointmentDate)
//       newErrors.appointmentDate = "Appointment Date is required";
//     if (!doctor) newErrors.doctor = "Doctor is required";
//     if (!doctorOpdCharge)
//       newErrors.doctorOpdCharge = "Doctor OPD Charge is required";
//     if (!paymentMode) newErrors.paymentMode = "Payment Mode is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const addOPDPatient = async () => {
//     if (!validateForm()) return;

//     const opdPatientData = {
//       patient,
//       caseType,
//       opdNo: "T9P8PTFX", // Replace with actual OPD No. if needed
//       height,
//       weight,
//       bloodPressure,
//       appointmentDate,
//       doctor,
//       doctorOpdCharge,
//       paymentMode,
//       symptoms,
//       notes,
//       isOldPatient,
//     };

//     try {
//       const response = await postApi("/opdPatients/add", opdPatientData);
//       toast.success("OPD Patient added successfully");

//       // Reset form after successful submission
//       setPatient("");
//       setCaseType("");
//       setHeight("");
//       setWeight("");
//       setBloodPressure("");
//       setAppointmentDate(new Date());
//       setDoctor("");
//       setDoctorOpdCharge("");
//       setPaymentMode("Cash"); // Reset to default payment mode
//       setSymptoms("");
//       setNotes("");
//       setIsOldPatient(false);
//     } catch (error) {
//       toast.error("Failed to add OPD Patient");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card mt-4">
//         <div className="card-header">
//           <h5>New OPD Patient</h5>
//         </div>
//         <div className="card-body">
//           <Form>
//             <div className="row">
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formPatient">
//                     Patient <span className="required"></span>
//                   </Form.Label>
//                   <Form.Select
//                     id="formPatient"
//                     value={patient}
//                     onChange={(e) => setPatient(e.target.value)}
//                     className={errors.patient ? "is-invalid" : ""}
//                   >
//                     <option value="">Select Patient</option>
//                     {patients.map((patient) => (
//                       <option key={patient.id} value={patient.id}>
//                         {patient.firstName} {patient.lastName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.patient}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formCase">
//                     Case <span className="required"></span>
//                   </Form.Label>
//                   <Form.Select
//                     id="formCase"
//                     value={caseType}
//                     onChange={(e) => setCaseType(e.target.value)}
//                     className={errors.caseType ? "is-invalid" : ""}
//                   >
//                     <option value="">Choose Case</option>
//                     {/* Add case types dynamically if available */}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.caseType}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formOpdNo">OPD No.</Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="formOpdNo"
//                     value="T9P8PTFX"
//                     readOnly
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formHeight">Height</Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="formHeight"
//                     placeholder="Height"
//                     value={height}
//                     onChange={(e) => setHeight(e.target.value)}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formWeight">Weight</Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="formWeight"
//                     placeholder="Weight"
//                     value={weight}
//                     onChange={(e) => setWeight(e.target.value)}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formBloodPressure">
//                     Blood Pressure
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="formBloodPressure"
//                     placeholder="Blood Pressure"
//                     value={bloodPressure}
//                     onChange={(e) => setBloodPressure(e.target.value)}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formAppointmentDate">
//                     Appointment Date <span className="required"></span>
//                   </Form.Label>
//                   <DatePicker
//                     selected={appointmentDate}
//                     onChange={(date) => setAppointmentDate(date)}
//                     className={`form-control ${
//                       errors.appointmentDate ? "is-invalid" : ""
//                     }`}
//                     showTimeSelect
//                     dateFormat="Pp"
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.appointmentDate}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formDoctor">
//                     Doctor <span className="required"></span>
//                   </Form.Label>
//                   <Form.Select
//                     id="formDoctor"
//                     value={doctor}
//                     onChange={(e) => setDoctor(e.target.value)}
//                     className={errors.doctor ? "is-invalid" : ""}
//                   >
//                     <option value="">Select Doctor</option>
//                     {doctors.map((doctor) => (
//                       <option key={doctor.id} value={doctor.id}>
//                         {doctor.firstName} {doctor.lastName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.doctor}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formDoctorOpdCharge">
//                     Doctor OPD Charge <span className="required"></span>
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     id="formDoctorOpdCharge"
//                     placeholder="Doctor OPD Charge"
//                     value={doctorOpdCharge}
//                     onChange={(e) => setDoctorOpdCharge(e.target.value)}
//                     className={errors.doctorOpdCharge ? "is-invalid" : ""}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {errors.doctorOpdCharge}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-6">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formPaymentMode">
//                     Payment Mode <span className="required"></span>
//                   </Form.Label>
//                   <Form.Select
//                     id="formPaymentMode"
//                     value={paymentMode}
//                     onChange={(e) => setPaymentMode(e.target.value)}
//                     className={errors.paymentMode ? "is-invalid" : ""}
//                   >
//                     <option value="">Select Payment Mode</option>
//                     <option value="Cash">Cash</option>
//                     <option value="Credit Card">Credit Card</option>
//                     <option value="Debit Card">Debit Card</option>
//                     <option value="UPI">UPI</option>
//                     {/* Add more options as needed */}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {errors.paymentMode}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//               <div className="col-md-12">
//                 <Form.Group className="mb-4 form-check">
//                   <Form.Switch
//                     id="formIsOldPatient"
//                     checked={isOldPatient}
//                     onChange={handleSwitchToggle}
//                     label="Old Patient"
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-12">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formSymptoms">Symptoms</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     id="formSymptoms"
//                     placeholder="Symptoms"
//                     value={symptoms}
//                     onChange={(e) => setSymptoms(e.target.value)}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="col-md-12">
//                 <Form.Group className="mb-4">
//                   <Form.Label htmlFor="formNotes">Notes</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     id="formNotes"
//                     placeholder="Notes"
//                     value={notes}
//                     onChange={(e) => setNotes(e.target.value)}
//                   />
//                 </Form.Group>
//               </div>
//             </div>
//             <Button variant="primary" onClick={addOPDPatient}>
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddOPDPatient;

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
interface Errors {
  patient?: string;
  caseType?: string;
  appointmentDate?: string;
  doctor?: string;
  doctorOpdCharge?: string;
  paymentMode?: string;
}

const AddOPDPatient = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<any>([]);
  const [patient, setPatient] = useState<string>("");
  const [caseType, setCaseType] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bloodPressure, setBloodPressure] = useState<string>("");

  const [appointmentDate, setAppointmentDate] = useState<Date | null>(
    new Date()
  );
  const [doctor, setdoctor] = useState<string>("");
  const [doctorOpdCharge, setDoctorOpdCharge] = useState<string>("");
  const [paymentMode, setPaymentMode] = useState<string>("Cash"); // Default value
  const [symptoms, setSymptoms] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [errors, setErrors] = useState<Errors>({});
  const [history, setHistory] = useState<string>("");
  const [caseTypes, setCaseTypes] = useState([]);
  const [doctorData, setdoctorData] = useState<any>([]);

  useEffect(() => {
    const getPatientsData = async () => {
      const response = await postApi("hospital/patient/list", {});
      if (response.status === 200) {
        setPatients(response.data.data.patient);
      }
    };

    const getdoctorData = async () => {
      const response = await postApi("hospital/doctor/list", {});
      if (response.status === 200) {
        setdoctorData(response.data.data.doctor);
      }
    };

    getPatientsData();
    getdoctorData();
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

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!patient) newErrors.patient = "Patient is required";
    if (!caseType) newErrors.caseType = "Case is required";
    if (!appointmentDate)
      newErrors.appointmentDate = "Appointment Date is required";
    if (!doctor) newErrors.doctor = "doctor is required";
    if (!doctorOpdCharge)
      newErrors.doctorOpdCharge = "Doctor OPD Charge is required";
    if (!paymentMode) newErrors.paymentMode = "Payment Mode is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addOPDPatient = async () => {
    if (!validateForm()) return;

    const opdPatientData = {
      patientId: patient,
      caseId: caseType,
      doctorId: doctor,
      weight: weight,
      height: height,
      bloodPressure: bloodPressure,
      appointmentDate: appointmentDate,
      doctorOpdCharge: doctorOpdCharge,
      paymentMode: paymentMode,
      symptoms: symptoms,
      notes: notes,
      history: history,
    };

    try {
      const response = await postApi(
        "hospital/opd_patient/add",
        opdPatientData
      );

      if (response.status === 200) {
        navigate("/IPD-patients?tab=OPD-patients");
        toast.success(response.data.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add OPD Patient");
    }
  };

  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-header">
          <h5>New OPD Patient</h5>
        </div>
        <div className="card-body">
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formPatient">
                    Patient <span className="required"></span>
                  </Form.Label>
                  <Form.Select
                    id="formPatient"
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                    className={errors.patient ? "is-invalid" : ""}
                  >
                    <option value="">Select Patient</option>
                    {patients.map((patient: any) => (
                      <option key={patient._id} value={patient._id}>
                        {patient.firstName} {patient.lastName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.patient}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formCase">
                    Case <span className="required"></span>
                  </Form.Label>
                  <Form.Select
                    id="formCase"
                    value={caseType}
                    onChange={(e) => setCaseType(e.target.value)}
                    className={errors.caseType ? "is-invalid" : ""}
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
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.caseType}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              {/* <div className="col-md-12">
                <hr />
              </div> */}
              <div className="col-md-3">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formHeight">Height</Form.Label>
                  <Form.Control
                    type="text"
                    id="formHeight"
                    placeholder="Height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formWeight">Weight</Form.Label>
                  <Form.Control
                    type="text"
                    id="formWeight"
                    placeholder="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formBloodPressure">
                    Blood Pressure
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="formBloodPressure"
                    placeholder="Blood Pressure"
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(e.target.value)}
                  />
                </Form.Group>
              </div>
              {/* <div className="col-md-12">
                <hr />
              </div> */}
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formAppointmentDate">
                    Appointment Date <span className="required"></span>
                  </Form.Label>
                  <DatePicker
                    selected={appointmentDate}
                    onChange={(date) => setAppointmentDate(date)}
                    className={`form-control ${
                      errors.appointmentDate ? "is-invalid" : ""
                    }`}
                    showTimeInput
                    dateFormat="dd/MM/yyyy h:mm aa"
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    maxDate={new Date()}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.appointmentDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formDoctor">
                    Doctor <span className="required"></span>
                  </Form.Label>
                  <Form.Select
                    id="formDoctor"
                    value={doctor}
                    onChange={(e) => setdoctor(e.target.value)}
                    className={errors.doctor ? "is-invalid" : ""}
                  >
                    <option value="">Select doctor</option>
                    {doctorData.map((doctor: any) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.firstName} {doctor.lastName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.doctor}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formDoctorOpdCharge">
                    Doctor OPD Charge <span className="required"></span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="formDoctorOpdCharge"
                    placeholder="Doctor OPD Charge"
                    value={doctorOpdCharge}
                    onChange={(e) => setDoctorOpdCharge(e.target.value)}
                    className={errors.doctorOpdCharge ? "is-invalid" : ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.doctorOpdCharge}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formPaymentMode">
                    Payment Mode <span className="required"></span>
                  </Form.Label>
                  <Form.Select
                    id="formPaymentMode"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className={errors.paymentMode ? "is-invalid" : ""}
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Online">Online</option>
                    <option value="Cheque">Cheque</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.paymentMode}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              {/* <div className="col-md-12">
                <hr />
              </div> */}
              <div className="col-md-12">
                <Form.Group className="mb-4">
                  <Form.Label>Symptoms</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label>History</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter History"
                    value={history}
                    onChange={(e) => setHistory(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="mt-3 d-flex justify-content-end align-items-center mx-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addOPDPatient}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  onClick={() => navigate("/IPD-patients?tab=OPD-patients")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddOPDPatient;
