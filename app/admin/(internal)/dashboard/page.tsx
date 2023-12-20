import { withAuth } from "@/app/actions/withAuth";
import DashboardClient from "./components/DashboardClient";

export default async function Page() {
  await withAuth();
  return <DashboardClient />;
}
