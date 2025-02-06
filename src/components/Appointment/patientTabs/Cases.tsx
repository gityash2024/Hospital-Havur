import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import TablePagination from "../../common/TablePagination";
import SearchBar from "../../searchBar"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import { postApi } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmDialog from "../../common/ConfirmDialog"; // Adjust the path as needed

interface Case {
  patientId: {
    firstName: string;
    emailAddress: string;
    image: string;
  };
  _id: string;
  caseId: string;
  doctorId: {
    firstName: string;
    email: string;
    image: string;
  };
  caseDate: string;
  phone: string;
  fee: string;
  description: string;
}

const Cases = () => {
  const [data, setData] = useState<Case[]>([]);
  const [filteredData, setFilteredData] = useState<Case[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCasesData = async () => {
      const response = await postApi("hospital/patient/case/list", {});
      if (response.status === 200) {
        setData(response.data.data.patientCase);
        setFilteredData(response.data.data.patientCase);
      }
    };

    fetchCasesData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      item.patientId.firstName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedCaseId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCaseId) {
      try {
        const response = await postApi("hospital/patient/case/remove", {
          id: selectedCaseId,
        });
        if (response.status === 200) {
          toast.success("Case deleted successfully");
          const updatedData = data.filter(
            (item) => item._id !== selectedCaseId
          );
          setData(updatedData);
          setFilteredData(updatedData);
        } else {
          toast.error("Failed to delete case");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the case");
      } finally {
        setShowConfirmDialog(false);
        setSelectedCaseId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setSelectedCaseId(null);
  };

  const totalItems = filteredData?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <div className="d-lg-flex justify-content-between align-items-center mb-sm-7 mb-4">
        <SearchBar placeholder="Search" onSearch={handleSearch} />
        <button
          className="btn btn-primary ms-3"
          onClick={() => navigate("/patients/cases/create")}
        >
          Add New Case
        </button>
      </div>
      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table ">
            <thead>
              <tr>
                <th>CASE ID</th>
                <th>PATIENT</th>
                <th>DOCTOR</th>
                <th>CASE DATE</th>
                <th>CASE FEE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="badge bg-light-info">{item.caseId}</div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-column">
                        <a href="#">{item.patientId.firstName}</a>
                        <span>{item.patientId.emailAddress}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-column">
                        <a href="#">{item.doctorId.firstName}</a>
                        <span>{item.doctorId.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="badge bg-light-info">{item.caseDate}</div>
                  </td>
                  <td>
                    <div className="">{item.fee}</div>
                  </td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="border-0 bg-transparent"
                      onClick={() =>
                        navigate(`/patients/cases/edit/${item._id}`, {
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
      </div>
      <ConfirmDialog
        show={showConfirmDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this case?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        btnTxt1="Cancel"
        btnTxt2="Delete"
      />
    </div>
  );
};

export default Cases;
