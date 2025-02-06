import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import TablePagination from "../../common/TablePagination";
import { BsSearch } from "react-icons/bs";

const initialData = [
  {
    id: 1,
    doctor: {
      name: "Dr. Jane Smith",
      email: "jane@example.com",
      image: "/path/to/doctor/image.jpg",
    },
    admission_date: "2024-05-10",
    discharge_date: "2024-05-10",      

    status: "Active",
    Action: "",
  },
];

const formatDate = (dateString: string) => {
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

const PatientAdmission = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = data.slice(startIndex, endIndex);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  const handleFilter = (filterValues: any) => {
    const filteredData = data.filter((item) => {
      return item.doctor.name.toLowerCase().includes(filterValues.patientName.toLowerCase());
    });

    setData(filteredData);
    setCurrentPage(1);
  };

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && !event.target.closest(".dropdown")) {
        setIsFilterDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="d-lg-flex justify-content-between align-items-center mb-sm-7 mb-4">
        <div className="body_search">
          <BsSearch />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="table-responsive">
        <Table hover className="admin_table mt-4">
          <thead>
            <tr>
              <th>ADMISSION ID</th>
              <th>DOCTOR</th>
              <th>ADMISSION DATE</th>
              <th>DISCHARGE DATE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.length > 0 ? (
              displayedItems.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      {item.id}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="image image-circle image-mini me-3">
                        <a href="#">
                          <div className="table_img">
                            <img src="/image/nav_img.svg" alt="Nav Image1" />
                          </div>
                        </a>
                      </div>
                      <div className="d-flex flex-column">
                        <a href="#">{item.doctor.name}</a>
                        <span>{item.doctor.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="badge bg-light-info">
                      {formatDate(item.admission_date)}
                    </div>
                  </td>
                  <td>
                    <div className="badge bg-light-info">
                      {formatDate(item.discharge_date)}
                    </div>
                  </td>
                  <td>
                    <span className={getStatusClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.Action}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-5">
                  <div className="d-flex flex-column align-items-center">
                  <span
                        role="img"
                        aria-label="Sad Face"
                        className="fs-1 mb-4"
                      >
                        😞
                      </span>
                    <h4>No patient admission data available</h4>
                  </div>
                </td>
              </tr>
            )}
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

export default PatientAdmission;