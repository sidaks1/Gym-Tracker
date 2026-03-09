'use client'

import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { auth } from '@/auth'
import { any } from 'zod'
import { useState } from 'react'




const ExerciseTemplateTable = ({clientday, refresh}: {clientday: number, refresh: boolean}) => {
  // const session = await auth()

  // const res = await fetch(
  //   `http://localhost:3000/api/todo?UserId=${session?.user?.id}`,
  //   { method: "GET"}
  // )

  // const data = await res.json()
  // const todotasks = data.tasks


  const [data, setData] = useState([])
  let todotasks: any = []
  
  useEffect(() => {
    fetch(
      `/api/todo?type=all`,
      {
      method: "GET",
      credentials: "include",
    })  
      .then(res => res.json())
      .then((info)=>setData(info))  
  }, [refresh])

  todotasks = data[clientday - 1]

  return (
    <div className="flex justify-center mt-6">
      <div className="w-full max-w-3xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-[#1e293b] shadow-2xl shadow-black/40 rounded-xl overflow-hidden">

        <div className="border-b border-[#1e293b] px-4 py-3">
          <h2 className="text-lg font-bold text-[#22c55e]">Today's Workout</h2>
          <p className="text-slate-400 text-xs">Your saved training template</p>
        </div>

        <Table>
          <TableHeader>   
            <TableRow className="bg-[#020617] border-b border-[#1e293b] hover:bg-transparent">
              <TableHead className="text-slate-400 font-semibold px-4 py-2">Exercise</TableHead>
              <TableHead className="text-slate-400 font-semibold text-center py-2">Sets</TableHead>
              <TableHead className="text-slate-400 font-semibold text-center py-2">Reps</TableHead>
              <TableHead className="text-slate-400 font-semibold text-center py-2">Weight</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {todotasks?.length > 0 ? todotasks.map((info: any, index: number) => (
              <TableRow key={index} className="border-b border-[#1e293b] hover:bg-[#020617]/60 transition-colors">
                <TableCell className="text-white font-medium px-4 py-2">{info.exercise}</TableCell>
                <TableCell className="text-slate-300 text-center py-2">{info.sets}</TableCell>
                <TableCell className="text-slate-300 text-center py-2">{info.reps}</TableCell>
                <TableCell className="text-slate-300 text-center py-2">
                  {info.weight ? `${info.weight} kg` : "-"}
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-slate-500 py-4">
                  No exercises added yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
    </div>
  )
}

export default ExerciseTemplateTable
