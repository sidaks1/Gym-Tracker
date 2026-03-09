"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useEffect, useState } from "react"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#3aab40",
  },
  mobile: {
    label: "Mobile",
    color: "#9dffcf",
  },
} satisfies ChartConfig

export function ExampleChart({updatedata}:{updatedata: boolean}) {
  const [data, setData] = useState([])
  const output = []

  useEffect(() => {
    fetch("/api/calories",{
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(setData)
  }, [updatedata])


  for(let i = 0; i < 31; i++){
    output.push({Day: `Day ${i+1}`, calories: data[i] || 800, goal_calories: 900})
  }

  console.log(output)

  return (

    
    <ChartContainer config={chartConfig} className="min-h-[200px] w-125">
      <BarChart accessibilityLayer data={output}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="Day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="calories" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="goal_calories" fill="var(--color-mobile)" radius={4} />
      </BarChart>

    </ChartContainer>
  )
}
