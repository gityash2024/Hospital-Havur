import React from "react";
import { useLocation } from "react-router-dom";
import BedTypesListing from "./BedTypesListing";
import BedListings from "./BedListings";
import { Tab } from "react-bootstrap";
import BedAssignListing from "./BedAssignListing";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BedManagement = () => {
  const query = useQuery();
  const tab = query.get("tab");

  return (
    <div>
      {tab === "bed" ? (
        <BedListings />
      ) : tab === "bedassign" ? (
        <BedAssignListing />
      ) : (
        <BedTypesListing />
      )}
    </div>
  );
};

export default BedManagement;
