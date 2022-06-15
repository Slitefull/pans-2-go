import { ReactNode } from "react";
import { TFunction } from "i18next";
import MyAccountIcon from "@/ui-kit/customized-icons/my-account/my-account.component";
import DashboardIcon from "@/ui-kit/customized-icons/dashboard/dashboard.component";
import ReservationsIcon from "@/ui-kit/customized-icons/reservations/reservations.component";
import CustomersIcon from "@/ui-kit/customized-icons/customers/customers.component";
import CarsIcon from "@/ui-kit/customized-icons/cars/cars.component";
import SettingsIcon from "@/ui-kit/customized-icons/settings/settings.component";


interface Option {
  name: string;
  label: string;
  link: string;
  icon: ReactNode;
}

export const sidebarMenuOptions = (t: TFunction, activeElement: string): Array<Option> => [
  {
    name: "myAccount",
    label: t("admin.myAccount"),
    link: "/profile",
    icon: <MyAccountIcon color={activeElement === "myAccount" ? "#FFFFFF" : "#909090"}/>
  },
  {
    name: "dashboard",
    label: t("admin.dashboard"),
    link: "/",
    icon: <DashboardIcon color={activeElement === "dashboard" ? "#FFFFFF" : "#909090"}/>,
  },
  {
    name: "reservations",
    label: t("admin.reservations"),
    link: "/reservations",
    icon: <ReservationsIcon color={activeElement === "reservations" ? "#FFFFFF" : "#909090"}/>,
  },
  {
    name: "customers",
    label: t("admin.customers"),
    link: "/customers",
    icon: <CustomersIcon color={activeElement === "customers" ? "#FFFFFF" : "#909090"}/>,
  },
  {
    name: "cars",
    label: t("admin.cars"),
    link: "/cars",
    icon: <CarsIcon color={activeElement === "cars" ? "#FFFFFF" : "#909090"}/>,
  },
  // {
  //   name: "settings",
  //   label: t("admin.settings"),
  //   link: "/settings",
  //   icon: <SettingsIcon color={activeElement === "settings" ? "#FFFFFF" : "#909090"}/>,
  // },
];
