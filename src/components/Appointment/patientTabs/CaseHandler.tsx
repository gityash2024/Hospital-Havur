// CaseHandler.tsx
import React, { useState, useEffect } from "react";
import { Table, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { FaEdit, FaTrash, FaFilter, FaEye } from "react-icons/fa";
import TablePagination from "../../common/TablePagination";
import SearchBar from "../../searchBar";
import { getRandomColor } from "../../common/getRandomColor";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../services/api"; // Assuming this is your API utility
import ConfirmDialog from "../../common/ConfirmDialog"; // Adjust the import path as needed
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface caseHandler {
  email: any;
  lastName: any;
  firstName: any;
  _id: any;
  name: any;
  emailAddress: any;
}

const CaseHandler: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [data, setData] = useState<caseHandler[]>([]);
  const [filteredData, setFilteredData] = useState<caseHandler[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  // const [selectedPatient, setSelectedPatient] = useState<caseHandler | null>(
  //   null
  // );
  const [selectedId, setselectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchIPDdata = async () => {
      const response = await postApi("hospital/patient/caseHandler/list", {});
      if (response.status === 200) {
        setData(response.data.data.caseHandler);
        setFilteredData(response.data.data.caseHandler);
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
        const response = await postApi("hospital/patient/caseHandler/remove", {
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
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // const filteredPatients = patients.filter((patient) => {
  //   const matchesSearchQuery =
  //     patient.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     patient.patientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     patient.ipdNo.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesFilterStatus =
  //     filterStatus === "All" || patient.status === filterStatus;
  //   return matchesSearchQuery && matchesFilterStatus;
  // });

  const totalItems = filteredData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredData.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = data.filter(
      (item) =>
        item.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.lastName.toLowerCase().includes(query.toLowerCase()) ||
        item.email.toLowerCase().includes(query.toLowerCase())
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
            onClick={() => navigate("/patients/casehandler/create")}
          >
            Add Case Handler
          </Button>
        </div>
      </div>
      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table">
            <thead>
              <tr>
                <th>CASE HANDLER</th>
                <th>PHONE</th>
                <th>QUALIFICATION</th>
                <th>BIRTH DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item: any) => (
                <tr key={item._id}>
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
                          {item.firstName.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div>
                          {item.firstName} {item.lastName}
                        </div>
                        <div className="text-muted">{item.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{item.phone}</div>
                  </td>
                  <td>{item.qualification}</td>
                  <td>{formatDate(item.birthDate)}</td>
                  <td>
                    {/* <Button
                      variant="link"
                      className="p-0"
                      onClick={() =>
                        navigate(`/IPD-patients/edit/${item._id}`, {
                          state: { item },
                        })
                      }
                    >
                      <FaEdit className="text-primary" />
                    </Button> */}

                    <Button
                      type="button"
                      className="p-0 px-2 border-0 bg-transparent action_icn"
                      onClick={() =>
                        navigate(`/patients/casehandler/view/${item._id}`, {
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

export default CaseHandler;
