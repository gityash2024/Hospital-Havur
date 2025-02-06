import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../services/api";
import { FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";

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

const AddInvoice = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState("");
  const [invoiceId, setInvoiceId] = useState(generateAutoID(8));
  const [invoiceDate, setInvoiceDate] = useState<Date | null>(new Date());
  const [discount, setDiscount] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [patientData, setPatientData] = useState<any>([]);
  const [errors, setErrors] = useState<any>({});
  const [items, setItems] = useState([
    { account: "", description: "", qty: "", price: "", total: 0 },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [subAmount, setSubAmount] = useState<number>(0);
  const [discountedAmount, setDiscountedAmount] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);

  const addItem = () => {
    setItems([
      ...items,
      { account: "", description: "", qty: "", price: "", total: 0 },
    ]);
  };

  const removeItem = (index: number, item: any) => {
    const finalAmount = totalAmount - item.amount;
    setSubAmount(finalAmount);

    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems: any = [...items];
    newItems[index][field] = value;
    newItems[index].total = newItems[index].qty * newItems[index].price || 0;
    setItems(newItems);
    calculateTotalAmount(newItems);
    calculateTotalDiscountedAmount(newItems);
    calculateAmount();
  };

  useEffect(() => {
    const getAccountDetails = async () => {
      const response = await postApi("hospital/accounts/list", {});

      if (response.status === 200) {
        setData(response.data.data.accounts);
      }
    };

    getAccountDetails();
  }, []);

  useEffect(() => {
    const getPatientsData = async () => {
      const response = await postApi("hospital/patient/list", {});

      if (response.status === 200) {
        setPatientData(response.data.data.patient);
      }
    };

    getPatientsData();
  }, []);

  const calculateTotalAmount = (items: any) => {
    const total = items.reduce((acc: any, item: any) => acc + item.total, 0);
    setSubAmount(total);
  };

  const calculateTotalDiscountedAmount = (items: any) => {
    const total = items.reduce((acc: any, item: any) => acc + item.total, 0);
    const discountAmount = (total * discount) / 100;
    setDiscountedAmount(discountAmount);
  };

  const calculateAmount = () => {
    const finalAmount = subAmount - discountedAmount;
    setTotalAmount(finalAmount);
  };

  //   setDiscountedAmount(parseFloat(((subAmount * discount) / 100).toFixed(2)));

  const handleSubmit = async () => {
    // Handle form submission logic here
    const data = {
      patientId: patient,
      amount: subAmount - discountedAmount,
      status: status,
      invoiceId: invoiceId,
      invoiceDate: invoiceDate,
      discount: discount,
      items: items,
    };

    let response = await postApi("hospital/invoices/add", data);

    if (response.status === 200) {
      toast.success("Invoice added successfully");
      navigate("/accounts?tab=invoices");
    } else {
      toast.error("Error adding bill");
    }
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">New Invoice</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/accounts?tab=invoices")}
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
                      <h3>
                        Invoice #
                        <span className="font-weight-light">{invoiceId}</span>
                      </h3>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Patient</label>
                      <select
                        className="form-select"
                        value={patient}
                        onChange={(e) => setPatient(e.target.value)}
                      >
                        <option>Select Patient</option>
                        {patientData.map((item: any) =>
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
                    <div className="col-md-4">
                      <label className="form-label">Invoice Date</label>
                      <DatePicker
                        selected={invoiceDate}
                        onChange={(date) => setInvoiceDate(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="form-control"
                      />
                    </div>
                    <hr className="mt-4 h-4"></hr>
                    <div className="col-md-6">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formname" className="form-label">
                          Discount: (%) <span className="required"></span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="formname"
                          placeholder="Enter Discount"
                          value={discount}
                          onChange={(e: any) => setDiscount(e.target.value)}
                        />
                        {errors.discount && (
                          <span className="error">{errors.discount}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option>Select Status</option>

                        <option key="Paid" value="Paid">
                          Paid
                        </option>
                        <option key="Pending" value="Pending">
                          Pending
                        </option>
                      </select>
                    </div>
                  </div>

                  <hr className="mt-4 h-4"></hr>

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
                        <th>Account</th>
                        <th>description</th>
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
                            <select
                              className="form-select"
                              value={item.account}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "account",
                                  e.target.value
                                )
                              }
                            >
                              <option>Select Account</option>

                              {data.map((itm: any) => (
                                <option key={itm.name} value={itm.name}>
                                  {itm.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={item.description}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "description",
                                  e.target.value
                                )
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
                          <td>{item.total}</td>
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

                  <div className="mt-3 d-flex justify-content-end">
                    <div className="col-md-5">
                      <div>
                        <p className="d-flex justify-content-between">
                          <span>Sub Total: </span>
                          <span>{subAmount}</span>
                        </p>
                        <hr />
                        <p className="d-flex justify-content-between">
                          <span>Discount:</span>
                          <span>{discountedAmount}</span>
                        </p>
                        <hr />
                        <p className="d-flex justify-content-between">
                          <span>Total Amount:</span>
                          <span>{subAmount - discountedAmount}</span>
                        </p>
                      </div>
                    </div>
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
                      onClick={() => navigate("/accounts?tab=invoices")}
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

export default AddInvoice;
