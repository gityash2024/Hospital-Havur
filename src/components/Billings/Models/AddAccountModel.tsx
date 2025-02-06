import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { postApi } from "../../services/api";

const AddAccount = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<any>({});

  const AddUser = async () => {
    const validationErrors: any = {};

    if (!name) {
      validationErrors.name = "Account Name is required.";
    }

    if (!description) {
      validationErrors.description = "Description is required.";
    }

    if (!type) {
      validationErrors.Type = "Account type is required.";
    }

    setErrors(validationErrors);
    console.log("🚀 ~ AddUser ~ validationErrors:", validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        name: name,
        type: type,
        description: description,
        status: status,
      };

      let response: any = await postApi("hospital/accounts/add", submitData);

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/accounts");
      } else {
        toast.error(response.response.data.message);
      }
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">New Accounts</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/accounts")}
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
                        <label htmlFor="name" className="form-label">
                          Account<span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Enter Account "
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                          <span className="error">{errors.name}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="type"
                        className="form-label fs-5 text-gray-600"
                      >
                        Type<span className="required"></span>
                      </label>
                      <select
                        className="form-select"
                        name="type"
                        id="type"
                        onChange={handleRoleChange}
                        value={type}
                      >
                        <option value="" disabled>
                          Select Account Type
                        </option>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                      </select>
                      {errors.type && (
                        <span className="error">{errors.type}</span>
                      )}
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
                      {errors.description && (
                        <span className="error">{errors.description}</span>
                      )}
                    </div>

                    <div className="col-md-4 mb-3">
                      <label
                        htmlFor="status"
                        className="form-label pb-2 fs-5 text-gray-600"
                      >
                        Status:
                      </label>
                      <div className="d-flex gap-4">
                        <label>
                          <input
                            type="radio"
                            name="status"
                            value="true"
                            checked={status === "true"}
                            onChange={handleStatusChange}
                            className="me-2"
                          />
                          True
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="status"
                            value="false"
                            checked={status === "false"}
                            onChange={handleStatusChange}
                            className="me-2"
                          />
                          False
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <input
                      className="btn btn_style me-2"
                      id="saveBtn"
                      type="button"
                      value="Save"
                      onClick={AddUser}
                    />
                    <button
                      type="button"
                      onClick={() => navigate("/users")}
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

export default AddAccount;
