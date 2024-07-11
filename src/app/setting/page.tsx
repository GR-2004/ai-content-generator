import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

function Settings() {
  return (
    <div className="bg-slate-200 h-screen">
      <div className="md:w-64 hidden md:block fixed">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="flex  h-full items-center justify-center pt-5">
          <UserProfile routing="hash" />
        </div>
      </div>
    </div>
  );
}

export default Settings;
