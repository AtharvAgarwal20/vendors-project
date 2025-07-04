"use client";

import VendorForm from "@/app/components/VendorForm/VendorForm";
import { VendorFormData } from "@/app/utils/types";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// type EditVendorPageProps = {
//   params: { id: string };
// };

const EditVendorPage = () => {
  // const { id } = params;
  const params = useParams();
  const id = params.id as string;
  const [vendorData, setVendorData] = useState<VendorFormData | null>(null);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    if (parseInt(id)) {
      axios
        .get(`/api/vendors/edit?id=${id}`)
        .then((res) => {
          setVendorData(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          setErrors("Vendor not found");
        });
    }
  }, [id]);

  if (errors) {
    return <div>{errors}</div>;
  }

  if (vendorData) {
    return (
      <div>
        <VendorForm
          url={`/api/vendors/edit?id=${id}`}
          method="put"
          name={vendorData?.name}
          bankAccNo={vendorData?.bankAccNo}
          bankName={vendorData?.bankName}
          addressLine1={vendorData?.addressLine1}
          addressLine2={vendorData?.addressLine2 || ""}
          city={vendorData?.city || ""}
          country={vendorData?.country || ""}
          zipCode={vendorData?.zipCode || ""}
          id={parseInt(id)}
        />
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default EditVendorPage;
