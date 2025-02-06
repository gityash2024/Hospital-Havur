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

function BillTransaction() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // State for filter status

  useEffect(() => {
    const fetchBillTransactionData = async () => {
      const response = await postApi("hospital/bills/bill-transaction", {});
      if (response.status === 200) {
        setData(response.data.data);
        setFilteredData(response.data.data);
      }
    };

    fetchBillTransactionData();
  }, []);

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
        item.patientId.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.patientId.lastName.toLowerCase().includes(query.toLowerCase()) ||
        item.transactionId.toLowerCase().includes(query.toLowerCase()) ||
        item.status.toLowerCase().includes(query.toLowerCase())
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
      </div>
      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Transaction Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item: any) => (
                <tr key={item._id}>
                  <td>
                    {item.patientId.firstName + " " + item.patientId.lastName}
                  </td>
                  <td>
                    <div className="badge bg-light-info">
                      {item.transactionId}
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
                    <div>{formatDate(item.createdAt)}</div>
                  </td>
                  <td>{item.amount}</td>
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
      </div>
    </div>
  );
}

export default BillTransaction;
