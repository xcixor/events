import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/auth/utils";

export default async function Dashboard() {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId) {
    redirect("/");
  }
  return (
    <div>
      <p>Dashboard</p>
    </div>
  );
}
