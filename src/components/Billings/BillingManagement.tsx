import React from "react";
import { useLocation } from "react-router-dom";
import Accounts from "./Accounts";
import EmployeePayrolls from "./EmployeePayrolls";
import Invoice from "./Invoice";
import Bills from "./Bills";
import BillTransaction from "./BillTransaction";
import Payments from "./Payments";
import PaymentReports from "./PaymentReports";
import AdvancePayments from "./AdvancePayments";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BillingManagement = () => {
  const query = useQuery();
  const tab = query.get("tab");

  return (
    <div>
      {tab === "employee-payrolls" ? (
        <EmployeePayrolls />
      ) : tab === "invoices" ? (
        <Invoice />
      ) : tab === "bills" ? (
        <Bills />
      ) : tab === "manual-billing-payments" ? (
        <BillTransaction />
      ) : tab === "payments" ? (
        <Payments />
      ) : tab === "payment-reports" ? (
        <PaymentReports />
      ) : tab === "advance-payment" ? (
        <AdvancePayments />
      ) : (
        <Accounts />
      )}
    </div>
  );
};

export default BillingManagement;
