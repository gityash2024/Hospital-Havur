
import React from "react";
import { Dropdown } from "react-bootstrap";

interface FilterDropdownProps {
  onSort: (sortKey: SortKey) => void;
}

type SortKey = "date" | "name";

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onSort }) => {
  const handleSort = (sortKey: SortKey) => {
    onSort(sortKey);
  };

  return (
    <Dropdown.Menu show>
      <Dropdown.Item onClick={() => handleSort("date")}>Sort by Date</Dropdown.Item>
      <Dropdown.Item onClick={() => handleSort("name")}>Sort by Name</Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default FilterDropdown;
