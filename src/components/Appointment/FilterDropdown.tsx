// import React, { useState } from "react";
// import Select, { MultiValue, ActionMeta } from "react-select";

// interface FilterDropdownProps {
//   onFilter: (filter: any) => void;
//   onSort: (sortKey: SortKey) => void;
// }

// const filterOptions = [
//   { value: "option1", label: "Option 1" },
//   { value: "option2", label: "Option 2" },
//   { value: "option3", label: "Option 3" },
// ];

// type SortKey = "date" | "name";

// const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilter, onSort }) => {
//   const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

//   const handleFilterChange = (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => {
//     setSelectedOptions([...newValue]);
//     onFilter([...newValue]);
//   };

//   return (
//     <div>
//       {/* <Select
//         isMulti
//         options={filterOptions}
//         value={selectedOptions}
//         onChange={handleFilterChange}
//         placeholder="Filter by..."
//         className="basic-multi-select"
//         classNamePrefix="select"
//       /> */}
//       <div className="dropdown-divider mt-2"></div>
//       <button type="button" className="dropdown-item" onClick={() => onSort("date")}>
//         Sort by Date
//       </button>
//       <button type="button" className="dropdown-item" onClick={() => onSort("name")}>
//         Sort by Name
//       </button>
//     </div>
//   );
// };

// export default FilterDropdown;
import React from "react";
import { Dropdown } from "react-bootstrap";

interface FilterDropdownProps {
  onSort: (sortKey: SortKey) => void;
  onFilter: (filterValues: any) => void; // Add the onFilter prop
}

type SortKey = "date" | "firstName";

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  onSort,
  onFilter,
}) => {
  const handleSort = (sortKey: SortKey) => {
    onSort(sortKey);
  };

  const handleFilter = () => {
    // Implement filter logic here if needed, otherwise call onFilter directly
    const filterValues = {}; // Replace with actual filter values
    onFilter(filterValues);
  };

  return (
    <Dropdown.Menu show>
      <Dropdown.Item onClick={() => handleSort("date")}>
        Sort by Date
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleSort("firstName")}>
        Sort by Name
      </Dropdown.Item>
      {/* Add more filter options as needed */}
    </Dropdown.Menu>
  );
};

export default FilterDropdown;
