import React, { useState, useEffect } from "react";
import { Table, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash, FaFilter, FaEye } from "react-icons/fa";
import TablePagination from "../common/TablePagination";
import SearchBar from "../searchBar";
import { getRandomColor } from "../common/getRandomColor";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/api";
import ConfirmDialog from "../common/ConfirmDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IPDPatient {
  doctorId: any;
  _id: any;
  patientId: any;
  ipdNo: string;
  patientName: string;
  patientEmail: string;
  doctorName: string; 
  doctorEmail: string;
  admissionDate: string;
  admissionTime: string;
  bed: string;
  billStatus: string;
  status: string;
  name: any;
  emailAddress: any;
}

const IPDPatients: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [data, setData] = useState<IPDPatient[]>([]);
  const [filteredData, setFilteredData] = useState<IPDPatient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedId, setselectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchIPDdata = async () => {
      const response = await postApi("hospital/ipd_patient/list", {});
      if (response.status === 200) {
        setData(response.data.data.ipdPatient);
        setFilteredData(response.data.data.ipdPatient);
      }
    };

    fetchIPDdata();
  }, []);

  const handleDeleteClick = (id: string) => {
    setselectedId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        const response = await postApi("hospital/ipd_patient/remove", {
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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long", 
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  };

  const totalItems = filteredData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredData.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = data.filter(
      (item) =>
        item.patientId.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.patientId.lastName.toLowerCase().includes(query.toLowerCase()) ||
        item.patientId.emailAddress.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  const handleFilterChange = (status: string | null) => {
    if (status) {
      setFilterStatus(status);
      setCurrentPage(1);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="mt-2">
      <div className="row mb-3">
        <div className="col-md-6 mb-2 mb-md-0">
          <SearchBar
            placeholder="Search by Patient, Email, or IPD No"
            onSearch={handleSearch}
          />
        </div>
        <div
          className="col-md-6 d-flex justify-content-md-end align-items-center"
          style={{ gap: "10px" }}
        >
          <Button
            variant="outline-primary"
            className="btn btn_style"
            onClick={() => navigate("/IPD-patients/create")}
          >
            Add IPD Patient
          </Button>
        </div>
      </div>
      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table">
            <thead>
              <tr>
                <th>IPD NO</th>
                <th>PATIENT</th>
                <th>DOCTOR</th>
                <th>ADMISSION DATE</th>
                <th>BED</th>
                <th>BILL STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            
<tbody>
  {displayedItems.length > 0 ? (
    displayedItems.map((item: any) => (
      <tr key={item._id}>
        <td>
          <div className="badge bg-light-info">
            <span>{item.ipdNo}</span>
          </div>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <div className="avatar me-3">
              <span
                className={`badge rounded-circle bg-${getRandomColor()}`}
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}
              >
                {item.patientId.firstName
                  .substring(0, 2)
                  .toUpperCase()}
              </span>
            </div>
            <div>
              <div>
                {item.patientId.firstName} {item.patientId.lastName}
              </div>
              <div className="text-muted">
                {item.patientId.emailAddress}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex align-items-center">
            <div className="avatar me-3">
              <span
                className={`badge rounded-circle bg-${getRandomColor()}`}
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                }}
              >
                {item.doctorId.firstName
                  .substring(0, 2)
                  .toUpperCase()}
              </span>
            </div>
            <div>
              <div>
                {item.doctorId.firstName} {item.doctorId.lastName}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div>{formatDate(item.admissionDate)}</div>
        </td>
        <td>{item.bed?.name}</td>
        <td>
          <span
            className={`badge ${
              item.billStatus === "unpaid" ? "bg-danger" : "bg-success"
            }`}
          >
            {item.billStatus}
          </span>
        </td>
        <td>
          <Button
            type="button"
            className="p-0 px-2 border-0 bg-transparent action_icn"
            onClick={() =>
              navigate(`/IPD-patients/view/${item._id}`, {
                state: { item },
              })
            }
          >
            <span className="view">
              <FaEye />
            </span>
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
      <td colSpan={7} className="text-center py-5">
        <div className="d-flex flex-column align-items-center">
        <span
                        role="img"
                        aria-label="Sad Face"
                        className="fs-1 mb-4"
                      >
                        😞
                      </span>
          <h4>No IPD patient data available</h4>
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
        </div>
        <ConfirmDialog
          show={showConfirmDialog}
          title="Confirm Delete"
          message="Are you sure you want to delete this IPD patient?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          btnTxt1="Cancel"
          btnTxt2="Delete"
        />
      </div>
    </div>
  );
};

export default IPDPatients;