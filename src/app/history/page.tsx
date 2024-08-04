"use client";
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import React, { useEffect, useState } from "react";
import CopyButton from "./_components/CopyButton";
import Image from "next/image";
import Templates from "@/data/Templates";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import moment from "moment";

export interface HISTORY {
  id: Number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
}

const HistoryPage = () => {
  const [historyList, setHistoryList] = useState<HISTORY[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      fetchData(user);
    }
  }, [user]);

  const fetchData = async (user: any) => {
    try {
      const response: any = await axios.get("/api/AIOutput");
      console.log(response.data.output);
      setHistoryList(response.data.output);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const GetTemplateName = (slug: string) => {
    return (
      Templates.find((template) => template.slug === slug) || {
        name: "",
        icon: "",
      }
    );
  };

  return (
    <div className="bg-slate-200 h-full">
      <div className="md:w-64 hidden md:block fixed">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="m-5 p-5 border rounded-lg bg-white">
          <h2 className="font-bold text-3xl">History</h2>
          <p className="text-gray-500">
            Search your previously generated AI content
          </p>
          <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
            <h2 className="col-span-2">TEMPLATE</h2>
            <h2 className="col-span-2">AI RESP</h2>
            <h2>DATE</h2>
            <h2>WORDS</h2>
            <h2>COPY</h2>
          </div>
          {historyList && historyList.length > 0 ? (
            historyList.map((item: HISTORY, index: number) => (
              <div key={index}>
                <div className="grid grid-cols-7 my-5 py-3 px-3 ">
                  <h2 className="col-span-2 flex gap-2 items-center">
                    <Image
                      src={GetTemplateName(item.templateSlug).icon}
                      width={25}
                      height={25}
                      alt="icon"
                    />
                    {GetTemplateName(item.templateSlug)?.name}
                  </h2>
                  <h2 className="col-span-2 line-clamp-3 mr-3">
                    {item.aiResponse}
                  </h2>
                  <h2>{moment(item.createdAt).format("DD-MM-YYYY")}</h2>
                  <h2>{item.aiResponse?.length}</h2>
                  <h2>
                    <CopyButton aiResponse={item.aiResponse} />
                  </h2>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <h1 className="text-2xl font-bold m-2">No data found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
