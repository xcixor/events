"use client";
import UserButton from "./UserButton";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "../Logo";
import { SessionUser } from "@/lib/auth/utils";
import Notifications from "./Notifications";
import { Role } from "@prisma/client";

interface Props {
  user: SessionUser | null;
}

export default function NavbarRoutes({ user }: Props) {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const isAdminPage = pathname?.includes("/admin");
  const isBrowsePage = pathname === "/browse";
  const isDashboard = pathname?.includes("/dashboard");

  return (
    <>
      <div className="flex-1 md:block">
        <div className="flex w-full justify-between gap-x-2 align-middle">
          <Link href="/">
            <Logo />
          </Link>

          {!isDashboard && (
            <ul className="flex items-center">
              <li className="">
                <Link
                  href="/previous-events"
                  className="text-xl font-semibold text-pes-red"
                >
                  PES Events
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-x-2 ">
        {user?.role === Role.ADMIN && isAdminPage ? (
          <Link href="/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        ) : user?.role === Role.ADMIN ? (
          <Link href="/dashboard/admin/users">
            <Button size="sm" variant="outline" className="h-auto py-2">
              Admin Mode
            </Button>
          </Link>
        ) : null}

        {/* <UserButton user={user} /> */}
      </div>
    </>
  );
}
