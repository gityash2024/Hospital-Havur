// import React, { useState, useEffect } from "react";
// import { Table, Button, Dropdown, Modal, Form } from "react-bootstrap";
// import { FaEdit, FaTrash, FaFilter } from "react-icons/fa";
// import { BsSearch } from "react-icons/bs";
// import TablePagination from "../common/TablePagination"; // Assuming you have implemented this component
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import ConfirmDialog from "../common/ConfirmDialog"; // Import the ConfirmDialog component
// import { postApi } from "../services/api";

// // Define the type for bed types
// interface BedType {
//   id: number;
//   name: string;
//   description?: string;
// }

// const BedTypeListing = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
//   const [modalShow, setModalShow] = useState(false);
//   const [confirmDialogShow, setConfirmDialogShow] = useState(false); // State for confirmation dialog
//   const [bedTypes, setBedTypes] = useState<BedType[]>([]); // Initialize with empty array for now
//   const [formData, setFormData] = useState<BedType>({
//     id: 0,
//     name: "",
//     description: "",
//   });
//   const [sortKey, setSortKey] = useState<keyof BedType>("name");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [displayedItems, setDisplayedItems] = useState<BedType[]>([]); // Initialize with empty array initially
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [selectedBedTypeId, setSelectedBedTypeId] = useState<number | null>(
//     null
//   ); // State to store the selected bed type ID

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate fetching bed types from API initially
//     setDisplayedItems([
//       {
//         id: 1,
//         name: "General Ward",
//         description: "Standard ward with basic amenities",
//       },
//       {
//         id: 2,
//         name: "Private Ward",
//         description: "Private room with personal amenities",
//       },
//       {
//         id: 3,
//         name: "ICU",
//         description: "Intensive Care Unit for critical patients",
//       },
//       {
//         id: 4,
//         name: "Pediatric Ward",
//         description: "Ward specialized for pediatric care",
//       },
//       {
//         id: 5,
//         name: "Maternity Ward",
//         description: "Ward for maternity and childbirth",
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

//     // API integration for adding/updating bed type
//     // Uncomment this section and integrate with actual API

//     try {
//       const response = await postApi("hospital/bed-types/add", formData);
//       if (formData.id) {
//         // Update existing bed type in state
//         const updatedBedTypes = bedTypes.map((item) =>
//           item.id === formData.id ? formData : item
//         );
//         setBedTypes(updatedBedTypes);
//         toast.success(`Bed type updated successfully`);
//       } else {
//         // Add new bed type to state
//         setBedTypes([...bedTypes, response.data]);
//         toast.success(`Bed type added successfully`);
//       }
//     } catch (error) {
//       toast.error("Error: ${error.message}");
//     }

//     // Simulate success message for now
//     toast.success(`Bed type ${formData.id ? "updated" : "added"} successfully`);
//     setModalShow(false);

//     // Simulate updating displayed items after addition/update
//     if (formData.id) {
//       const updatedItems = displayedItems.map((item) =>
//         item.id === formData.id ? formData : item
//       );
//       setDisplayedItems(updatedItems);
//     } else {
//       setDisplayedItems([
//         ...displayedItems,
//         { ...formData, id: displayedItems.length + 1 },
//       ]);
//     }
//   };

//   const handleSort = (key: keyof BedType) => {
//     const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
//     setSortKey(key);
//     setSortOrder(order);

//     const sortedItems = [...displayedItems].sort((a, b) => {
//       const aValue = a[key] ?? ""; // Use nullish coalescing to handle undefined
//       const bValue = b[key] ?? "";

//       if (order === "asc") {
//         return aValue > bValue ? 1 : -1;
//       } else {
//         return aValue < bValue ? 1 : -1;
//       }
//     });

//     setDisplayedItems(sortedItems);
//   };

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleItemsPerPageChange = (newItemsPerPage: number) => {
//     setItemsPerPage(newItemsPerPage);
//   };

//   const handleEditBedType = (bedType: BedType) => {
//     setFormData({
//       id: bedType.id,
//       name: bedType.name,
//       description: bedType.description ?? "",
//     });
//     setModalShow(true);
//   };

//   const handleDeleteBedType = (bedTypeId: number) => {
//     setSelectedBedTypeId(bedTypeId);
//     setConfirmDialogShow(true);
//   };

//   const confirmDelete = async () => {
//     // API integration for deleting bed type
//     // Uncomment this section and integrate with actual API
//     /*
//     try {
//       await postApi(`/hospital/bed-types/${selectedBedTypeId}`, { method: 'DELETE' });
//       toast.success('Bed type deleted successfully');
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     }
//     */

//     // Simulate success message
//     toast.success("Bed type deleted successfully");

//     // Simulate removing bed type from displayed items
//     setDisplayedItems(
//       displayedItems.filter((item) => item.id !== selectedBedTypeId)
//     );
//     setConfirmDialogShow(false);
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = displayedItems.slice(indexOfFirstItem, indexOfLastItem);

//   const filteredItems = currentItems.filter((item) =>
//     Object.values(item).some(
//       (value) =>
//         typeof value === "string" &&
//         value.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

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
//               <Dropdown.Item onClick={() => handleSort("name")}>
//                 Sort by Bed Type
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//           <Button
//             type="button"
//             className="btn btn_style"
//             variant="outline-primary"
//             onClick={() => {
//               setModalShow(true);
//               setFormData({ id: 0, name: "", description: "" }); // Reset form data when adding new bed type
//             }}
//           >
//             New Bed Type
//           </Button>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <Table hover className="admin_table mt-4">
//           <thead>
//             <tr>
//               <th onClick={() => handleSort("name")}>Bed Type</th>
//               <th className="text-end">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredItems.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.name}</td>
//                 <td className="text-end">
//                   <button
//                     type="button"
//                     className="border-0 bg-transparent"
//                     onClick={() => handleEditBedType(item)}
//                   >
//                     <span className="edit text-primary">
//                       <FaEdit />
//                     </span>
//                   </button>
//                   <button
//                     type="button"
//                     className="border-0 bg-transparent"
//                     onClick={() => handleDeleteBedType(item.id)}
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

//       <Modal show={modalShow} onHide={() => setModalShow(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {formData.id ? "Edit Bed Type" : "Add New Bed Type"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleFormSubmit}>
//             <Form.Group controlId="formBedTypeName">
//               <Form.Label>Bed Type Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleFormChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formBedTypeDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleFormChange}
//               />
//             </Form.Group>
//             <Button variant="outline-primary" type="submit" id="dropdown-basic">
//               {formData.id ? "Update" : "Add"}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       <ConfirmDialog
//         show={confirmDialogShow}
//         title="Confirm Delete"
//         message="Are you sure you want to delete this bed type?"
//         onConfirm={confirmDelete}
//         onCancel={() => setConfirmDialogShow(false)}
//         btnTxt2="Delete"
//         btnTxt1="Cancel"
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default BedTypeListing;

import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import SearchBar from "../searchBar";
import TablePagination from "../common/TablePagination";
import { useNavigate } from "react-router-dom";
import { postApi } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";

interface bedType {
  _id: any;
  bedType: any;
}

const BedTypeListing = () => {
  const [data, setData] = useState<bedType[]>([]);
  const [filteredData, setFilteredData] = useState<bedType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBedTypeListingData = async () => {
      const response = await postApi("hospital/bed_type/list", {});
      if (response.status === 200) {
        setData(response.data.data.bedType);
        setFilteredData(response.data.data.bedType);
      }
    };

    fetchBedTypeListingData();
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
      item.bedType.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await postApi("hospital/bed_type/remove", {
        id,
      });
      if (response.status === 200) {
        toast.success("Bed Type deleted successfully");
        const updatedData = data.filter((item) => item._id !== id);
        setData(updatedData);
        setFilteredData(updatedData);
      } else {
        toast.error("Failed to delete BedType");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the Bed Type");
    }
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
          onClick={() => navigate("/bedtypes/create")}
        >
          Add New Bed Type
        </button>
      </div>
      <div className="table-container">
        <div className="table-responsive table-scrollable mb-2">
          <Table hover className="admin_table ">
            <thead>
              <tr>
                <th>BED TYPE</th>
                <th className="text-end">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      {item.bedType}
                    </div>
                  </td>

                  <td className="text-end">
                    <button
                      className="border-0 bg-transparent"
                      onClick={() =>
                        navigate(`/bedtypes/edit/${item._id}`, {
                          state: { item },
                        })
                      }
                    >
                      <span className="edit text-primary">
                        <FaEdit />
                      </span>
                    </button>
                    <button
                      className="border-0 bg-transparent"
                      onClick={() => handleDelete(item._id)}
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
    </div>
  );
};

export default BedTypeListing;
