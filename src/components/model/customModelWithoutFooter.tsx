import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface CustomModalProps {
  modalTitle: string;
  icon: React.ReactNode;
  buttonTitle: string;
  modalContent: React.ReactNode;
  modal_class: string;
  footer: boolean;
}

const CustomModel: React.FC<CustomModalProps> = ({
  modalTitle,
  icon,
  buttonTitle,
  modalContent,
  modal_class,
  footer,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a href="" onClick={handleShow} className="user_modalBtn">
        {icon} {buttonTitle}
      </a>

      <Modal show={show} onHide={handleClose} className={modal_class}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-dialog modal-dialog-scrollable">
          {modalContent}
        </Modal.Body>
        {footer && (
          <Modal.Footer>
            <Button onClick={handleClose}>Save</Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default CustomModel;
