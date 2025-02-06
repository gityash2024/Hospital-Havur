import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { postApi } from "../../services/api";

const AddPayments = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [paymentDate, setPaymentDate] = useState<Date | null>(new Date());
  const [payTo, setPayTo] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const getAccountDetails = async () => {
      const response = await postApi("hospital/accounts/list", {});

      if (response.status === 200) {
        setData(response.data.data.accounts);
      }
    };

    getAccountDetails();
  }, []);

  const CreatePayment = async () => {
    const validationErrors: any = {};

    if (!account) {
      validationErrors.account = "Account is required.";
    }

    if (!payTo) {
      validationErrors.payTo = "PayTo is required.";
    }

    if (!amount) {
      validationErrors.amount = "Amount is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        payTo: payTo,
        accountId: account,
        description: description,
        amount: amount,
        paymentDate: paymentDate,
      };

      let response: any = await postApi("hospital/payments/add", submitData);

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/accounts?tab=payments");
      } else {
        toast.error(response.response.data.message);
      }
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccount(e.target.value);
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">New Payment</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/accounts?tab=payments")}
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
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="account"
                        className="form-label fs-5 text-gray-600"
                      >
                        Account<span className="required"></span>
                      </label>
                      <select
                        className="form-select"
                        name="account"
                        id="account"
                        onChange={handleRoleChange}
                        value={account}
                      >
                        <option value="" disabled>
                          Select Account
                        </option>
                        {data.map((item: any) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {errors.account && (
                        <span className="error">{errors.account}</span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-gray-600">
                        Payment Date
                      </label>
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
                          Pay To<span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formname"
                          placeholder="Enter Payto"
                          value={payTo}
                          onChange={(e) => setPayTo(e.target.value)}
                        />
                        {errors.payTo && (
                          <span className="error">{errors.payTo}</span>
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

                    <div className="col-md-12 mb-3">
                      <label
                        htmlFor="description"
                        className="form-label fs-5 text-gray-600"
                      >
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        placeholder="Description"
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
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
                      onClick={() => navigate("/accounts?tab=payments")}
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

export default AddPayments;
