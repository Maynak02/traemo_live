import Header from "@/components/header";
import React from "react";

const SupplierLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default SupplierLayout;
