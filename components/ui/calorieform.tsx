"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldContent,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"


/* ================= SCHEMAS ================= */

const caloriesSchema = z.object({
  date: z.string().min(1),
  calories: z.number().min(0).max(20000),
})

const weightSchema = z.object({
  date: z.string().min(1),
  weight: z.number().min(0).max(500),
})

const goalSchema = z.object({
  goalCalories: z.number().min(0).max(20000),
})


/* ================= COMPONENT ================= */

export function CaloriesForm({closeform}= {closeform:(arg: boolean) => {}}) {

  /* ---------- Calories ---------- */

  const caloriesForm = useForm({
    resolver: zodResolver(caloriesSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      calories: 0,
    },
  })

  function submitCalories(data) {
    fetch("/api/calories", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }


  /* ---------- Weight ---------- */

  const weightForm = useForm({
    resolver: zodResolver(weightSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      weight: 0,
    },
  })

  function submitWeight(data) {
    fetch("/api/weight", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }


  /* ---------- Goal ---------- */

  const goalForm = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      goalCalories: 2000,
    },
  })

  function submitGoal(data) {
    // fetch("/api/calorie-goal", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
  }


return (
  <>
    {/* Blur overlay */}
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40" />

    {/* Modal wrapper */}
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* Your form container */}
      <div className="flex flex-col gap-6 w-full max-w-xl">

        <Button className="absolute top-4 right-4 p-1 rounded hover:bg-muted transition" onClick={() => closeform(false)}>
          <X></X>
        </Button>

        {/* CALORIES */}
        <Card className="bg-input/30">
          <CardHeader>
            <CardTitle>Log Calories</CardTitle>
            <CardDescription>
              Enter calories for a specific date
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={caloriesForm.handleSubmit(submitCalories)}>
              <FieldSet className="gap-4">

                <FieldGroup>
                  <Field>
                    <FieldContent>
                      <Input
                        type="date"
                        {...caloriesForm.register("date")}
                      />
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldContent>
                      <Input
                        type="number"
                        placeholder="Calories"
                        {...caloriesForm.register("calories", {
                          valueAsNumber: true,
                        })}
                      />
                    </FieldContent>
                  </Field>
                </FieldGroup>

                <Button type="submit">
                  Save Calories
                </Button>

              </FieldSet>
            </form>
          </CardContent>
        </Card>


        {/* WEIGHT */}
        <Card className="bg-input/30">
          <CardHeader>
            <CardTitle>Log Weight</CardTitle>
            <CardDescription>
              Enter weight for a specific date
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={weightForm.handleSubmit(submitWeight)}>
              <FieldSet className="gap-4">

                <FieldGroup>
                  <Field>
                    <FieldContent>
                      <Input
                        type="date"
                        {...weightForm.register("date")}
                      />
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldContent>
                      <Input
                        type="number"
                        placeholder="Weight (kg)"
                        {...weightForm.register("weight", {
                          valueAsNumber: true,
                        })}
                      />
                    </FieldContent>
                  </Field>
                </FieldGroup>

                <Button type="submit">
                  Save Weight
                </Button>

              </FieldSet>
            </form>
          </CardContent>
        </Card>


        {/* GOAL */}
        <Card className="bg-input/30">
          <CardHeader>
            <CardTitle>Calorie Goal</CardTitle>
            <CardDescription>
              Set your daily calorie goal
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={goalForm.handleSubmit(submitGoal)}>
              <FieldSet className="gap-4">

                <Field>
                  <FieldContent>
                    <Input
                      type="number"
                      placeholder="Goal calories"
                      {...goalForm.register("goalCalories", {
                        valueAsNumber: true,
                      })}
                    />
                  </FieldContent>
                </Field>

                <Button type="submit">
                  Save Goal
                </Button>

              </FieldSet>
            </form>
          </CardContent>
        </Card>

      </div>

    </div>
  </>
)
} 