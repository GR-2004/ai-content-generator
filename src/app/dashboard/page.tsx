"use client";
import React, { useState } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateList from "./_components/TemplateList";

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
