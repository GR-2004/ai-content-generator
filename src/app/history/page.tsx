import Header from '@/components/Header'
import SideNav from '@/components/SideNav'
import React from 'react'

const HistoryPage = () => {
  return (
    <div className="bg-slate-200 h-screen">
      <div className="md:w-64 hidden md:block fixed">
        <SideNav/>
      </div>
      <div className="md:ml-64">
        <Header />
        <div className="flex  h-full items-center justify-center pt-5">
          <h1>history</h1>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
