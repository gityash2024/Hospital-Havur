import React, { useEffect, useState } from "react";
import { Table, Form, Button, Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash, FaFilter, FaEye } from "react-icons/fa";
import TablePagination from "../common/TablePagination";
import SearchBar from "../searchBar";
import { useNavigate } from "react-router-dom";
import { getRandomColor } from "../common/getRandomColor";
import { postApi } from "../services/api";
import ConfirmDialog from "../common/ConfirmDialog";
import { toast } from "react-toastify";

interface bedAssign {
  caseId: string;
  patientName: string;
  patientEmail: string;
  bed: string;
  assignDate: string;
  dischargeDate: string;
}

// Sample data

const BedAssignListing: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [data, setData] = useState<bedAssign[]>([]);
  const [filteredData, setFilteredData] = useState<bedAssign[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedBedAssignId, setselectedBedAssignId] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBedListingsData = async () => {
      const response = await postApi("hospital/bed_assign/list", {});
      if (response.status === 200) {
        setData(response.data.data.bedAssign);
        setFilteredData(response.data.data.bedAssign);
      }
    };

    fetchBedListingsData();
  }, []);
  const handleDeleteClick = (id: string) => {
    setselectedBedAssignId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedBedAssignId) {
      try {
        const response = await postApi("hospital/bed_assign/remove", {
          id: selectedBedAssignId,
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          const updatedData = data.filter(
            (item: any) => item._id !== selectedBedAssignId
          );
          setData(updatedData);
          setFilteredData(updatedData);
        } else {
          toast.error("Failed to delete assigned bed");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the assigned bed");
      } finally {
        setShowConfirmDialog(false);
        setselectedBedAssignId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setselectedBedAssignId(null);
  };

  const totalItems = filteredData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1); // Reset to first page whenever items per page changes
  };

  // Handle filter change
  const handleFilterChange = (status: string | null) => {
    setFilterStatus(status);
    setCurrentPage(1); // Reset to first page whenever filter changes
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page whenever search query changes
  };

  return (
    <div className="mt-2">
      <div className="row mb-3">
        <div className="col-md-6 mb-2 mb-md-0">
          <SearchBar
            placeholder="Search by Patient, Email, or CASE ID"
            onSearch={handleSearch}
          />
        </div>
        <div
          className="col-md-6 d-flex justify-content-md-end align-items-center"
          style={{ gap: "10px" }}
        >
          <Dropdown onSelect={handleFilterChange}>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              <span>
                {" "}
                <FaFilter></FaFilter> {filterStatus}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="">All</Dropdown.Item>
              <Dropdown.Item eventKey="Paid">Paid</Dropdown.Item>
              <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button
            variant="primary"
            onClick={() => navigate("/bedassign/create")}
          >
            New Bed Assign
          </Button>
        </div>
      </div>
      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table striped className="admin_table">
            <thead>
              <tr>
                <th>CASE ID</th>
                <th>PATIENT</th>
                <th>BED</th>
                <th>ASSIGN DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item: any) => (
                <tr key={item._id}>
                  <td>
                    <div className="badge bg-light-info">
                      <a href="#">{item.case.caseId}</a>
                    </div>
                  </td>
                  <td>
                    <div className="badge bg-light-info">
                      <a href="#"> {item.ipdPatient.ipdNo}</a>
                    </div>
                  </td>
                  <td>{item.bed?.name}</td>
                  <td>{item.date}</td>

                  <td className="">
                    <button
                      type="button"
                      className="border-0 bg-transparent"
                      onClick={() =>
                        navigate(`/bedassign/edit/${item._id}`, {
                          state: { item },
                        })
                      }
                    >
                      <span className="edit text-primary">
                        <FaEdit />
                      </span>
                    </button>
                    <button
                      type="button"
                      className="border-0 bg-transparent"
                      onClick={() => handleDeleteClick(item._id)}
                    >
                      <span className="delete text-danger">
                        <FaTrash />
                      </span>
                    </button>
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
        </div>
        <ConfirmDialog
          show={showConfirmDialog}
          title="Confirm Delete"
          message="Are you sure you want to delete this bed assign?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          btnTxt1="Cancel"
          btnTxt2="Delete"
        />
      </div>
    </div>
  );
};

export default BedAssignListing;
