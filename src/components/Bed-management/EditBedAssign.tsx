import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";

interface Case {
  id: string;
  name: string;
}

interface IpdPatient {
  id: string;
  name: string;
}

interface Bed {
  id: string;
  name: string;
}

interface Errors {
  case?: string;
  ipdPatient?: string;
  bed?: string;
  assignDate?: string;
  description?: string;
  dischargeDate?: string;
}

const EditBedAssign = () => {
  const location = useLocation();
  const { item } = location.state;
  const [cases, setCases] = useState<Case[]>([]);
  const [beds, setBeds] = useState<Bed[]>([]);
  const [ipdPatients, setIpdPatients] = useState<IpdPatient[]>([]);
  const [selectedCase, setSelectedCase] = useState<string>(item.case._id);
  const [selectedIpdPatient, setSelectedIpdPatient] = useState<string>("");
  const [selectedBed, setSelectedBed] = useState<string>(item.bed._id);
  const [assignDate, setAssignDate] = useState<Date | null>();
  const [dischargeDate, setDischargedate] = useState<Date | null>();
  const [description, setDescription] = useState<string>(item.description);
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCases = async () => {
      const response = await postApi("hospital/patient/case/list", {});
      if (response.status === 200) {
        setCases(response.data.data.patientCase);
      }
    };

    const fetchBeds = async () => {
      const response = await postApi("hospital/bed/list", {});
      if (response.status === 200) {
        setBeds(response.data.data.bed);
      }
    };

    fetchCases();
    fetchBeds();
  }, []);
  useEffect(() => {
    const getIpdPatients = async () => {
      const response = await postApi("hospital/ipd_patient/associate/list", {
        caseId: selectedCase,
      });
      if (response.status === 200) {
        setIpdPatients(response.data.data);
      }
    };
    getIpdPatients();
  }, [selectedCase]);

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!selectedCase) newErrors.case = "Case is required";
    if (!selectedIpdPatient) newErrors.ipdPatient = "IPD Patient is required";
    if (!selectedBed) newErrors.bed = "Bed is required";
    if (!assignDate) newErrors.assignDate = "Assign Date is required";
    if (!dischargeDate) newErrors.dischargeDate = "dischargeDate is required";
    if (!description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;

    const submitData = {
      case: selectedCase,
      ipdPatient: selectedIpdPatient,
      bed: selectedBed,
      date: assignDate,
      description,
      dischargeDate,
      id: item._id,
    };

    try {
      const response = await postApi("hospital/bed_assign/update", submitData);
      if (response.status === 200) {
        navigate("/bedtypes?tab=bedassign");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to edit assign bed");
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="title_sm mb-0">Edit Bed Assign</h4>
        <button
          type="button"
          className="btn btn_style"
          onClick={() => navigate("/bedtypes?tab=bedassign")}
        >
          Back
        </button>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formCase">
                    Case <span className="required"></span>
                  </Form.Label>
                  <Form.Select
                    id="formCase"
                    value={selectedCase}
                    onChange={(e) => setSelectedCase(e.target.value)}
                    className={errors.case ? "is-invalid" : ""}
                  >
                    <option value="">Choose Case</option>
                    {cases.map((caseItem: any) => (
                      <option key={caseItem._id} value={caseItem._id}>
                        {caseItem.caseId} {caseItem.patientId.firstName}{" "}
                        {caseItem.patientId.lastName}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.case}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formIpdPatient">
                    IPD Patient <span className="required"></span>
                  </Form.Label>
                  <Form.Select
                    className={`form-select ${
                      errors.ipdPatient ? "is-invalid" : ""
                    }`}
                    value={selectedIpdPatient}
                    onChange={(e) => setSelectedIpdPatient(e.target.value)}
                    disabled={!selectedCase} // Disable if case is not selected
                  >
                    <option value="">Choose IPD patient</option>
                    {ipdPatients.map((patient: any) =>
                      patient ? (
                        <option key={patient._id} value={patient._id}>
                          {patient.patientId.firstName}{" "}
                          {patient.patientId.lastName}
                        </option>
                      ) : (
                        <option value="">No case Found</option>
                      )
                    )}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.ipdPatient}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formBed">
                    Bed <span className="required"></span>
                  </Form.Label>
                  <Form.Select
                    id="formBed"
                    value={selectedBed}
                    onChange={(e) => setSelectedBed(e.target.value)}
                    className={errors.bed ? "is-invalid" : ""}
                  >
                    <option value="">Select Bed</option>
                    {beds.map((bed: any) => (
                      <option key={bed._id} value={bed._id}>
                        {bed.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.bed}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formAssignDate">
                    Assign Date <span className="required"></span>
                  </Form.Label>
                  <DatePicker
                    selected={assignDate}
                    onChange={(date) => setAssignDate(date)}
                    className={`form-control ${
                      errors.assignDate ? "is-invalid" : ""
                    }`}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    dateFormat="yyyy-MM-dd HH:mm"
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    maxDate={new Date()}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.assignDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formdischargeDate">
                    Discharge Date <span className="required"></span>
                  </Form.Label>
                  <DatePicker
                    selected={dischargeDate}
                    onChange={(date) => setDischargedate(date)}
                    className={`form-control ${
                      errors.dischargeDate ? "is-invalid" : ""
                    }`}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    dateFormat="yyyy-MM-dd HH:mm"
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    maxDate={new Date()}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dischargeDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="formDescription">
                    Description <span className="required"></span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    id="formDescription"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={errors.description ? "is-invalid" : ""}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <div className="d-flex justify-content-end">
                  <input
                    className="btn btn_style me-2"
                    id="saveBtn"
                    type="button"
                    value="Save"
                    onClick={handleFormSubmit}
                  />
                  <button
                    type="button"
                    onClick={() => navigate("/bedtypes?tab=bedassign")}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditBedAssign;
