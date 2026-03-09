"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useEffect, useState } from "react"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A linear area chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig


export function WeightChartAreaLinear() {

    const [data, setData] = useState([])
    const output = []

    useEffect(() => {
    fetch("/api/weight",{
        method: "GET",
        credentials: "include",
    })
        .then(res => res.json())
        .then(setData)
    }, [])


    for(let i = 0; i < 31; i++){
    output.push({Day: `Day ${i+1}`, calories: data[i] || 40})
    }




    return (
        <Card className="bg-gradient-to-br from-[#0f172a] to-[#020617]
          border border-[#1e293b]
          shadow-2xl shadow-black/40
          hover:border-[#22c55e]
          transition-all duration-300">
            <CardHeader>
            <CardTitle className="text-[#22c55e]">Area Chart - Linear</CardTitle>
            <CardDescription>
                Showing total visitors for the last 6 months
            </CardDescription>
            </CardHeader>
            <CardContent>
            <ChartContainer config={chartConfig}>
                <AreaChart
                accessibilityLayer
                data={output}
                margin={{
                    left: 12,
                    right: 12,
                }}
                >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="Day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Area
                    dataKey="calories"
                    type="linear"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                />
                </AreaChart>
            </ChartContainer>
            </CardContent>
            <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
                <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium text-[#22c55e]">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                    January - June 2024
                </div>
                </div>
            </div>
            </CardFooter>
        </Card>
        )
}
