import { VendorFormData } from "@/app/utils/types";
import axios from "axios";
import Link from "next/link";

import styles from "./vendors.module.scss";

type VendorItemProps = {
  vendor: VendorFormData;
};

const VendorItem = ({ vendor }: VendorItemProps) => {
  const {
    name,
    bankAccNo,
    bankName,
    id,
    // addressLine1,
    // addressLine2,
    // city,
    // country,
    // zipCode,
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
    <div className={styles.vendorItem}>
      <p>Name: {name}</p>
      <p>Bank Name: {bankName}</p>
      <p>Bank Account Number: {bankAccNo}</p>
      <button onClick={deleteVendorItem}>Delete</button>
      <Link href={`/vendors/${id}/edit`}>Edit</Link>
    </div>
  );
};

export default VendorItem;
