"use client";

import { formFields } from "@/app/utils/data";
import { VendorFormData } from "@/app/utils/types";
import axios from "axios";
import React, { useState } from "react";
import TextBox from "../Inputs/TextBox";

type VendorFormProps = {
  url: string;
  method: "post" | "put" | "get";
};

const VendorForm = ({ url, method }: VendorFormProps) => {
  const [formData, setFormData] = useState<VendorFormData>({
    name: "",
    bankAccNo: "",
    bankName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    zipCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (method === "post") {
      axios
        .post(url, formData)
        .then((res) => {
          alert("Vendor Created");
        })
        .catch((err) => {
          alert(err?.response?.data?.error || "Something went wrong");
        });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <TextBox
          key={field.name}
          value={formData}
          onChange={handleChange}
          required
          name={field.name}
          label={field.label}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default VendorForm;
