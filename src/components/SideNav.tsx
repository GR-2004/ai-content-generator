'use client'
import Image from "next/image";
import React, { useEffect } from "react";
import {
  FileClock,
  Home,
  LayoutDashboard,
  Settings,
  WalletCards,
} from "lucide-react";
import { usePathname } from "next/navigation";

const SideNav = () => {

  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/",
    },
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/billing",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/setting",
    },
  ];

  const path = usePathname();
  useEffect(() => {

  }, [])
  return (
    <div className="h-screen p-5 shadow-sm border bg-white">
      <div className="flex justify-center">
        <Image src={"/logo.svg"} alt="logo" width={120} height={100} />
      </div>
      <hr className="my-6 border" />
      <div className="mt-3">
        {MenuList.map((menu, index) => (
          <div key={index} className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${path == menu.path && "bg-primary text-white"}`}>
            <menu.icon className="h-6 w-6" />
            <h2 className="text-lg">{menu.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
