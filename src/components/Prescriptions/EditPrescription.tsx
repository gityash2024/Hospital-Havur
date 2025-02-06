import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { postApi } from "../services/api";

const EditPrescription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;
  const formattedItems: any = item.prescriptionItem.map((item: any) => ({
    medicine: item.medicine,
    dosage: item.dosage,
    day: item.day,
    time: item.time,
    comment: item.comment,
    doseInterval: item.doseInterval,
    _id: item._id,
    prescriptionId: item.prescriptionId,
  }));

  //   original
  const [patientData, setPatientData] = useState<any>({});
  const [patientId, setPatientId] = useState(item.patientDetails._id);
  const [doctorId, setDoctorId] = useState(item.doctorDetails._id);
  const [foodAllergies, setFoodAllergies] = useState(item.foodAllergies);
  const [tendencyBleed, setTendencyBleed] = useState(item.tendencyBleed);
  const [heartDisease, setHeartDisease] = useState(item.heartDisease);
  const [highBloodPressure, setHighBloodPressure] = useState(
    item.highBloodPressure
  );
  const [diabetic, setDiabetic] = useState(item.diabetic);
  const [surgery, setSurgery] = useState(item.surgery);
  const [accident, setAccident] = useState(item.accident);
  const [others, setOthers] = useState(item.others);
  const [medicalHistory, setMedicalHistory] = useState<Date | null>(
    item.medicalHistory
  );
  const [currentMedication, setCurrentMedication] = useState(
    item.currentMedication
  );
  const [femalePregnancy, setFemalePregnancy] = useState(item.femalePregnancy);
  const [breastFeeding, setBreastFeeding] = useState(item.breastFeeding);
  const [healthInsurance, setHealthInsurance] = useState(item.healthInsurance);
  const [lowIncome, setLowIncome] = useState(item.lowIncome);
  const [reference, setReference] = useState(item.reference);
  const [plusRate, setPlusRate] = useState(item.plusRate);
  const [temperature, setTemperature] = useState(item.temperature);
  const [problemDescription, setProblemDescription] = useState(
    item.problemDescription
  );
  const [test, setTest] = useState(item.test);
  const [advice, setAdvice] = useState(item.advice);
  const [nextVisitQty, setNextVisitQty] = useState(item.nextVisitQty);
  const [nextVisitTime, setNextVisitTime] = useState(item.nextVisitTime);

  const [items, setItems] = useState(formattedItems);
  const [data, setData] = useState<any[]>([]);
  const [doctorData, setDoctorData] = useState<any[]>([]);

  const addItem = () => {
    setItems([
      ...items,
      {
        medicine: "",
        dosage: "",
        day: "",
        time: "",
        doseInterval: "",
        comment: "",
        _id: "",
        prescriptionId: "",
      },
    ]);
  };

  const removeItem = (index: number, item: any) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems: any = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  useEffect(() => {
    const getPAtientAdmissionData = async () => {
      const response = await postApi("hospital/patient/list", {});

      if (response.status === 200) {
        setData(response.data.data.patient);
      }
    };

    const getDoctorData = async () => {
      const response = await postApi("hospital/doctor/list", {});

      if (response.status === 200) {
        setDoctorData(response.data.data.doctor);
      }
    };

    getPAtientAdmissionData();
    getDoctorData();
  }, []);

  const handleSubmit = async () => {
    // Handle form submission logic here
    const data = {
      id: item._id,
      patientId: patientId,
      doctorId: doctorId,
      healthInsurance: healthInsurance,
      lowIncome: lowIncome,
      reference: reference,
      highBloodPressure: highBloodPressure,
      foodAllergies: foodAllergies,
      tendencyBleed: tendencyBleed,
      heartDisease: heartDisease,
      diabetic: diabetic,
      medicalHistory: medicalHistory,
      femalePregnancy: femalePregnancy,
      breastFeeding: breastFeeding,
      currentMedication: currentMedication,
      surgery: surgery,
      accident: accident,
      others: others,
      plusRate: plusRate,
      temperature: temperature,
      problemDescription: problemDescription,
      test: test,
      advice: advice,
      nextVisitQty: nextVisitQty,
      nextVisitTime: nextVisitTime,
      items: items,
    };

    let response = await postApi("hospital/prescription/update", data);

    if (response.status === 200) {
      toast.success("Prescription Updated successfully");
      navigate("/prescription");
    } else {
      toast.error("Error adding prescription");
    }
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">New Prescription</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/prescription")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex ">
        <div className="container-fluid">
          <div className="d-flex flex-column">
            <div className="card">
              <div className="card-body p-12">
                <form>
                  <div className="row">
                    <div className="col-md-3">
                      <label className="form-label mt-3 text-gray-600">
                        Patient
                      </label>
                      <select
                        className="form-select"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                      >
                        <option>Select Patient</option>
                        {data.map((item: any) =>
                          item ? (
                            <option key={item._id} value={item._id}>
                              {item.firstName} {item.lastName}
                            </option>
                          ) : (
                            <option>No Patient Found</option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label mt-3 text-gray-600">
                        Doctor
                      </label>
                      <select
                        className="form-select"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                      >
                        <option>Select Doctor</option>
                        {doctorData.map((item: any) =>
                          item ? (
                            <option key={item._id} value={item._id}>
                              {item.firstName} {item.lastName}
                            </option>
                          ) : (
                            <option>No Doctor Found</option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mt-3 text-gray-600">
                        Health Insurance
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={healthInsurance}
                        onChange={(e) => setHealthInsurance(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label mt-3 text-gray-600">
                        Low Income
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={lowIncome}
                        onChange={(e) => setLowIncome(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Reference
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Item Table */}
                  <hr />
                  <div className="d-flex mt-5 justify-content-between">
                    <h3>Medicines</h3>
                    <div>
                      <button
                        className="btn btn_style"
                        type="button"
                        onClick={addItem}
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Medicines</th>
                        <th>Dosage</th>
                        <th>Duration</th>
                        <th>Time</th>
                        <th>Dose Interval</th>
                        <th>Comment</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={item.medicine}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "medicine",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={item.dosage}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "dosage",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={item.day}
                              onChange={(e) =>
                                handleItemChange(index, "day", e.target.value)
                              }
                            >
                              <option>Select Duration</option>
                              <option label="One Day Only" value="One Day Only">
                                One Day Only
                              </option>
                              <option
                                label="For Three Days"
                                value="For Three Days"
                              >
                                For Three Days
                              </option>
                              <option label="For One Week" value="For One Week">
                                For One Week
                              </option>
                              <option label="For Two Week" value="For Two Week">
                                For Two Week
                              </option>
                              <option
                                label="For One Month"
                                value="For One Month"
                              >
                                For One Month
                              </option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={item.time}
                              onChange={(e) =>
                                handleItemChange(index, "time", e.target.value)
                              }
                            >
                              <option>Select Time</option>
                              <option label="After Meal" value="After Meal">
                                After Meal
                              </option>
                              <option label="Before Meal" value="Before Meal">
                                Before Meal
                              </option>
                            </select>
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={item.doseInterval}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "doseInterval",
                                  e.target.value
                                )
                              }
                            >
                              <option>Select Dose Interval</option>
                              <option
                                label="Every Morning"
                                value="Every Morning"
                              >
                                Every Morning
                              </option>
                              <option
                                label="Every Morning & Evening"
                                value="Every Morning & Evening"
                              >
                                Every Morning & Evening
                              </option>
                              <option
                                label="Three times a day"
                                value="Three times a day"
                              >
                                Three times a day
                              </option>
                              <option
                                label="4 times a day"
                                value="4 times a day"
                              >
                                4 times a day
                              </option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={item.comment}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "comment",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <Button
                              variant="link"
                              className="p-0"
                              onClick={() => removeItem(index, item)}
                            >
                              <FaTrash className="text-danger" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4">
                    <hr />
                    <div className="row">
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          High Blood Pressure
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={highBloodPressure}
                          onChange={(e) => setHighBloodPressure(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Food Allergies
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={foodAllergies}
                          onChange={(e) => setFoodAllergies(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Tendency Bleed
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={tendencyBleed}
                          onChange={(e) => setTendencyBleed(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Heart Disease
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={heartDisease}
                          onChange={(e) => setHeartDisease(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Diabetic
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={diabetic}
                          onChange={(e) => setDiabetic(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Added At
                        </label>
                        <DatePicker
                          selected={medicalHistory}
                          onChange={(date) => setMedicalHistory(date)}
                          showTimeSelect
                          dateFormat="yyyy-MM-dd HH:mm"
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Female Pregnancy
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={femalePregnancy}
                          onChange={(e) => setFemalePregnancy(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Breast Feeding
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={breastFeeding}
                          onChange={(e) => setBreastFeeding(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Current Medication
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={currentMedication}
                          onChange={(e) => setCurrentMedication(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Surgery
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={surgery}
                          onChange={(e) => setSurgery(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Accident
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={accident}
                          onChange={(e) => setAccident(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Others
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={others}
                          onChange={(e) => setOthers(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Pulse Rate
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={plusRate}
                          onChange={(e) => setPlusRate(e.target.value)}
                        />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label mt-3 text-gray-600">
                          Temperature
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={temperature}
                          onChange={(e) => setTemperature(e.target.value)}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label mt-3 text-gray-600">
                          Temperature
                        </label>
                        <textarea
                          className="form-control"
                          value={problemDescription}
                          rows={5}
                          onChange={(e) =>
                            setProblemDescription(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <hr />
                    <div className="row">
                      <div className="col-md-12">
                        <label className="form-label mt-3 text-gray-600">
                          Test
                        </label>
                        <textarea
                          className="form-control"
                          value={test}
                          placeholder="test"
                          rows={5}
                          onChange={(e) => setTest(e.target.value)}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label mt-3 text-gray-600">
                          Advice
                        </label>
                        <textarea
                          className="form-control"
                          value={advice}
                          placeholder="Advice"
                          rows={5}
                          onChange={(e) => setAdvice(e.target.value)}
                        />
                      </div>
                      <div className="col-md-5">
                        <label className="form-label mt-3 text-gray-600">
                          Next Visit
                        </label>
                        <div className="d-flex gap-3">
                          <input
                            type="text col-md-2"
                            className="form-control"
                            value={nextVisitQty}
                            onChange={(e) => setNextVisitQty(e.target.value)}
                          />
                          <select
                            className="form-select"
                            value={nextVisitTime}
                            onChange={(e) => setNextVisitTime(e.target.value)}
                          >
                            <option>Select Time</option>
                            <option label="Day" value="Day">
                              Day
                            </option>
                            <option label="Month" value="Month">
                              Month
                            </option>
                            <option label="Year" value="Year">
                              Year
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mt-4 gap-2 justify-content-end">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn_style"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/prescription")}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPrescription;
