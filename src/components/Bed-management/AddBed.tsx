import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBed = () => {
  const navigate = useNavigate();
  const [bedType, setBedType] = useState("");
  const [charge, setCharge] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [BedTypeData, setBedTypeData] = useState([]);

  useEffect(() => {
    const getBedTypeData = async () => {
      const response = await postApi("hospital/bed_type/list", {});

      if (response.status === 200) {
        setBedTypeData(response.data.data.bedType);
      }
    };

    getBedTypeData();
  }, []);

  const AddBed = async () => {
    const validationErrors: any = {};
    if (!bedType) {
      validationErrors.bedType = "Bed Type is required.";
    }

    // if (!description) {
    //   validationErrors.description = "Description is required.";
    // }

    if (!charge) {
      validationErrors.charge = "Charge is required.";
    }

    if (!name) {
      validationErrors.name = "Name is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        name: name,
        charge: charge,
        bedType: bedType,
        description: description,
      };
      console.log(submitData);

      let response: any = await postApi("hospital/bed/add", submitData);

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/bedtypes?tab=bed");
      } else {
        toast.error(response.response.data.message);
      }
    }
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">New Bed</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/bedtypes?tab=bed")}
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
                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formname" className="form-label">
                          Bed Name<span className="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formname"
                          placeholder="Enter Bed Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && (
                          <span className="error">{errors.name}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label
                          htmlFor="formSelectbedType"
                          className="form-label"
                        >
                          Bed Type <span className="required"></span>
                        </label>
                        <select
                          className="form-select"
                          value={bedType}
                          onChange={(e) => setBedType(e.target.value)}
                        >
                          <option value="">Select Bed Type</option>
                          {BedTypeData.map((bedType: any) => (
                            <option key={bedType._id} value={bedType._id}>
                              {bedType.bedType}
                            </option>
                          ))}
                        </select>
                        {errors.bedType && (
                          <span className="error">{errors.bedType}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formcharge" className="form-label">
                          Charges <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formcharges"
                          placeholder="Enter Charges"
                          value={charge}
                          onChange={(e) => setCharge(e.target.value)}
                        />
                        {errors.charge && (
                          <span className="error">{errors.charge}</span>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formDescription" className="form-label">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="formDescription"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && (
                          <span className="error">{errors.description}</span>
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
                      onClick={AddBed}
                    />
                    <button
                      type="button"
                      onClick={() => navigate("/bedtypes")}
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

export default AddBed;
