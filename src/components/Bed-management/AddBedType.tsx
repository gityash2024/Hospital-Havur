import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBedType = () => {
  const navigate = useNavigate();
  const [bedType, setbedType] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});

  const AddBedType = async () => {
    const validationErrors: any = {};
    if (!bedType) {
      validationErrors.bedType = "bedType is required.";
    }

    if (!description) {
      validationErrors.description = "description is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const submitData = {
        bedType: bedType,
        description: description,
      };
      console.log(submitData);

      let response: any = await postApi("hospital/bed_type/add", submitData);

      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/bedtypes");
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <div>
      <div className="content d-flex flex-column flex-column-fluid pt-7">
        <div className="container-fluid">
          <div className="d-md-flex align-items-center justify-content-between mb-5">
            <h1 className="mb-0 title_sm">New Bed Type</h1>
            <div className="text-end mt-4 mt-md-0">
              <button
                type="button"
                className="btn btn_style"
                onClick={() => navigate("/bedtypes")}
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
                    <div className="col-md-12">
                      <div className="mb-sm-7 mb-4">
                        <label htmlFor="formbedtype" className="form-label">
                          Bed Type
                        </label>
                        <textarea
                          className="form-control"
                          id="formbedtype"
                          placeholder="Enter bed type"
                          value={bedType}
                          onChange={(e) => setbedType(e.target.value)}
                        />
                        {errors.bedType && (
                          <span className="error">{errors.bedType}</span>
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
                      onClick={AddBedType}
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

export default AddBedType;
