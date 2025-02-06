import React from 'react';
import { BsPencil } from "react-icons/bs";

interface FileUploaderProps {
    label: string;
    icon?: React.ReactNode;
    requiredMarker?: React.ReactNode;
}

const FileUploader: React.FC<FileUploaderProps> = ({ label, icon, requiredMarker }) => {
    const handleEditClick = () => {
        // Trigger click event of the file input when edit button is clicked
        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle file change event here
        const file = event.target.files && event.target.files[0];
        if (file) {
            console.log("Selected file:", file);
            // You can perform further actions with the selected file
        }
    };

    return (
        <div className="col-md-12">
            <label htmlFor="fileInput" className="form-label">
                {label} {requiredMarker} {icon}
            </label>
            <div className="change_img">
                <img src="/image/nav_img.svg" alt="Nav Image1" />
                <button className="edit_button" onClick={handleEditClick}>
                    <BsPencil style={{ cursor: "pointer" }} />
                </button>
                <input
                    type="file"
                    id="fileInput"
                    name="fileInput"
                    className="file_input"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}

export default FileUploader;
