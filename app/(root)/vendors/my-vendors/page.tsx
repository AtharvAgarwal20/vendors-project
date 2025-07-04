import VendorsList from "@/app/components/VendorsList/VendorsList";
import { auth } from "@/auth";
import Image from "next/image";

const page = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  return (
    <div>
      <h1>{session.user?.name}'s Vendors</h1>
      <Image
        src={session.user?.image || "/pfp.jpg"}
        width={50}
        height={50}
        alt="User profile picture"
      />
      <VendorsList />
    </div>
  );
};

export default page;
