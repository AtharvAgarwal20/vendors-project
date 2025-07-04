"use client";

import { formFields } from "@/app/utils/data";
import { frontendVendorSchema } from "@/app/utils/schemas";
import { VendorFormData } from "@/app/utils/types";
import axios from "axios";
import React, { useState } from "react";
import { ZodError } from "zod/v4";
import SubmitBtn from "../Inputs/SubmitBtn";
import TextBox from "../Inputs/TextBox";
import styles from "./form.module.scss";

type VendorFormProps = {
  url: string;
  method: "post" | "put" | "get";
  name?: string;
  bankAccNo?: string;
  bankName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  zipCode?: string;
};

const VendorForm = ({
  url,
  method,
  name = "",
  bankAccNo = "",
  bankName = "",
  addressLine1 = "",
  addressLine2 = "",
  city = "",
  country = "",
  zipCode = "",
}: VendorFormProps) => {
  const [formData, setFormData] = useState<VendorFormData>({
    name,
    bankAccNo,
    bankName,
    addressLine1,
    addressLine2,
    city,
    country,
    zipCode,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const parsedData = frontendVendorSchema.parse(formData);

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
      } else if (method === "put") {
        axios
          .put(url, parsedData)
          .then((res) => {
            alert("Vendor Updated");
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
        setErrors(error.flatten().fieldErrors);
        setIsLoading(false);
      } else {
        alert("Something went wrong");
        setIsLoading(false);
      }
    }
  };
  return (
    <main className={styles.formContainer}>
      <h1>{method === "put" ? "Edit Vendor" : "Create Vendor"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          {formFields.map(({ name, label }) => (
            <TextBox
              key={name}
              value={formData}
              onChange={handleChange}
              name={name as keyof VendorFormData}
              label={label}
              error={errors[name]?.[0]}
            />
          ))}
        </div>
        {isLoading ? <span>Loading...</span> : <SubmitBtn />}
      </form>
    </main>
  );
};

export default VendorForm;
