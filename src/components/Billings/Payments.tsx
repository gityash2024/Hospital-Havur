import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import TablePagination from "../common/TablePagination";
import SearchBar from "../searchBar";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/api"; // Assuming this is your API utility
import ConfirmDialog from "../common/ConfirmDialog"; // Adjust the import path as needed
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Payments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // State for filter status
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  // const [selectedPatient, setSelectedPatient] = useState<IPDPatient | null>(
  //   null
  // );
  const [selectedId, setselectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentsdata = async () => {
      const response = await postApi("hospital/payments/list", {});
      if (response.status === 200) {
        setData(response.data.data);
        setFilteredData(response.data.data);
      }
    };

    fetchPaymentsdata();
  }, []);

  const handleDeleteClick = (id: string) => {
    setselectedId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        const response = await postApi("hospital/payments/remove", {
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
        item.payTo.toLowerCase().includes(query.toLowerCase()) ||
        item.accountId.name.toLowerCase().includes(query.toLowerCase()) ||
        item.accountId.type.toLowerCase().includes(query.toLowerCase())
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
            placeholder="Search by Account, Date or Pay To"
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
            onClick={() => navigate("/payments/create")}
          >
            Add Payment
          </Button>
        </div>
      </div>
      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Payment Date</th>
                <th>Pay To</th>
                <th>Amount</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item: any) => (
                <tr key={item._id}>
                  <td>{item.accountId.name}</td>
                  <td>{formatDate(item.paymentDate)}</td>
                  <td>{item.payTo}</td>
                  <td>{item.amount}</td>
                  <td>
                    <Button
                      variant="link"
                      className="p-0"
                      onClick={() =>
                        navigate(`/payments/edit/${item._id}`, {
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
                        navigate(`/payments/view/${item._id}`, {
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
          message="Are you sure you want to delete this Payments?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          btnTxt1="Cancel"
          btnTxt2="Delete"
        />
      </div>
    </div>
  );
}

export default Payments;
