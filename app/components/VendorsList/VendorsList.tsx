"use client";

import { VendorFormData } from "@/app/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import VendorItem from "./VendorItem";

const VendorsList = () => {
  const [vendors, setVendors] = useState<VendorFormData[] | null>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/vendors?page=${page}&limit=3`)
      .then((res) => {
        setVendors(res.data.vendors);
        setMaxPages(res.data.totalPages);
      })
      .catch((err) => {
        setErrors(err?.response?.data?.error);
      });
  }, [page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
  };

  if (errors) return <div>{errors}</div>;
  if (vendors && vendors?.length > 0) {
    return (
      <div>
        {vendors.map((vendor) => {
          return <VendorItem key={vendor.id} vendor={vendor} />;
        })}
        <div>
          <button
            style={page === 1 ? { opacity: 0, pointerEvents: "none" } : {}}
            onClick={handlePrevPage}
          >
            Prev
          </button>
          <span>
            Page {page} of {maxPages}
          </span>
          <button
            style={
              page === maxPages ? { opacity: 0, pointerEvents: "none" } : {}
            }
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
  return <div>Loading data...</div>;
};

export default VendorsList;
