import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdPrint } from "react-icons/io";
import Table from "react-bootstrap/Table";
import TablePagination from "../common/TablePagination";
import { postApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ConfirmDialog from "../common/ConfirmDialog";

const formatDate = (isoDateString: string) => {
  return format(new Date(isoDateString), "MMMM dd, yyyy, hh:mm a");
};

const Prescriptions = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedId, setselectedId] = useState<string | null>(null);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  useEffect(() => {
    const fetchBillsList = async () => {
      try {
        const response = await postApi("hospital/prescription/list", {});
        if (response.status === 200) {
          const bills = response.data.data;
          setData(bills);
          setFilteredData(bills);
        } else {
          console.error("Failed to fetch prescription data");
        }
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };

    fetchBillsList();
  }, []);

  const displayedItems = filteredData.slice(startIndex, endIndex);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredItems = data.filter((item) =>
      [
        item.patientDetails?.firstName,
        item.patientDetails?.lastName,
        item.billId,
      ].some((field) => field?.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredData(filteredItems);
    setCurrentPage(1);
  };

  const handleDeleteClick = (id: string) => {
    setselectedId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        const response = await postApi("hospital/prescription/remove", {
          id: selectedId,
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          const updatedData = data.filter((item) => item._id !== selectedId);
          setData(updatedData);
          setFilteredData(updatedData);
        } else {
          toast.error(response.response.data.message);
        }
      } catch (error) {
        toast.error("An error occurred while deleting the case");
      } finally {
        setShowConfirmDialog(false);
        setselectedId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setselectedId(null);
  };

  const handlePrint = (item: any) => {
    const doc: any = new jsPDF();

    doc.setFontSize(18);
    doc.text("Havur", 160, 20);
    doc.setFontSize(12);
    doc.text("16/A Saint Joseph Park", 160, 30);

    doc.setFontSize(12);
    doc.text("Patient Name:", 10, 50);
    doc.text(
      `${item.patientDetails.firstName} ${item.patientDetails.lastName}`,
      40,
      50
    );

    doc.text("Age:", 10, 70);
    doc.text(`${item.patientDetails.age}`, 40, 70);

    doc.text("Doctor:", 140, 50);
    doc.text(
      `DR.${item.doctorDetails.firstName} ${item.doctorDetails.lastName}`,
      160,
      50
    );

    doc.text("Added At:", 140, 60);
    doc.text(`${formatDate(item.medicalHistory)}`, 160, 60);

    doc.text("Problem:", 10, 90);
    doc.text(`${item.problem || "N/A"}`, 40, 90);

    doc.text("Test:", 120, 90);
    doc.text(`${item.test || "N/A"}`, 160, 90);

    doc.text("Advice:", 120, 90);
    doc.text(`${item.advice || "N/A"}`, 160, 90);

    const medicalDetails = [
      { label: "Food Allergies", value: item.foodAllergies || "N/A" },
      { label: "High Blood Pressure", value: item.highBloodPressure || "N/A" },
      { label: "Accident", value: item.accident || "N/A" },
      { label: "Current Medication", value: item.currentMedication || "N/A" },
      { label: "Pulse Rate", value: item.pulseRate || "N/A" },
      { label: "Problem Description", value: item.problemDescription || "N/A" },
      { label: "Tendency Bleed", value: item.tendencyBleed || "N/A" },
      { label: "Diabetic", value: item.diabetic || "N/A" },
      { label: "Female Pregnancy", value: item.femalePregnancy || "N/A" },
      { label: "Temperature", value: item.temperature || "N/A" },
      { label: "Heart Disease", value: item.heartDisease || "N/A" },
      { label: "Surgery", value: item.surgery || "N/A" },
      { label: "Breast Feeding", value: item.breastFeeding || "N/A" },
    ];

    let yOffset = 110;
    medicalDetails.forEach((detail, index) => {
      if (index % 2 === 0) {
        doc.text(`${detail.label}:`, 10, yOffset);
        doc.text(`${detail.value}`, 50, yOffset);
      } else {
        doc.text(`${detail.label}:`, 120, yOffset);
        doc.text(`${detail.value}`, 160, yOffset);
        yOffset += 10;
      }
    });

    doc.setFontSize(14);
    doc.text("Rx:", 10, yOffset + 10);

    const tableColumn = [
      "MEDICINE NAME",
      "DOSAGE",
      "DURATION",
      "TIME",
      "DOSE INTERVAL",
      "COMMENT",
    ];
    const tableRows = item.prescriptionItem.map((prescription: any) => [
      prescription.medicine,
      prescription.dosage,
      prescription.day,
      prescription.time,
      prescription.comment,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: yOffset + 20,
    });

    doc.text(
      `DR.${item.doctorDetails.firstName} ${item.doctorDetails.lastName}`,
      160,
      doc.autoTable.previous.finalY + 20
    );
    doc.text(
      `${item.doctorDetails.specialization}`,
      160,
      doc.autoTable.previous.finalY + 30
    );

    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    window.open(url);
  };

  return (
    <div>
      <div className="d-lg-flex justify-content-between align-items-center mb-sm-7 mb-4">
        <div className="d-flex justify-content-start flex-wrap align-items-center">
          <div className="body_search">
            <BsSearch />
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search"
              value={searchQuery}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end flex-wrap">
          <button
            type="button"
            className="btn btn_style"
            onClick={() => navigate("/prescription/create")}
          >
            Add Prescription
          </button>
        </div>
      </div>

      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Added At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.length > 0 ? (
                displayedItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="d-flex flex-column">
                          {item.patientDetails ? (
                            <div className="d-flex flex-column">
                              <a href="#">
                                {item.patientDetails.firstName}{" "}
                                {item.patientDetails.lastName}
                              </a>
                              <span>{item.patientDetails.emailAddress}</span>
                            </div>
                          ) : (
                            <div className="text-muted">N/A</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="d-flex flex-column">
                          {item.doctorDetails ? (
                            <div className="d-flex flex-column">
                              <a href="#">
                                {item.doctorDetails.firstName}{" "}
                                {item.doctorDetails.lastName}
                              </a>
                              <span>{item.doctorDetails.email}</span>
                            </div>
                          ) : (
                            <div className="text-muted">N/A</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="badge bg-light-info">
                        {item.createdAt ? formatDate(item.createdAt) : "N/A"}
                      </div>
                    </td>
                    <td>
                      <div className="badge bg-light-success">
                        {item.status.toString()}
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="link"
                        className="p-0 px-2 border-0 bg-transparent action_icn"
                        onClick={() => handlePrint(item)}
                      >
                        <IoMdPrint className="text-warning" />
                      </Button>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() =>
                          navigate(`/prescription/edit/${item._id}`, {
                            state: { item },
                          })
                        }
                      >
                        <FaEdit className="text-primary" />
                      </Button>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => handleDeleteClick(item._id)}
                      >
                        <FaTrash className="text-danger" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-5">
                    <div className="d-flex flex-column align-items-center">
                      <span
                        role="img"
                        aria-label="Sad Face"
                        className="fs-1 mb-4"
                      >
                        😞
                      </span>
                      <h4>No prescription data available</h4>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="table-pagination">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
          <ConfirmDialog
            show={showConfirmDialog}
            title="Confirm Delete"
            message="Are you sure you want to delete this Prescription?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            btnTxt1="Cancel"
            btnTxt2="Delete"
          />
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;