import Category from "@/components/icons/category";
import Logs from "@/components/icons/clipboard";
import Templates from "@/components/icons/cloud_download";
import Home from "@/components/icons/home";
import Payment from "@/components/icons/payment";
import Settings from "@/components/icons/settings";
import Workflows from "@/components/icons/workflows";
import UserManagement from "@/components/icons/userManagement";

export const adminMenuOptions = [
  { name: "Dashboard", Component: Home, href: "/admin/dashboard/home" },
  { name: "Features", Component: Workflows, href: "/admin/dashboard/features" },
  {
    name: "Manage Users",
    Component: UserManagement,
    href: "/admin/dashboard/userManagement",
  },
  { name: "Settings", Component: Settings, href: "/dashboard/settings" },
  { name: "Connections", Component: Category, href: "/connections" },
  { name: "Billing", Component: Payment, href: "/billing" },
  { name: "Templates", Component: Templates, href: "/templates" },
  { name: "Logs", Component: Logs, href: "/logs" },
];

export const userMenuOptions = [
  { name: "Dashboard", Component: Home, href: "/user/dashboard/home" },
  {
    name: "Workflows",
    Component: Workflows,
    href: "/user/dashboard/workflows",
  },
  {
    name: "Connections",
    Component: Category,
    href: "/user/dashboard/connections",
  },
  {
    name: "Templates",
    Component: Templates,
    href: "/user/dashboard/templates",
  },
  { name: "Logs", Component: Logs, href: "/user/logs" },
];

export const guestMenuOptions = [
  { name: "Dashboard", Component: Home, href: "/guest/home" },
];
