// import React, { useState, useEffect } from "react";
// import { Table, Dropdown, Modal, Button, Form } from "react-bootstrap";
// import { FaEdit, FaTrash, FaFilter, FaEye } from "react-icons/fa";
// import { BsSearch } from "react-icons/bs";
// import TablePagination from "../common/TablePagination"; // Assuming you have a pagination component
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// // Define the type for bed types
// interface BedType {
//   id: number;
//   name: string;
// }

// const BedListing = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
//   const [modalShow, setModalShow] = useState(false);
//   const [bedTypes, setBedTypes] = useState<BedType[]>([]);
//   const [formData, setFormData] = useState({
//     bed: "",
//     bedType: "",
//     charge: "",
//     description: "",
//   });
//   const [sortKey, setSortKey] = useState<string>("");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [displayedItems, setDisplayedItems] = useState<any[]>([]); // Initialize with empty array
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10); // Initial items per page

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Initialize displayedItems with your static data
//     setDisplayedItems([
//       {
//         bedId: "ZWPUAO4M",
//         bed: "Test Dev Bed",
//         bedType: "Test Dev",
//         charge: "$5,000.00",
//         available: "Yes",
//       },
//       {
//         bedId: "YX2SV2HW",
//         bed: "AB",
//         bedType: "ABC",
//         charge: "$1,200.00",
//         available: "Yes",
//       },
//       {
//         bedId: "YTELGJZN",
//         bed: "Nathaniel Estrada",
//         bedType: "Female general ward",
//         charge: "$1,456.00",
//         available: "Yes",
//       },
//       {
//         bedId: "YSVY2Q43",
//         bed: "Testy",
//         bedType: "Female general ward",
//         charge: "$15,020.00",
//         available: "Yes",
//       },
//       {
//         bedId: "YS2RGL2L",
//         bed: "Bed NK",
//         bedType: "Cama VIP",
//         charge: "$250,000.00",
//         available: "Yes",
//       },
//       {
//         bedId: "YMER6NUY",
//         bed: "7",
//         bedType: "IPD TEST BED",
//         charge: "$77.00",
//         available: "Yes",
//       },
//       {
//         bedId: "YEWK0WNA",
//         bed: "Test",
//         bedType: "Bed 1",
//         charge: "$120.00",
//         available: "No",
//       },
//     ]);
//   }, []);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const toggleFilterDropdown = () => {
//     setFilterDropdownOpen(!isFilterDropdownOpen);
//   };

//   const handleFormChange = (
//     event: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       // Placeholder for API integration
//       /*
//       const response = await postApi('hospital/beds/add', formData);
//       if (response.status === 200) {
//         toast.success(response.data.message);
//         setModalShow(false);
//         navigate('/beds');

//         // Replace with API response data structure if necessary
//         setDisplayedItems([...displayedItems, {
//           bedId: response.data.id,
//           bed: formData.bed,
//           bedType: formData.bedType,
//           charge: formData.charge,
//           available: 'Yes' // Assuming newly added beds are available
//         }]);
//       } else {
//         const error = response.response.data.error;
//         for (const er in error) {
//           toast.error(error[er]);
//         }
//       }
//       */

//       // Simulate success message for now
//       toast.success("Bed added successfully");
//       setModalShow(false);
//       // navigate('/beds');

//       // Simulate updating displayed items after addition
//       setDisplayedItems([
//         ...displayedItems,
//         {
//           bedId: `NEW${Math.random().toString(36).substr(2, 9)}`, // Generate a temporary ID
//           bed: formData.bed,
//           bedType: formData.bedType,
//           charge: formData.charge,
//           available: "Yes",
//         },
//       ]);
//     } catch (error) {
//       toast.error("An error occurred while adding the bed");
//       console.error("Error adding bed:", error);
//     }
//   };

//   const handleSort = (key: string) => {
//     if (sortKey === key) {
//       // Toggle sort order if same key is clicked
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       // Set new sort key and default to ascending order
//       setSortKey(key);
//       setSortOrder("asc");
//     }

//     // Perform sorting based on key and order
//     const sortedItems = [...displayedItems].sort((a, b) => {
//       const aValue =
//         key === "charge" ? parseFloat(a[key].replace(/[$,]/g, "")) : a[key];
//       const bValue =
//         key === "charge" ? parseFloat(b[key].replace(/[$,]/g, "")) : b[key];

//       if (sortOrder === "asc") {
//         return aValue > bValue ? 1 : -1;
//       } else {
//         return aValue < bValue ? 1 : -1;
//       }
//     });

//     // Update displayed items with sorted array
//     setDisplayedItems(sortedItems);
//   };

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleItemsPerPageChange = (newItemsPerPage: number) => {
//     setItemsPerPage(newItemsPerPage);
//   };

//   const handleViewBed = (bedId: string) => {
//     // Implement view bed logic
//     alert(`View Bed with ID: ${bedId}`);
//   };

//   const handleEditBed = (bedId: string) => {
//     // Implement edit bed logic
//     alert(`Edit Bed with ID: ${bedId}`);
//   };

//   const handleDeleteBed = (bedId: string) => {
//     // Implement delete bed logic
//     alert(`Delete Bed with ID: ${bedId}`);
//   };

//   // Calculate pagination values
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = displayedItems.slice(indexOfFirstItem, indexOfLastItem);

//   // Filter items based on search term
//   const filteredItems = currentItems.filter((item) =>
//     Object.values(item).some(
//       (value) =>
//         typeof value === "string" &&
//         value.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   // Calculate total pages for pagination component
//   const totalPages = Math.ceil(displayedItems.length / itemsPerPage);

//   return (
//     <div>
//       <div className="d-lg-flex justify-content-between align-items-center mb-sm-7 mb-4">
//         <div className="body_search">
//           <BsSearch />
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </div>
//         <div className="d-flex justify-content-end flex-wrap">
//           <Dropdown
//             className="me-2"
//             show={isFilterDropdownOpen}
//             onToggle={toggleFilterDropdown}
//           >
//             <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
//               <FaFilter />
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item onClick={() => handleSort("bedId")}>
//                 Sort by Bed ID
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => handleSort("bed")}>
//                 Sort by Bed
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => handleSort("bedType")}>
//                 Sort by Bed Type
//               </Dropdown.Item>
//               <Dropdown.Item onClick={() => handleSort("charge")}>
//                 Sort by Charge
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//           <button
//             type="button"
//             className="btn btn_style"
//             onClick={() => setModalShow(true)}
//           >
//             Add Bed
//           </button>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <Table hover className="admin_table mt-4">
//           <thead>
//             <tr>
//               <th onClick={() => handleSort("bedId")}>Bed ID</th>
//               <th onClick={() => handleSort("bed")}>Bed</th>
//               <th onClick={() => handleSort("bedType")}>Bed Type</th>
//               <th onClick={() => handleSort("charge")}>Charge</th>
//               <th>Available</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredItems.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.bedId}</td>
//                 <td>{item.bed}</td>
//                 <td>{item.bedType}</td>
//                 <td>{item.charge}</td>
//                 <td>
//                   <span
//                     className={`badge bg-${
//                       item.available === "Yes" ? "success" : "danger"
//                     }`}
//                   >
//                     {item.available}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     type="button"
//                     className="border-0 bg-transparent"
//                     onClick={() => handleViewBed(item.bedId)}
//                   >
//                     <span className="view text-primary">
//                       <FaEye />
//                     </span>
//                   </button>
//                   <button
//                     type="button"
//                     className="border-0 bg-transparent"
//                     onClick={() => handleEditBed(item.bedId)}
//                   >
//                     <span className="edit text-primary">
//                       <FaEdit />
//                     </span>
//                   </button>
//                   <button
//                     type="button"
//                     className="border-0 bg-transparent"
//                     onClick={() => handleDeleteBed(item.bedId)}
//                   >
//                     <span className="delete text-danger">
//                       <FaTrash />
//                     </span>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       <TablePagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         totalItems={displayedItems.length}
//         itemsPerPage={itemsPerPage}
//         startIndex={indexOfFirstItem}
//         endIndex={indexOfLastItem}
//         onPageChange={handlePageChange}
//         onItemsPerPageChange={handleItemsPerPageChange}
//       />

//       {/* Add Bed Modal */}
//       <Modal show={modalShow} onHide={() => setModalShow(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Bed</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleFormSubmit}>
//             <Form.Group className="mb-3" controlId="bed">
//               <Form.Label>Bed</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter bed name"
//                 name="bed"
//                 value={formData.bed}
//                 onChange={handleFormChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="bedType">
//               <Form.Label>Bed Type</Form.Label>
//               <Form.Select
//                 name="bedType"
//                 value={formData.bedType}
//                 onChange={handleFormChange}
//                 required
//               >
//                 <option value="">Select bed type</option>
//                 {bedTypes.map((type) => (
//                   <option key={type.id} value={type.name}>
//                     {type.name}
//                   </option>
//                 ))}
//                 <option>other</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="charge">
//               <Form.Label>Charge</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter charge"
//                 name="charge"
//                 value={formData.charge}
//                 onChange={handleFormChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="description">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 placeholder="Enter description"
//                 rows={3}
//                 name="description"
//                 value={formData.description}
//                 onChange={handleFormChange}
//               />
//             </Form.Group>
//             <Button
//               variant="outline-primary"
//               className="btn_style"
//               type="submit"
//             >
//               Add Bed
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default BedListing;

import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import SearchBar from "../searchBar";
import TablePagination from "../common/TablePagination";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmDialog from "../common/ConfirmDialog"; // Adjust the path as needed

interface Bed {
  available: any;
  name: any;
  charge: any;
  bedType: any;
  bedId: any;
  _id: string;
  bed: any;
}

const BedListings = () => {
  const [data, setData] = useState<Bed[]>([]);
  const [filteredData, setFilteredData] = useState<Bed[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedBedId, setselectedBedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBedListingsData = async () => {
      const response = await postApi("hospital/bed/list", {});
      if (response.status === 200) {
        setData(response.data.data.bed);
        setFilteredData(response.data.data.bed);
      }
    };

    fetchBedListingsData();
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
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleDeleteClick = (id: string) => {
    setselectedBedId(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedBedId) {
      try {
        const response = await postApi("hospital/bed/remove", {
          id: selectedBedId,
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          const updatedData = data.filter((item) => item._id !== selectedBedId);
          setData(updatedData);
          setFilteredData(updatedData);
        } else {
          toast.error("Failed to delete Bed");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the Bed");
      } finally {
        setShowConfirmDialog(false);
        setselectedBedId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setselectedBedId(null);
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
          onClick={() => navigate("/bed/create")}
        >
          Add New Bed
        </button>
      </div>
      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table ">
            <thead>
              <tr>
                <th>BED ID</th>
                <th>BED </th>
                <th>BED TYPE</th>
                <th>CHARGE</th>
                <th>AVAILABILITY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="badge bg-light-info">{item.bedId}</div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-column">
                        <span>{item.name}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-column">
                        <span>{item.bedType?.bedType}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{item.charge}</div>
                  </td>
                  <td>
                    <div className="badge bg-light-info">{item.available}</div>
                  </td>
                  <td className="">
                    <button
                      type="button"
                      className="border-0 bg-transparent"
                      onClick={() =>
                        navigate(`/bed/edit/${item._id}`, {
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

export default BedListings;
