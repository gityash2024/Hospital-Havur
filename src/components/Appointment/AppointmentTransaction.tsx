import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import TablePagination from "../common/TablePagination";
// import "../../Styles/app.css";
import { BsSearch } from "react-icons/bs";

const initialData = [
  {
    id: 1,
    doctor: {
      name: "Dr. Jane Smith",
      email: "jane@example.com",
      image: "/path/to/doctor/image.jpg",
    },
    patient: {
      name: "Dr. Jane Smith",
      email: "jane@example.com",
      image: "/path/to/doctor/image.jpg",
    },
    amount: "$300",
    date: "2024-05-10",
    payment_mode: "",
    create_date: "",
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

const AppointmentTransaction = () => {
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

  // const handleFilter = (filterValues: any) => {
  //   // Filter the data based on the filterValues
  //   const filteredData = data.filter((item) => {
  //     return item.doctor
  //       .toLowerCase()
  //       .includes(filterValues.patientName.toLowerCase());
  //   });

  //   // Update the state with the filtered data
  //   setData(filteredData);
  //   setCurrentPage(1);
  // };

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(true);
  };

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
              <th>PATIENT</th>
              <th>DOCTOR</th>
              <th>APPOINTMENT DATE</th>
              <th>PAYMENT MODE</th>
              <th>AMOUNT</th>
              <th>CREATED ON</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="image image-circle image-mini me-3">
                      <a href="#">
                        <div className="table_img">
                          {/* <img src={item.doctor.image} alt="Nav Image" /> */}
                          <img src="/image/nav_img.svg" alt="Nav Image1" />
                        </div>
                      </a>
                    </div>
                    <div className="d-flex flex-column">
                      <a href="#">{item.patient.name}</a>
                      <span>{item.patient.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="image image-circle image-mini me-3">
                      <a href="#">
                        <div className="table_img">
                          {/* <img src={item.doctor.image} alt="Nav Image" /> */}
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
                    {formatDate(item.date)}
                  </div>
                </td>
                <td> {item.payment_mode}</td>
                <td> {item.amount}</td>
                <td>
                  {" "}
                  <div className="badge bg-light-info">
                    {formatDate(item.date)}
                  </div>
                </td>
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

export default AppointmentTransaction;
