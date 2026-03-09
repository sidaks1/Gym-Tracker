"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { XIcon } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import Select from 'react-select'
import {exercises} from "@/lib/ToDo"


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
  FieldDescription,
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

export function MacroForm() {
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

    for(let i = 0; i < data.tasks.length; i++) {
      const exId = data.tasks[i]
      exId.idkey = i
    }

    fetch("/api/todo", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

  return (
    <Card className="w-full bg-input/30 sm:max-w-xl">
      <CardHeader className="border-b">
        <CardTitle>Gym Tasks</CardTitle>
        <CardDescription>
          Plan today's workout (exercise, sets, reps, optional weight).
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="gym-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet className="gap-4">
            <FieldLegend variant="label">Today's Workout</FieldLegend>
            <FieldDescription>
              Add up to 8 exercises for your session.
            </FieldDescription>

            <FieldGroup className="gap-4">
              {fields.map((item, index) => (
                <Controller
                  key={item.id}
                  name={`tasks.${index}.exercise`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <div className="flex flex-wrap gap-2">

                          {/* Exercise */}
                          <InputGroup className="flex-1 min-w-[140px]">
                            <div className="flex-1 text-black">
                              <Select
                                options={searchexercises}
                                placeholder="Exercise"
                                value={
                                  searchexercises.find(
                                    (ex) => ex.value === field.value
                                  ) || null
                                }
                                onChange={(selected) => {
                                  field.onChange(selected?.value ?? "")
                                }}
                              />
                            </div>
                          </InputGroup>

                          {/* Sets */}
                          <InputGroup className="w-[80px]">
                            <InputGroupInput
                              type="number"
                              placeholder="Sets"
                              {...form.register(
                                `tasks.${index}.sets`,
                                { valueAsNumber: true }
                              )}
                            />
                          </InputGroup>

                          {/* Reps */}
                          <InputGroup className="w-[80px]">
                            <InputGroupInput
                              type="number"
                              placeholder="Reps"
                              {...form.register(
                                `tasks.${index}.reps`,
                                { valueAsNumber: true }
                              )}
                            />
                          </InputGroup>

                          {/* Weight (optional) */}
                          <InputGroup className="w-[96px]">
                            <InputGroupInput
                              type="number"
                              step="0.5"
                              placeholder="kg"
                              {...form.register(
                                `tasks.${index}.weight`,
                                { valueAsNumber: true }
                              )}
                            />
                          </InputGroup>

                          {/* Remove */}
                          {fields.length > 1 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => remove(index)}
                                aria-label={`Remove exercise ${index + 1}`}
                              >
                                <XIcon />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </div>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    exercise: "",
                    sets: 3,
                    reps: 10,
                    weight: undefined,
                  })
                }
                disabled={fields.length >= 8}
              >
                Add Exercise
              </Button>
            </FieldGroup>

            {form.formState.errors.tasks?.root && (
              <FieldError errors={[form.formState.errors.tasks.root]} />
            )}
          </FieldSet>
        </form>
      </CardContent>

      <CardFooter className="border-t">
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="gym-form">
            Save Workout
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
