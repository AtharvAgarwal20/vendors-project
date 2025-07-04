import VendorForm from "@/app/components/VendorForm/VendorForm";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  return <VendorForm url="/api/vendors" method="post" />;
};

export default page;
