'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Pencil } from 'lucide-react'
import { CaloriesForm } from '@/components/ui/calorieform'
import { WeightChartAreaLinear } from '@/components/ui/weightchart'
import { CalorieChartAreaAxes } from '@/components/ui/calorieareachart'

const page = () => {

  const [showform, toggleform] = useState(false)

  return (
    <div className="bg-[#020617] text-white pb-20">

      {/* Header */}
      <div className="pt-10 ml-10">
        <h1 className="text-4xl font-bold text-[#22c55e] mb-2">
          Macro Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track and visualize your nutrition & bodyweight progress
        </p>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12 px-10">

        <CalorieChartAreaAxes updatedata={showform} />

        <WeightChartAreaLinear />

      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => toggleform(true)}
        className="
          fixed bottom-8 right-8
          h-14 w-14
          rounded-full
          bg-[#22c55e]
          hover:bg-[#16a34a]
          shadow-xl shadow-[#22c55e]/30
          transition-all duration-300
          hover:scale-110
        "
      >
        <Pencil className="w-5 h-5 text-black" />
      </Button>

      {/* Modal Form Overlay */}
      {showform && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="
            bg-gradient-to-br from-[#0f172a] to-[#020617]
            border border-[#1e293b]
            rounded-xl
            shadow-2xl
            p-6
            w-full max-w-md
          ">
            <CaloriesForm closeform={toggleform} />
          </div>
        </div>
      )}

    </div>
  )
}
 
export default page