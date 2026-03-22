"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { X, XIcon } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import Select from 'react-select'
import { exercises } from "@/lib/ToDo"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { tr } from "zod/v4/locales"

/* -------------------- Schema -------------------- */

const formSchema = z.object({
  tasks: z
    .array(
      z.object({
        idkey: z.number().optional(),
        exercise: z.string().min(1, "Exercise name is required."),
        sets: z
          .number({ invalid_type_error: "Sets must be a number." })
          .min(1, "At least 1 set."),
        reps: z
          .number({ invalid_type_error: "Reps must be a number." })
          .min(1, "At least 1 rep."),
        weight: z
          .number()
          .positive("Weight must be positive.")
          .optional(),
      })
    )
    .min(1, "Add at least one gym task.")
    .max(8, "You can add up to 8 gym tasks."),
})

type FormValues = z.infer<typeof formSchema>

const searchexercises = exercises.map(ex => ({ value: ex.id, label: ex.name }))


/* -------------------- Component -------------------- */

export function TemplateForm({clientday, type, triggerrefresh, closeform}: {clientday: number, type: string, triggerrefresh: () => void, closeform:(arg: boolean) => void}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tasks: [{ exercise: "", sets: undefined, reps: undefined, weight: undefined }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tasks",
  })

  function onSubmit(data: FormValues) {
    for (let i = 0; i < data.tasks.length; i++) {
      data.tasks[i].idkey = i
    }
     
    triggerrefresh()

    fetch("/api/todo", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data, day: clientday-1, type: type}),
    })
  }

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <Card className="w-full sm:max-w-3xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-[#1e293b] shadow-2xl shadow-black/40">

      <Button className="absolute top-4 right-4 p-1 rounded hover:bg-muted transition" onClick={() => closeform(false)}>
        <X></X>
      </Button>

      {/* Header */}
      <CardHeader className="border-b border-[#1e293b]">
        <CardTitle className="text-xl font-bold text-[#22c55e] tracking-wide">
          Workout Builder
        </CardTitle>
        <CardDescription className="text-slate-400">
          Configure today's training load
        </CardDescription>
      </CardHeader>

      {/* Form */}
      <CardContent>
        <form id="gym-form" onSubmit={form.handleSubmit(onSubmit)}>

          <div className="rounded-lg border border-[#1e293b] overflow-hidden">

            {/* Table Header */}
            <div className="grid grid-cols-12 bg-[#020617] text-slate-400 text-sm font-semibold px-4 py-3 border-b border-[#1e293b]">
              <div className="col-span-5">Exercise</div>
              <div className="col-span-2 text-center">Sets</div>
              <div className="col-span-2 text-center">Reps</div>
              <div className="col-span-2 text-center">Weight</div>
              <div className="col-span-1 text-center"></div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#1e293b]">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 px-4 py-3 items-center hover:bg-[#020617]/60 transition-colors"
                >
                  {/* Exercise */}
                  <div className="col-span-5 text-black">
                    {mounted && (
                      <Controller
                        name={`tasks.${index}.exercise`}
                        control={form.control}
                        render={({ field }) => (
                          <Select

                            options={searchexercises}
                            placeholder="Select exercise"
                            menuPortalTarget={document.body}

                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            
                              control: (base) => ({
                                ...base,
                                backgroundColor: "#020617",
                                borderColor: "#1e293b"
                              }),

                              menu: (base) => ({
                                ...base,
                                backgroundColor: "#020617",
                                color: "white"
                              }),

                              option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isFocused ? "#334155" : "#020617",
                                color: state.isFocused ? "[#22c55e]" : "[#22c55e]",
                                cursor: "pointer"
                              }),
                            
                            
                            }}

                            value={searchexercises.find(
                              ex => ex.value === field.value
                            ) || null}
                            onChange={(selected) =>
                              field.onChange(selected?.value ?? "")
                            }
                          />
                        )}
                      />
                    )}
                  </div>

                  {/* Sets */}
                  <div className="col-span-2 flex justify-center">
                    <input
                      type="number"
                      {...form.register(`tasks.${index}.sets`, { valueAsNumber: true })}
                      className="w-16 text-center bg-[#020617] border border-[#1e293b] text-white rounded-md px-2 py-1 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]"
                    />
                  </div>

                  {/* Reps */}
                  <div className="col-span-2 flex justify-center">
                    <input
                      type="number"
                      {...form.register(`tasks.${index}.reps`, { valueAsNumber: true })}
                      className="w-16 text-center bg-[#020617] border border-[#1e293b] text-white rounded-md px-2 py-1 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]"
                    />
                  </div>

                  {/* Weight */}
                  <div className="col-span-2 flex justify-center">
                    <input
                      type="number"
                      step="0.5"
                      {...form.register(`tasks.${index}.weight`, { valueAsNumber: true })}
                      className="w-20 text-center bg-[#020617] border border-[#1e293b] text-white rounded-md px-2 py-1 focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]"
                      placeholder="kg"
                    />
                  </div>

                  {/* Remove */}
                  <div className="col-span-1 flex justify-center">
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md p-1 transition"
                      >
                        <XIcon size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Button */}
          <div className="mt-4">
            <Button
              type="button"
              onClick={() =>
                append({ exercise: "", sets: 3, reps: 10, weight: undefined })
              }
              disabled={fields.length >= 8}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold shadow-lg shadow-green-500/20"
            >
              + Add Exercise
            </Button>
          </div>
        </form>
      </CardContent>

      {/* Footer */}
      <CardFooter className="border-t border-[#1e293b] flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          className="border-[#334155] text-slate-300 hover:bg-[#020617]"
        >
          Reset
        </Button>

        <Button
          type="submit"
          form="gym-form"
          className="bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold shadow-lg shadow-green-500/30"
        >
          Save Workout
        </Button>
      </CardFooter>
    </Card>
  )
}