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

function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedId, setselectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceptionistdata = async () => {
      const response = await postApi("hospital/receptionist/list", {});
      if (response.status === 200) {
        setData(response.data.data.receptionist);
        setFilteredData(response.data.data.receptionist);
      }
    };

    fetchReceptionistdata();
  }, []);

  const handleDeleteClick = (id: string) => {
    setselectedId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        const response = await postApi("hospital/receptionist/remove", {
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
      (item: any) =>
        item.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.lastName.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase()) ||
        item.role.toLowerCase().includes(query.toLowerCase())
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
            placeholder="Search by Firstname, Role, Email, or Lastname"
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
            onClick={() => navigate("/users/create")}
          >
            Add Users
          </Button>
        </div>
      </div>
      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Date</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.length > 0 ? (
                displayedItems.map((item: any) => (
                  <tr key={item._id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <td>
                      <div>{formatDate(item.createdAt)}</div>
                    </td>
                    <td>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() =>
                          navigate(`/users/edit/${item._id}`, {
                            state: { item },
                          })
                        }
                      >
                        <FaEdit className="text-primary" />
                      </Button>

                      <Button
                        type="button"
                        className="p-0 px-2 border-0 bg-transparent action_icn"
                        onClick={() =>
                          navigate(`/users/view/${item._id}`, {
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
                      <h4>No user data available</h4>
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
          message="Are you sure you want to delete this User?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          btnTxt1="Cancel"
          btnTxt2="Delete"
        />
      </div>
    </div>
  );
}

export default Users;