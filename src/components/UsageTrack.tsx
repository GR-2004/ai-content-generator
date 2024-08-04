"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import Link from "next/link";
import axios from "axios";

const UsageTrack = () => {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const [maxWords, setMaxWords] = useState<number>(10000);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      fetchData(user);
      isUserSubscribed(user);
    }
  }, [user && updateCreditUsage]);

  const fetchData = async (user: any) => {
    try {
      const result: any = await axios.get("/api/AIOutput");
      console.log("usageTrack response: ", result.data.output);
      if (!result) {
        return;
      }
      let total = 0;
      result.data.output.forEach((res: any) => {
        if (res.aiResponse) total += Number(res?.aiResponse.length);
      });
      setTotalUsage(total);
    } catch (error) {
      console.log(error);
    }
  };

  const isUserSubscribed = async (user: any) => {
    try {
      const email: any = user?.primaryEmailAddress?.emailAddress;

      const result = await axios.get(
        `/api/UserSubscription?email=${encodeURIComponent(email)}`
      );
      console.log(result.data.user);
      if (!result) {
        console.log("subscription not found");
        return;
      }
      console.log("user subscribed", result);
      setUserSubscription(true);
      setMaxWords(100000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-5">
      <div className="bg-primary text-white rounded-lg p-3">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: (totalUsage / maxWords) * 100 + "%" }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {totalUsage}/{maxWords} credit used
        </h2>
      </div>
      <Link href="/billing">
        <Button variant={"secondary"} className="w-full my-3 text-primary">
          Upgrade
        </Button>
      </Link>
    </div>
  );
};

export default UsageTrack;
