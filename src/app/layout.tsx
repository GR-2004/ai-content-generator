"use client"
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs"
import { useState } from "react";
import { TotalUsageContext } from "./(context)/TotalUsageContext";
import { UserSubscriptionContext } from "./(context)/UserSubscriptionContext";

const inter = Outfit({ subsets: ["latin"] });

 const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [totalUsage, setTotalUsage] = useState<Number>(0);
  const [userSubscription, setUserSubscription] = useState<Boolean>(false);  

  return (
    <TotalUsageContext.Provider value={{totalUsage, setTotalUsage}}>
      <UserSubscriptionContext.Provider value={{userSubscription, setUserSubscription}}>
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
    </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}
