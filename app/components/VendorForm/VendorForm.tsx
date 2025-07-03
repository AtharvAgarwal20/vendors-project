"use client";

import { formFields } from "@/app/utils/data";
import { vendorSchema } from "@/app/utils/schemas";
import { VendorFormData } from "@/app/utils/types";
import axios from "axios";
import React, { useState } from "react";
import { ZodError } from "zod/v4";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const parsedData = vendorSchema.parse(formData);

      if (method === "post") {
        axios
          .post(url, parsedData)
          .then((res) => {
            alert("Vendor Created");
          })
          .catch((err) => {
            alert(err?.response?.data?.error || "Something went wrong");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        alert("Name can only be between 3-20 characters");
      }

      alert("Something went wrong");
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
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <button type="submit">Submit</button>
      )}
    </form>
  );
};

export default VendorForm;
