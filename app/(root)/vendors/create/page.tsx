import VendorForm from "@/app/components/VendorForm/VendorForm";

const page = () => {
  return <VendorForm url="/api/vendors" method="post" />;
};

export default page;
