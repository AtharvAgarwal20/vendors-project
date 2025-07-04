import VendorsList from "@/app/components/VendorsList/VendorsList";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  return (
    <div>
      <h1>{session.user?.name}&apos;s Vendors</h1>
      <VendorsList />
    </div>
  );
};

export default page;
