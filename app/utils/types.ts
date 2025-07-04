export type VendorFormData = {
  id?: number;
  name: string;
  bankAccNo: string;
  bankName: string;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  zipCode?: string;
};

export type FormFields = {
  name: keyof VendorFormData;
  label: string;
};
