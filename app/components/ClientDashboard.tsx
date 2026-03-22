'use client'

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { exerciseMap } from "@/lib/ToDo"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { MacroForm } from "@/components/ui/macroform"
import { TemplateForm } from "@/components/ui/templateform"

type dataProp = {
  data: {
    exercise: string,
    sets: number,
    reps: number,
    weight: number,
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

  const [refresh,activaterefresh] = useState<boolean>(false)

  function triggerrefresh(){
    activaterefresh(!refresh)
  }

  const [showform, toggleform] = useState<boolean>(false)

  const completedCount = completed.filter(Boolean).length
  const progressPercent = (completedCount / data.length) * 100

  return (
    <div className="bg-[#020617] text-white p-8 min-h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#22c55e]">Today's Workout</h1>
        <p className="text-slate-400 text-sm mt-1">Complete your exercises for today</p>
        <div className="mt-4">
          <Progress value={progressPercent} className="h-4 rounded-full bg-[#1e293b]" />
          <p className="mt-2 text-sm text-slate-400">{completedCount} / {data.length} exercises completed</p>
        </div>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((ex, idx) => {
          const exerciseInfo = exerciseMap.get(ex.exercise)
          return (
            <div
              key={ex.idkey}
              className={`
                p-6 rounded-xl border border-[#1e293b]
                bg-gradient-to-br from-[#0f172a] to-[#020617]
                shadow-xl shadow-black/40
                flex justify-between items-center transition-all
                ${completed[idx] ? "opacity-70 line-through" : "hover:shadow-green-500/30 hover:scale-105"}
              `}
            >
              <div>
                <h3 className="font-semibold text-[#22c55e]">{exerciseInfo?.name}</h3>
                <p className="text-sm text-slate-400">
                  {exerciseInfo?.type} • {ex.weight || "N/A"}kg
                </p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary">{`Sets: ${ex.sets}`}</Badge>
                  <Badge variant="outline">{`Reps: ${ex.reps}`}</Badge>
                </div>
              </div>
              <Checkbox checked={completed[idx]} onCheckedChange={() => toggleComplete(idx)} />
            </div>
          )
        })}
      </div>

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

      {showform && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="
            bg-gradient-to-br from-[#0f172a] to-[#020617]
            border border-[#1e293b]
            rounded-xl
            shadow-2xl
            p-6
            w-full max-w-2xl
          ">
            <TemplateForm clientday={0} type = "today" triggerrefresh={triggerrefresh} closeform={toggleform}></TemplateForm>
          </div>
        </div>
      )}   

    </div>
  )
}
    