"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';

const UsageTrack = () => {

  const {user} = useUser();
  const {totalUsage, setTotalUsage} = useContext(TotalUsageContext)
  
  useEffect(() => {
    if(user && user.primaryEmailAddress){
      fetchData(user)
    }
  }, [user])

  const fetchData = async (user:any) => {
    const result = await db.select().from(AIOutput).where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));
    let total = 0;
    result.forEach((res) => {
      if(res.aiResponse) total += Number(res?.aiResponse.length)
    })
    setTotalUsage(total)
  }

  return (
    <div className='m-5'>
      <div className='bg-primary text-white rounded-lg p-3'>
        <h2 className='font-medium'>Credits</h2>
        <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
          <div className='h-2 bg-white rounded-full' style={{width: (totalUsage/10000)*100+"%"}}></div>
        </div>
        <h2 className='text-sm my-2'>${totalUsage}/10,000 credit used</h2>
      </div>
      <Button variant={"secondary"} className='w-full my-3 text-primary'>Upgrade</Button>
    </div>
  )
}

export default UsageTrack
