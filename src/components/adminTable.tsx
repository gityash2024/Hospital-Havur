import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import TablePagination from "./tablePagination";
// import "../../Styles/app.css";
import { FaTrash, FaEye } from "react-icons/fa";
import { postApi } from "./services/api";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./model/deleteModel";

const getStatusClass = (status: string) => {
  switch (status) {
    case "Active":
      return "badge bg-light-success";
    case "Inactive":
      return "badge bg-light-danger";
    default:
      return "badge bg-light-gray";
  }
};
// Delete modal
const AdminTable = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    // Perform delete operation here
    setShowDeleteModal(false);
  };
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [doctorList, setDoctorList] = useState<any>([]);
  const totalItems = doctorList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems: any = doctorList.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  useEffect(() => {
    const getHospitalsData = async () => {
      const response: any = await postApi("hospital/doctor/list", {});
      setDoctorList(response.data.data.doctor);
    };

    getHospitalsData();
  }, []);

  console.log(doctorList);

  return (
    <div>
      <div className="table-responsive">
        <Table hover className="admin_table mt-4">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>SPECIALIST</th>
              <th>DEPARTMENT</th>
              <th>TYPE</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctorList.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="image image-circle image-mini me-3">
                      <a
                        href=""
                        onClick={() =>
                          navigate(`/doctor/${item._id}`, { state: { item } })
                        }
                      >
                        <div className="table_img">
                          <img src="/image/nav_img.svg" alt="Nav Image" />
                        </div>
                      </a>
                    </div>
                    <div className="d-flex flex-column">
                      <a href="#" className="text-decoration-none mb-1">
                        {item.firstName} {item.lastName}
                      </a>
                      <span>{item.specialization.toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td>{item.department}</td>
                <td>{item.designation}</td>
                <td>
                  <div className="badge bg-light-info">{item.type}</div>
                </td>
                <td>
                  <div className="action_icn">
                    <button
                      type="button"
                      className="border-0 bg-transparent"
                      onClick={() =>
                        navigate(`/doctor/${item._id}`, { state: { item } })
                      }
                    >
                      <span className="view">
                        <FaEye />
                      </span>
                    </button>
                    <span className="delete" onClick={handleDeleteClick}>
                      <FaTrash />
                    </span>
                  </div>
                </td>
                {showDeleteModal && (
                  <DeleteModal
                    onDelete={handleConfirmDelete}
                    onClose={handleCloseDeleteModal}
                  />
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
  );
};

export default AdminTable;
