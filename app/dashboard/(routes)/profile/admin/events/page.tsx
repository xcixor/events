import { redirect } from "next/navigation";
import { DataTable } from "@/components/admin/events/DataTable";
import { columns } from "@/components/admin/events/Columns";
import { getLoggedInUser } from "@/lib/auth/utils";
import { Role } from "@prisma/client";
import { getEventsWithImageData } from "@/actions/get-events-with-image-data";
const page = async () => {
  const user = await getLoggedInUser();
  const userId = user?.id;

  if (!userId || !(user.role === Role.ADMIN)) {
    return redirect("/");
  }
  const eventsWithUserData = await getEventsWithImageData();

  return (
    <div className="p-6">
      <DataTable columns={columns} data={eventsWithUserData} />
    </div>
  );
};

export default page;
