import VendorsList from "@/app/components/VendorsList/VendorsList";
import { auth } from "@/auth";

import styles from "./styles.module.scss";

const page = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  return (
    <div>
      <h1 className={styles.heading}>{session.user?.name}&apos;s Vendors</h1>
      <VendorsList />
    </div>
  );
};

export default page;
