"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { EmailAddress } from '@clerk/nextjs/server';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';
import Link from 'next/link';

const UsageTrack = () => {

  const {user} = useUser();
  const {totalUsage, setTotalUsage} = useContext(TotalUsageContext)
  const {userSubscription, setUserSubscription} = useContext(UserSubscriptionContext);  
  const [maxWords, setMaxWords] = useState<number>(10000);
  const {updateCreditUsage, setUpdateCreditUsage} = useContext(UpdateCreditUsageContext);  

  useEffect(() => {
    if(user && user.primaryEmailAddress){
      fetchData(user)
      isUserSubscribed(user)
    }
  }, [user && updateCreditUsage])

  const fetchData = async (user:any) => {
    const result = await db.select().from(AIOutput).where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));
    let total = 0;
    result.forEach((res) => {
      if(res.aiResponse) total += Number(res?.aiResponse.length)
    })
    setTotalUsage(total)
  }

  const isUserSubscribed = async (user:any) => {
    try {
      const result = await db.select().from(UserSubscription).where(eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress));
      if(!result){
        console.log("subscription not found")
        return;
      }
      setUserSubscription(true);
      setMaxWords(100000)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='m-5'>
      <div className='bg-primary text-white rounded-lg p-3'>
        <h2 className='font-medium'>Credits</h2>
        <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
          <div className='h-2 bg-white rounded-full' style={{width: (totalUsage/maxWords)*100+"%"}}></div>
        </div>
        <h2 className='text-sm my-2'>{totalUsage}/{maxWords} credit used</h2>
      </div>
      <Link href="/billing">
      <Button variant={"secondary"} className='w-full my-3 text-primary'>Upgrade</Button>
      </Link>

    </div>
  )
}

export default UsageTrack
