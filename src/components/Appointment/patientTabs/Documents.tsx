import React, {  useState } from "react";
import Table from "react-bootstrap/Table";
import TablePagination from "../../common/TablePagination";
import { BsSearch } from "react-icons/bs";
import NoDataFound from "../../common/NoDataFound";

const initialData = [
    {
      id: 1,
      doc_type: "",
      title: "",
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


const Documents = () => {
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
              <th>DOCUMENT TYPE</th>
              <th>TITLE</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.length === 0 ? (
              <NoDataFound colSpan={2} />
            ) : (
              displayedItems.map((item, index) => (
                <tr key={item.id}>
                  <td>
                      {item.doc_type}
                  </td>
                 <td> {item.title}</td>
                </tr>
              ))
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
  )
}

export default Documents