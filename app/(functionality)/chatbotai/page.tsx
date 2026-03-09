

import ClientTemplatePage from '@/app/components/ClientTemplatePage'
import React from 'react'


const page = () => {

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#22c55e]">Profile Dashboard</h1>
          <p className="text-slate-400 text-sm">Manage your weekly workout templates</p>
        </div>

        <ClientTemplatePage/>


      </div>
    </div>
  )
}

export default page
