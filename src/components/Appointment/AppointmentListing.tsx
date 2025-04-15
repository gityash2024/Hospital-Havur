import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FaEye, FaFilter } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import TablePagination from "../common/TablePagination";
import { postApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import NoDataFound from "../common/NoDataFound";

interface Appointment {
  _id: string;
  patientId: {
    lastName: string;
    firstName: string;
    name: string;
    emailAddress: string;
  } | null;
  doctorId: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  tokenNo: string;
  slotTime: string;
  status: string;
  appointmentBy: string;
  appointmentCharge: string;
}

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

const getStatusClass = (status: string): string => {
  switch (status) {
    case "true":
      return "badge bg-light-success";
    case "false":
      return "badge bg-light-danger";
    default:
      return "badge bg-light-gray";
  }
};

const AppointmentListing = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Appointment[]>([]);
  const [filteredData, setFilteredData] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  useEffect(() => {
    const fetchAppointmentList = async () => {
      try {
        const response = await postApi("hospital/appointment/list", {});
        if (response.status === 200) {
          const appointments = response.data.data.appointment.map(
            (appointment: Appointment) => ({
              ...appointment,
              patientId: appointment.patientId || {
                name: "N/A",
                emailAddress: "N/A",
              },
              doctorId: appointment.doctorId || {
                firstName: "N/A",
                lastName: "N/A",
                email: "N/A",
              },
            })
          );

          setData(appointments);
          setFilteredData(appointments); // Initialize filtered data
        } else {
          console.error("Failed to fetch appointment data");
        }
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    fetchAppointmentList();
  }, []);

  const displayedItems = filteredData.slice(startIndex, endIndex);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredItems = data.filter(
      (item) =>
        item.patientId?.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.patientId?.lastName.toLowerCase().includes(query.toLowerCase()) ||
        item.doctorId?.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.doctorId?.lastName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredItems);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div>
      <div className="d-lg-flex justify-content-between align-items-center mb-sm-7 mb-4">
        <div className="d-flex justify-content-start flex-wrap align-items-center">
          <div className="body_search">
            <BsSearch />
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search"
              value={searchQuery}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end flex-wrap">
          {/* <a href="#" className="btn btn-icon btn_style me-2">
            <BsCalendarCheck />
          </a> */}
          <Dropdown className="me-2 ">
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              Filter <FaFilter />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Sort by Date</Dropdown.Item>
              <Dropdown.Item>Sort by Patient Name</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button
            type="button"
            className="btn btn_style"
            onClick={() => navigate("/appointment/create")}
          >
            Add Appointment
          </button>
        </div>
      </div>

      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Token</th>
                <th>Charge</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.length === 0 ? (
                <NoDataFound colSpan={7} />
              ) : (
                displayedItems.map((item, index) => {
                  const rowClass =
                    item.status.toString() === "true"
                      ? "bg-light-yellow" // Add light yellow background for 'true' status
                      : item.status.toString() === "false"
                      ? "bg-light-red" // Add light red background for 'false' status
                      : "bg-light-default";
                  return (
                    <tr className=" bg-blue" key={index}>
                      <td>
                        {item.patientId ? (
                          <div className="d-flex flex-column">
                            <a href="#">
                              {item.patientId.firstName} {item.patientId.lastName}
                            </a>
                            <span>{item.patientId.emailAddress}</span>
                          </div>
                        ) : (
                          <div className="text-muted">N/A</div>
                        )}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="image image-circle image-mini me-3">
                            <a href="#">
                              <div className="table_img">
                                <img
                                  src="https://img.freepik.com/free-vector/doctor-medical-healthcare-pfrofessional-character-vector_53876-175176.jpg"
                                  alt="Nav Image"
                                />
                              </div>
                            </a>
                          </div>
                          <div className="d-flex flex-column">
                            <a href="#">
                              {item.doctorId?.firstName +
                                " " +
                                item.doctorId?.lastName || "N/A"}
                            </a>
                            <span>{item.doctorId?.email || "N/A"}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span id="tokenNo" className="fs-5 text-gray-800">
                          {item.appointmentBy === "hospital" ? (
                            <div className="badge bg-light-success">
                              {item.tokenNo}
                            </div>
                          ) : (
                            <div className="badge bg-light-info">
                              {item.tokenNo}
                            </div>
                          )}
                        </span>
                      </td>
                      <td>
                        <div className="badge bg-light-info">
                          {item.appointmentCharge ?? "N/A"}
                        </div>
                      </td>
                      {/* <td>
                      <div className="badge bg-light-info">
                        {item.appointmentCharge ?? "N/A"}
                      </div>
                    </td> */}
                      <td>
                        <div className="badge bg-light-info">
                          {item.slotTime ? formatDate(item.slotTime) : "N/A"}
                        </div>
                      </td>
                      <td>
                        <span className={getStatusClass(item.status.toString())}>
                          {item.status.toString()}
                        </span>
                      </td>
                      <td>
                        <div className="action_icn">
                          <span
                            className="view"
                            onClick={() =>
                              navigate(`/appointment/${item._id}/view`)
                            }
                          >
                            <FaEye />
                          </span>
                          {/* <span className="delete" onClick={handleDeleteClick}>
                          <FaTrash />
                        </span> */}
                        </div>
                      </td>
                    </tr>
                  );
                })
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
      </div>
    </div>
  );
};

export default AppointmentListing;
