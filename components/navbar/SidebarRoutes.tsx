"use client";

import {
  BarChart,
  Compass,
  Layout,
  List,
  FolderCheck,
  Users2,
  Library,
  UserCogIcon,
  GraduationCap,
  Users,
  Album,
  FileEditIcon,
  File,
  FileEdit,
  Briefcase,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./SidebarItem";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },

  {
    icon: Album,
    label: "Events History",
    href: "/previous-events",
  },
];

const adminRoutes = [
  {
    icon: Briefcase,
    label: "Events",
    href: "/dashboard/profile/admin/events",
  },
];

export default function SidebarRoutes() {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const isAdminPage = pathname?.includes("/admin");

  const routes = isAdminPage ? adminRoutes : guestRoutes;

  return (
    <div className="flex w-full flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}
