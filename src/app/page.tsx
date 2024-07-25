"use client";
import React, { useState } from "react";
import SearchSection from "@/components/SearchSection";
import TemplateList from "@/components/TemplateList";
import SideNav from "@/components/SideNav";
import Header from "@/components/Header";

const DashboardPage = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>();
  return (
    <div>
      <div className="bg-slate-200 h-screen">
      <div className="md:w-64 hidden md:block fixed">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
      {/* Search Section */}
      <SearchSection
        onSearchInput={(value: string) => setUserSearchInput(value)}
        />

      {/* template list section */}
      <TemplateList userSearchInput={userSearchInput} />
      </div>
    </div>
    </div>
  );
};

export default DashboardPage;
