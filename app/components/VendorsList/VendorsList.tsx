"use client";

import { VendorFormData } from "@/app/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import VendorItem from "./VendorItem";

const VendorsList = () => {
  const [vendors, setVendors] = useState<VendorFormData[] | null>(null);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/vendors")
      .then((res) => {
        setVendors(res.data);
      })
      .catch((err) => {
        setErrors(err?.response?.data?.error);
      });
  }, []);

  if (errors) return <div>{errors}</div>;
  if (vendors && vendors?.length > 0) {
    return (
      <div>
        {vendors.map((vendor) => {
          return <VendorItem key={vendor.id} vendor={vendor} />;
        })}
      </div>
    );
  }
};

export default VendorsList;
