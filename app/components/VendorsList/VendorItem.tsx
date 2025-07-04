import { VendorFormData } from "@/app/utils/types";

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
    </div>
  );
};

export default VendorItem;
