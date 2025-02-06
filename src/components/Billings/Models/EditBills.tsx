import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { postApi } from "../../services/api";
import { FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";

const EditBills = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state;
  const formattedItems: any = item.billItems.map((item: any) => ({
    name: item.itemName,
    qty: item.qty,
    price: item.price,
    amount: item.amount,
    _id: item._id,
    billId: item.billId,
  }));
  const [admissionId, setAdmissionId] = useState(item.admissionDetails._id);
  const [billDate, setBillDate] = useState<Date | null>(new Date());
  const [patientEmail, setPatientEmail] = useState("");
  const [patientCellNo, setPatientCellNo] = useState("");
  const [gender, setGender] = useState("male");
  const [dob, setDob] = useState<Date | null>(null);
  const [doctor, setDoctor] = useState("");
  const [admissionDate, setAdmissionDate] = useState<Date | null>(null);
  const [dischargeDate, setDischargeDate] = useState<Date | null>(null);
  const [policyNo, setPolicyNo] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [status, setStatus] = useState(item.status);
  const [patientData, setPatientData] = useState<any>({});
  const [items, setItems] = useState(formattedItems);
  const [totalAmount, setTotalAmount] = useState(item.amount);
  const [data, setData] = useState<any[]>([]);

  const addItem = () => {
    setItems([
      ...items,
      { name: "", qty: "", price: "", amount: 0, _id: "", billId: "" },
    ]);
  };

  const removeItem = async (index: number, item: any) => {
    if (item._id !== "" && item.billId !== "") {
      const response = await postApi("hospital/bills/remove-bill-item", {
        id: item._id,
        billId: item.billId,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.response.data.message);
      }
    }

    const finalAmount = totalAmount - item.amount;
    setTotalAmount(finalAmount);

    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems: any = [...items];
    newItems[index][field] = value;
    newItems[index].amount = newItems[index].qty * newItems[index].price || 0;
    setItems(newItems);
    calculateTotalAmount(newItems);
  };

  useEffect(() => {
    const getPAtientAdmissionData = async () => {
      const response = await postApi(
        "hospital/admission/patient-vise-admission",
        {}
      );

      if (response.status === 200) {
        setData(response.data.data);
      }
    };

    getPAtientAdmissionData();
  }, []);

  useEffect(() => {
    const getPAtientAdmissionData = async () => {
      const response = await postApi("hospital/admission/view", {
        id: admissionId,
      });

      if (response.status === 200) {
        const patientData = response.data.data;
        setPatientData(patientData);
        setPatientEmail(patientData.patientId.emailAddress);
        setPatientCellNo(patientData.patientId.mobileNumber);
        setGender(patientData.patientId.gender);
        const date: Date = new Date(patientData.patientId.birthDate);
        setDob(date);
        setDoctor(
          patientData.doctorId.firstName + " " + patientData.doctorId.lastName
        );
        setAdmissionDate(new Date(patientData.admissionDate));
        setDischargeDate(
          patientData.dischargeDate !== null
            ? new Date(patientData.dischargeDate)
            : null
        );
        setPolicyNo(patientData.patientId.mediclaim);
      }
    };

    getPAtientAdmissionData();
  }, [admissionId]);

  const calculateTotalAmount = (items: any) => {
    const total = items.reduce((acc: any, item: any) => acc + item.amount, 0);
    setTotalAmount(total);
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    const data = {
      id: item._id,
      patientId: patientData.patientId._id,
      amount: totalAmount,
      status: status,
      patientAdmissionId: admissionId,
      billDate: billDate,
      items: items,
    };
    console.log("🚀 ~ handleSubmit ~ data:", data);

    let response = await postApi("hospital/bills/update", data);

    if (response.status === 200) {
      toast.success("Bill added successfully");
      navigate("/accounts?tab=bills");
    } else {
      toast.error("Error adding bill");
    }
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">Edit Bills</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/accounts?tab=bills")}
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
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Admission ID
                      </label>
                      <select
                        className="form-select"
                        value={admissionId}
                        onChange={(e) => setAdmissionId(e.target.value)}
                      >
                        <option>Select Admission ID</option>
                        {data.map((item: any) =>
                          item ? (
                            <option key={item._id} value={item._id}>
                              {item.admissionId}-{item.patientId.firstName}{" "}
                              {item.patientId.lastName}
                            </option>
                          ) : (
                            <option>No Admission Found</option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Bill Date
                      </label>
                      <DatePicker
                        selected={billDate}
                        onChange={(date) => setBillDate(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Patient Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        disabled
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Patient Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={patientCellNo}
                        disabled
                        onChange={(e) => setPatientCellNo(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Patient Gender
                      </label>
                      <div className="d-flex gap-4">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={gender === "male"}
                          disabled
                          onChange={(e) => setGender(e.target.value)}
                        />{" "}
                        Male
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          disabled
                          checked={gender === "female"}
                          onChange={(e) => setGender(e.target.value)}
                        />{" "}
                        Female
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Patient DOB
                      </label>
                      <DatePicker
                        selected={dob}
                        onChange={(date) => setDob(date)}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Doctor
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={doctor}
                        disabled
                        onChange={(e) => setDoctor(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Admission Date
                      </label>
                      <DatePicker
                        selected={admissionDate}
                        onChange={(date) => setAdmissionDate(date)}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Discharge Date
                      </label>
                      <DatePicker
                        selected={dischargeDate}
                        onChange={(date) => setDischargeDate(date)}
                        className="form-control"
                        disabled
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Mediclaim
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={policyNo}
                        disabled
                        onChange={(e) => setPolicyNo(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label mt-3 text-gray-600">
                        Total Days
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={totalDays}
                        disabled
                        onChange={(e) => setTotalDays(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label mt-3 text-gray-600">
                        Status
                      </label>
                      <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option>Select Status</option>

                        <option key="Paid" value="Paid">
                          Paid
                        </option>
                        <option key="Unpaid" value="Unpaid">
                          Unpaid
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Item Table */}
                  <div className="d-flex justify-content-between">
                    <h3>Items</h3>
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
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item: any, index: number) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={item.name}
                              onChange={(e) =>
                                handleItemChange(index, "name", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={item.qty}
                              onChange={(e) =>
                                handleItemChange(index, "qty", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={item.price}
                              onChange={(e) =>
                                handleItemChange(index, "price", e.target.value)
                              }
                            />
                          </td>
                          <td>{item.amount}</td>
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

                  <div className="d-flex justify-content-start">
                    <h4>Total Amount: {totalAmount}</h4>
                  </div>

                  <div className="d-flex gap-2 justify-content-end">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn_style"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/accounts?tab=bills")}
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

export default EditBills;
