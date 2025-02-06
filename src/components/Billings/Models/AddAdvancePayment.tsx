import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { postApi } from "../../services/api";

function generateAutoID(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

const AddAdvancePayment = () => {
  const navigate = useNavigate();
  const [paymentDate, setPaymentDate] = useState<Date | null>(new Date());
  const [receipt, setReceipt] = useState(generateAutoID(6));
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [patientData, setPatientData] = useState([]);
  const [patient, setPatient] = useState("");

  useEffect(() => {
    const getPatientsData = async () => {
      const response = await postApi("hospital/patient/list", {});

      if (response.status === 200) {
        setPatientData(response.data.data.patient);
      }
    };

    getPatientsData();
  }, []);

  const CreatePayment = async () => {
    const validationErrors: any = {};

    if (!patient) {
      validationErrors.patient = "Patient is required.";
    }

    if (!receipt) {
      validationErrors.receipt = "Receipt is required.";
    }

    if (!amount) {
      validationErrors.amount = "Amount is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        receiptNo: receipt,
        patientId: patient,
        amount: amount,
        paymentDate: paymentDate,
      };

      let response: any = await postApi(
        "hospital/advance-payments/add",
        submitData
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/accounts?tab=advance-payment");
      } else {
        toast.error(response.response.data.message);
      }
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPatient(e.target.value);
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">New Advance Payment</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/accounts?tab=advance-payment")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap flex-column-fluid">
        <div className="container-fluid">
          <div className="d-flex flex-column">
            <div className="card">
              <div className="card-body p-12">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label
                          htmlFor="formSelectPatient"
                          className="form-label"
                        >
                          Patient <span className="required"></span>
                        </label>
                        <select
                          className="form-select"
                          value={patient}
                          onChange={handleRoleChange}
                        >
                          <option value="">Select Patient</option>
                          {patientData.map((patient: any) => {
                            return (
                              <option value={patient._id}>
                                {patient.firstName} {patient.lastName}
                              </option>
                            );
                          })}
                        </select>
                        {errors.patient && (
                          <span className="error">{errors.patient}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-gray-600">Date</label>
                      <DatePicker
                        selected={paymentDate}
                        onChange={(date) => setPaymentDate(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formname" className="form-label">
                          Receipt No<span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formname"
                          placeholder="Enter Payto"
                          value={receipt}
                          disabled
                          onChange={(e) => setReceipt(e.target.value)}
                        />
                        {errors.receipt && (
                          <span className="error">{errors.receipt}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="amount" className="form-label">
                          Amount<span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="amount"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        {errors.amount && (
                          <span className="error">{errors.amount}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <input
                      className="btn btn_style me-2"
                      id="saveBtn"
                      type="button"
                      value="Save"
                      onClick={CreatePayment}
                    />
                    <button
                      type="button"
                      onClick={() => navigate("/accounts?tab=advance-payment")}
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

export default AddAdvancePayment;
