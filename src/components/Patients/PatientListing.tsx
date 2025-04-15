import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FaFilter, FaEye } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import TablePagination from "../../components/tablePagination";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../components/services/api";
import FilterDropdown from "./FilterDropdown";
import NoDataFound from "../common/NoDataFound";

interface Patient {
  lastName: string;
  firstName: string;
  _id: string;
  name?: string; // name can be optional
  emailAddress: string;
  mobileNumber: string;
  birthDate: string;
  gender: string;
}

const PatientListing: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Patient[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] =
    useState<boolean>(false);
  const [sortKey, setSortKey] = useState<string>("");

  // Fetch patients data on component mount
  useEffect(() => {
    const fetchPatientsData = async () => {
      try {
        const response = await postApi("hospital/patient/list", {});
        if (response.status === 200) {
          setData(response.data.data.patient);
          console.log("Fetched patients data:", response.data.data.patient);
        } else {
          console.error("Failed to fetch patients data");
        }
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };

    fetchPatientsData();
  }, []);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  // Handle filtering by patient first name
  const handleFilter = (filterValues: { patientFirstName: string }) => {
    const filteredData = data.filter(
      (item) =>
        item.firstName &&
        item.firstName
          .toLowerCase()
          .includes(filterValues.patientFirstName.toLowerCase())
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle sorting
  const handleSort = (sortKey: string) => {
    setSortKey(sortKey);
    let sortedData = [...data];
    if (sortKey === "date") {
      sortedData.sort(
        (a, b) =>
          new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime()
      );
    } else if (sortKey === "name") {
      sortedData.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }
    setData(sortedData);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filter data based on search term
  const filteredData = data.filter(
    (item) =>
      item.firstName &&
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredData.slice(startIndex, endIndex);

  // Toggle filter dropdown visibility
  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  // Handle click outside to close filter dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest(".dropdown")
      ) {
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
          <input
            type="text"
            placeholder="Search by First Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="d-flex justify-content-end flex-wrap">
          <Dropdown
            show={isFilterDropdownOpen}
            onToggle={toggleFilterDropdown}
            className="mx-3"
          >
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              <FaFilter />
            </Dropdown.Toggle>
            {isFilterDropdownOpen && <FilterDropdown onSort={handleSort} />}
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              Action
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <button
                  type="button"
                  onClick={() => navigate("/patients/create")}
                >
                  New Patient
                </button>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">Export to Excel</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Phone</th>
                <th>Birth Date</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.length === 0 ? (
                <NoDataFound colSpan={5} />
              ) : (
                displayedItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="image image-circle image-mini me-3">
                          <a href="#">
                            <div className="table_img">
                              <img
                                src="https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg"
                                alt="Nav Image1"
                              />
                            </div>
                          </a>
                        </div>
                        <div className="d-flex flex-column">
                          <a href="#">
                            {item.firstName} {item.lastName}
                          </a>
                          <span>{item.emailAddress}</span>
                        </div>
                      </div>
                    </td>
                    <td>{item.mobileNumber}</td>
                    <td>{item.birthDate}</td>
                    <td>
                      <span>{item.gender}</span>
                    </td>
                    <td>
                      <div className="action_icn">
                        <button
                          type="button"
                          className="border-0 bg-transparent"
                          onClick={() =>
                            navigate(`/patients/view/${item._id}`, {
                              state: { item },
                            })
                          }
                        >
                          <span className="view">
                            <FaEye />
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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

export default PatientListing;
