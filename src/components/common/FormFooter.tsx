import React from "react";

interface FormFooterProps {
  onSave?: () => void;
  saveButtonText?: string;
  showCancelButton?: boolean;
  onCancel?: () => void;
}

const FormFooter: React.FC<any> = ({
  onSave,
  saveButtonText = "Save",
  showCancelButton = true,
  onCancel,
}) => {
  return (
    <div>
      <div className="d-flex justify-content-end">
        {onSave && (
          <input
            className="btn btn_style me-2"
            id="saveBtn"
            type="button"
            value={saveButtonText}
            onClick={onSave}
          />
        )}
        {showCancelButton &&
          onCancel && ( // Conditionally render cancel button
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
      </div>
    </div>
  );
};

export default FormFooter;
