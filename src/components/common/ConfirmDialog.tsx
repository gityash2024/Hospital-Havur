// ConfirmDialog.tsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmDialogProps {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  btnTxt1: string,
  btnTxt2: string
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ show, title, message, onConfirm, onCancel, btnTxt1,btnTxt2 }) => {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {btnTxt1}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {btnTxt2}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
