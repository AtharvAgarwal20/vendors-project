"use client";

import { VendorFormData } from "@/app/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

const VendorsList = () => {
  const [vendors, setVendors] = useState<VendorFormData[] | null>(null);

  useEffect(() => {
    axios
      .get("/api/vendors")
      .then((res) => {
        setVendors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>VendorsList</div>;
};

export default VendorsList;
