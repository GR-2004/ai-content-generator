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
      {/* Search Section */}
      <SearchSection
        onSearchInput={(value: string) => setUserSearchInput(value)}
      />

      {/* template list section */}
      <TemplateList userSearchInput={userSearchInput} />
    </div>
  );
};

export default DashboardPage;
