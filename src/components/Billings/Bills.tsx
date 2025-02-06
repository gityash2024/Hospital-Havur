import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdPrint } from "react-icons/io";
import Table from "react-bootstrap/Table";
import TablePagination from "../common/TablePagination";
import { postApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import jsPDF and the autoTable plugin
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ConfirmDialog from "../common/ConfirmDialog";

const formatDate = (isoDateString: string) => {
  return format(new Date(isoDateString), "MMMM dd, yyyy, hh:mm a");
};

const Bills = () => {
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
        const response = await postApi("hospital/bills/list", {});
        if (response.status === 200) {
          const bills = response.data.data;
          setData(bills);
          setFilteredData(bills); // Initialize filtered data
        } else {
          console.error("Failed to fetch bills data");
        }
      } catch (error) {
        console.error("Error fetching bills data:", error);
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
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleDeleteClick = (id: string) => {
    setselectedId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        const response = await postApi("hospital/bills/remove", {
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

  // Function to generate the PDF
  const handlePrint = (item: any) => {
    const doc: any = new jsPDF();

    // Hospital Logo and Header
    // doc.generateAliasFromImageData(
    //   "https://urmedixx-mfile.s3.ap-south-1.amazonaws.com/images/brand.png",
    //   "png"
    // );
    doc.setFontSize(22);
    doc.text("BILL", 10, 20);
    doc.setFontSize(12);
    doc.text(`Admission ID: #${item.admissionDetails.admissionId}`, 10, 30);

    // Patient and Doctor Details
    doc.text("Patient Details:", 10, 50);
    doc.text(
      `Patient: ${item.patientDetails.firstName} ${item.patientDetails.lastName}`,
      10,
      60
    );
    doc.text(`Email: ${item.patientDetails.emailAddress}`, 10, 70);
    doc.text(`Phone: ${item.patientDetails.mobileNumber}`, 10, 80);
    doc.text(`Gender: ${item.patientDetails.gender}`, 10, 90);
    doc.text(
      `Date of Birth: ${new Date(
        item.patientDetails.birthDate
      ).toLocaleDateString("en-GB")}`,
      10,
      100
    );
    doc.text(`Bill ID: ${item.billId}`, 10, 110);
    doc.text(
      `Bill Date: ${new Date(item.billDate).toLocaleDateString("en-GB")}`,
      10,
      120
    );

    // Doctor and Admission Details
    doc.text(
      `Doctor: ${
        item.doctorDetails.firstName + " " + item.doctorDetails.lastName
      }`,
      120,
      60
    );
    doc.text(
      `Admission Date: ${new Date(
        item.admissionDetails.admissionDate
      ).toLocaleDateString("en-GB")}`,
      120,
      70
    );
    doc.text(
      `Discharge Date: ${
        item.admissionDetails.dischargeDate !== null
          ? item.admissionDetails.dischargeDate
          : "N/A"
      }`,
      120,
      80
    );
    doc.text(`Package: ${item.package || "N/A"}`, 120, 90);
    doc.text(`Insurance: ${item.insurance || "N/A"}`, 120, 100);
    doc.text(`Policy No: ${item.policyNo || "N/A"}`, 120, 110);

    // Table for Item Details
    const tableColumn = ["#", "Item Name", "Qty", "Price", "Amount"];
    const tableRows: any = [];

    item.billItems.forEach((itm: any, index: number) => {
      const rowData = [index + 1, itm.itemName, itm.qty, itm.price, itm.amount];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 140,
    });

    // Total Amount
    doc.text(
      `Total Amount: ${item.amount}`,
      150,
      doc.autoTable.previous.finalY + 10
    );

    // Open PDF in new tab
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
            onClick={() => navigate("/bills/create")}
          >
            Add Bills
          </button>
        </div>
      </div>

      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table">
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Patient</th>
                <th>Status</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="badge bg-light-info">{item.billId}</div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="image image-circle image-mini me-3">
                        <a href="#">
                          <div className="table_img">
                            <img
                              src={
                                item.patientDetails.photo !== ""
                                  ? item.patientDetails.photo
                                  : "https://img.freepik.com/free-vector/doctor-medical-healthcare-pfrofessional-character-vector_53876-175176.jpg"
                              }
                              alt="Nav Image"
                            />
                          </div>
                        </a>
                      </div>
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
                    {item.status === "Paid" ? (
                      <div className="badge bg-light-success">
                        {item.status}
                      </div>
                    ) : (
                      <div className="badge bg-light-danger">{item.status}</div>
                    )}
                  </td>
                  <td>
                    <div className="badge bg-light-info">
                      {item.billDate ? formatDate(item.billDate) : "N/A"}
                    </div>
                  </td>
                  <td>{item.amount}</td>
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
                        navigate(`/bills/edit/${item._id}`, {
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
              ))}
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
            message="Are you sure you want to delete this Bill?"
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

export default Bills;
