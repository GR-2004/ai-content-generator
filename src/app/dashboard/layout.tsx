import React from "react";
import SideNav from "../../components/SideNav";
import Header from "@/components/Header";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-slate-200 h-screen">
      <div className="md:w-64 hidden md:block fixed">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;