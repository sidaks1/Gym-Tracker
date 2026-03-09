"use client"

import React, { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { exerciseMap } from "@/lib/ToDo"

const exercises = [
  { name: "Bench Press", muscle: "Chest", type: "Barbell" },
  { name: "Squats", muscle: "Legs", type: "Barbell" },
  { name: "Pull-ups", muscle: "Back", type: "Bodyweight" },
  { name: "Overhead Press", muscle: "Shoulders", type: "Dumbbell" },
  { name: "Bicep Curl", muscle: "Arms", type: "Dumbbell" },
  { name: "Plank", muscle: "Core", type: "Bodyweight" },
]

type dataProp = {
  data: {
    exercise: string,
    sets: number,
    reps: number
    weight: number
    idkey: number
   }[]
  }


export function ClientDashboard({data}: dataProp) {
  const [completed, setCompleted] = useState<boolean[]>(new Array(data.length).fill(false))

  const toggleComplete = (index: number) => {
    const updated = [...completed]
    updated[index] = !updated[index]
    setCompleted(updated)
  }

  const completedCount = completed.filter(Boolean).length
  const progressPercent = (completedCount / data.length) * 100


  return (  
    <div className="p-10 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-600">Today's Workout</h1>
        <p className="text-gray-500 mt-1">Complete your exercises for today</p>
        <div className="mt-4">
          <Progress value={progressPercent} className="h-4 rounded-full" />
          <p className="mt-2 text-sm text-gray-600">{completedCount} / {data.length} exercises completed</p>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((ex, idx) => {
          const exerciseInfo = exerciseMap.get(ex.exercise)
          return(
            <div
              key={ex.idkey}
              className={`p-6 rounded-xl shadow-md flex justify-between items-center transition-transform transform
                          ${completed[idx] ? "bg-green-100 opacity-70 line-through" : "bg-input/30 hover:scale-105"}`}
            >
              <div>
                <h3 className="font-semibold text-green-600">{exerciseInfo?.name}</h3>
                <p className="text-sm text-gray-500">
                  {exerciseInfo?.type} • {ex.weight || "N/A"}kg
                </p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary">Sets: {ex.sets}</Badge>
                  <Badge variant="outline">Reps: {ex.reps}</Badge>
                </div>
              </div>
              <Checkbox checked={completed[idx]} onCheckedChange={() => toggleComplete(idx)} />
            </div>
          )
        })}
      </div>
      
    </div>
  )
}
