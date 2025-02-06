import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import TablePagination from "../common/TablePagination";
import SearchBar from "../searchBar";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/api"; // Assuming this is your API utility
import "react-toastify/dist/ReactToastify.css";

function PaymentReports() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // State for filter status

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
          <Button variant="outline-primary" className="btn btn_style">
            Export Reports
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
                <th>Type</th>
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
                    {item.accountId.type === "Credit" ? (
                      <div className="badge bg-light-success">
                        {item.accountId.type}
                      </div>
                    ) : (
                      <div className="badge bg-light-danger">
                        {item.accountId.type}
                      </div>
                    )}
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
      </div>
    </div>
  );
}

export default PaymentReports;
