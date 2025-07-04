import { VendorFormData } from "@/app/utils/types";
import axios from "axios";
import Link from "next/link";

type VendorItemProps = {
  vendor: VendorFormData;
};

const VendorItem = ({ vendor }: VendorItemProps) => {
  const {
    name,
    bankAccNo,
    bankName,
    addressLine1,
    addressLine2,
    city,
    country,
    id,
    zipCode,
  } = vendor;

  const deleteVendorItem = () => {
    axios
      .delete("/api/vendors", {
        data: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>{name}</p>
      <p>{bankName}</p>
      <p>{bankAccNo}</p>
      <p>{addressLine1}</p>
      <p>{addressLine2}</p>
      <p>{city}</p>
      <p>{country}</p>
      <p>{zipCode}</p>
      <p>{id}</p>
      <button onClick={deleteVendorItem}>Delete</button>
      <Link href={`/vendors/${id}/edit`}>Edit</Link>
    </div>
  );
};

export default VendorItem;
