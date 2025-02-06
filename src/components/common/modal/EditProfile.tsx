import React, { useState } from "react";

import { postApi } from "../../services/api";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";

type CountryCode = string;

interface ProfileData {
  name: string;
  emailAddress: string;
  mobileNumber: string;
  location: string;
  address: string;
  hours: string;
  // Add other profile fields as necessary
}

interface EditProfileProps {
  profileData: ProfileData;
}

const EditProfile: React.FC<EditProfileProps> = ({ profileData }) => {
  const [select, setSelect] = useState<CountryCode>("SE");
  const [email, setEmail] = useState<string>(profileData.emailAddress);
  const [name, setName] = useState<string>(profileData?.name);
  const [mobileNumber, setMobileNumber] = useState<string>(
    profileData.mobileNumber
  );
  const [location, setLocation] = useState<string>(profileData.location);
  const [address, setAddress] = useState<string>(profileData.address);
  const [hours, setHours] = useState<string>(profileData.hours);
  const [errors, setErrors] = useState<any>({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSelect = (code: CountryCode) => setSelect(code);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const editProfileData = async () => {
    const validationErrors: any = {};
    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!name) {
      validationErrors.name = "Name is required.";
    }
    if (!mobileNumber) {
      validationErrors.mobileNumber = "Mobile Number is required.";
    }
    if (!location) {
      validationErrors.location = "Location is required.";
    }
    if (!address) {
      validationErrors.address = "Address is required.";
    }
    if (!hours) {
      validationErrors.hours = "Hours is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const finalData = {
        name: name,
        emailAddress: email,
        mobileNumber: mobileNumber,
        location: location,
        address: address,
        hours: hours,
      };
      const response = await postApi("hospital/profile/update", finalData);

      if (response.status === 200) {
        toast.success(response.data.message);
        handleClose();
      } else {
        toast.error(response.response.data.message);
      }
    }
  };

  return (
    <>
      <a onClick={handleShow} className="user_modalBtn">
        <FaUser className="me-2 text-gray-600" /> Edit Profile
      </a>

      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="#">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-sm-7 mb-4">
                  <label htmlFor="formInputEmail" className="form-label">
                    Name <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter your User Name"
                    id="formInputEmail"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-sm-7 mb-4">
                  <label htmlFor="formInputEmail" className="form-label">
                    Email <span className="required"></span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email"
                    id="formInputEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-sm-7 mb-4">
                  <label htmlFor="formInputEmail" className="form-label">
                    Mobile Number <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobileNumber"
                    placeholder="Enter your mobile number"
                    id="formInputmobileNumber"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  {errors.mobileNumber && (
                    <span className="error">{errors.mobileNumber}</span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-sm-7 mb-4">
                  <label htmlFor="formInputEmail" className="form-label">
                    Address <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Enter your address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && (
                    <span className="error">{errors.address}</span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-sm-7 mb-4">
                  <label htmlFor="formInputEmail" className="form-label">
                    Location <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    placeholder="Enter your location"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {errors.location && (
                    <span className="error">{errors.location}</span>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-sm-7 mb-4">
                  <label htmlFor="formInputEmail" className="form-label">
                    Hours <span className="required"></span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="hours"
                    placeholder="Enter your hours"
                    id="hours"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                  {errors.hours && (
                    <span className="error">{errors.hours}</span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => editProfileData()}>Save</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProfile;
