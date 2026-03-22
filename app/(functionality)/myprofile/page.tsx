"use client"

import React, { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { exercises } from "@/lib/ToDo"
import {
  Dumbbell,
  Flame,
  Activity,
  Zap,
  Search,
} from "lucide-react"

const categories = [
  "Chest",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Legs",
  "Back",
  "Glute",
  "Abs",
  "Calves",
  "Forearms",
  "Neck",
]

const iconMap: any = {
  Chest: Dumbbell,
  Shoulders: Activity,
  Biceps: Dumbbell,
  Triceps: Dumbbell,
  Legs: Flame,
  Back: Activity,
  Glute: Flame,
  Abs: Zap,
  Calves: Flame,
  Forearms: Dumbbell,
  Neck: Activity,
}

const page = () => {
  const [search, setSearch] = useState("")
  const [hovered, setHovered] = useState<string | null>(null)

  const categorized = categories.map((category) => ({
    name: category,
    exercises: exercises.filter(
      (e) =>
        e.type === category &&
        e.name.toLowerCase().includes(search.toLowerCase())
    ),
  }))

  return (
    <div className="bg-[#020617] text-white">

      {/* Header */}
      <div className="pt-10 ml-10">
        <h1 className="text-4xl font-bold text-[#22c55e] mb-2">
          Exercise Library
        </h1>

        <p className="text-muted-foreground mb-6">
          Browse through all exercises by category
        </p>

        {/* Search */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 text-muted-foreground w-4 h-4"/>
          <Input
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-[#0f172a] border-[#1e293b] focus:border-[#22c55e]"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-8 mt-10 px-10 pb-10">

        {categorized.map((category) => {
          const Icon = iconMap[category.name]

          return (
            <div
              key={category.name}
              onMouseEnter={() => setHovered(category.name)}
              onMouseLeave={() => setHovered(null)}
              className={`
                transition-all duration-300
                rounded-xl
                border border-[#1e293b]
                bg-gradient-to-br from-[#0f172a] to-[#020617]
                shadow-xl shadow-black/40

                hover:border-[#22c55e]
                hover:shadow-[#22c55e]/20
                hover:-translate-y-1
              `}
            >

              <ScrollArea className="h-72">

                {/* Card header */}
                <div className="p-4 border-b border-[#1e293b]">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <Icon
                        className={`
                          w-5 h-5
                          transition-all
                          ${hovered === category.name
                            ? "text-[#22c55e]"
                            : "text-muted-foreground"}
                        `}
                      />

                      <h4 className="font-semibold text-[#22c55e]">
                        {category.name}
                      </h4>

                    </div>

                    <span className="text-xs bg-[#22c55e]/20 text-[#22c55e] px-2 py-0.5 rounded-full">
                      {category.exercises.length}
                    </span>

                  </div>

                </div>

                {/* Exercises */}
                <div className="p-4">
                  {category.exercises.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      No exercises found
                    </p>
                  ) : (
                    category.exercises.map((exercise: any) => (
                      <div key={exercise.name}>
                        <div
                          className="
                            text-sm
                            py-1
                            px-2
                            rounded-md
                            cursor-pointer
                            transition-all
                            hover:bg-[#22c55e]/10
                            hover:text-[#22c55e]
                          "
                        >
                          {exercise.name}
                        </div>
                        <Separator className="my-1 bg-[#1e293b]" />
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page