import React from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@radix-ui/react-label'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import {info} from "@/lib/ToDo.js"
import { Home } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Banana } from 'lucide-react';
import { ListCheck } from 'lucide-react';
import { UserPen } from 'lucide-react';
import { BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/app/components/Sidebar'
import {auth} from "@/auth"

const page = async () => {
  
  const session = await auth()

  const res = await fetch(`http://localhost:3000/api/todo?UserId=${session?.user?.id}`, {
    method: "GET"
  })

  const data = await res.json()
  const todotasks = data.tasks 
  
  return (

    <div className='flex ml-5'>
      <Sidebar></Sidebar>
      <div className='flex-1'>

        <h1 className = "text-4xl text-[#3aab40] font-bold mt-10 ml-10">Todays Dashboard</h1>
        <p className='text-muted-foreground ml-10'>Complete today's tasks</p>

        <div className='flex ml-10 mt-10 gap-30'>

          <div className='w-[800px] rounded-xl bg-card border border-input relative shadow-sm'>

            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold">Workout Plan</h2>
                <p className="text-sm text-muted-foreground">
                  Exercises scheduled for today
                </p>
              </div>

              <Button size="icon" variant="outline">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>

            <Table className='w-[780px] mx-auto'>
              <TableCaption> Things to do today </TableCaption>
                <TableHeader>
                  <TableRow className='h-12'>
                    <TableHead className="w-[100px] text-white">Exercise</TableHead>
                    <TableHead className='text-white'>Sets</TableHead>
                    <TableHead className='text-white'>Reps</TableHead>
                    <TableHead className='text-white'>Weight</TableHead>
                    <TableHead className="text-right text-white">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todotasks.map((info: any) => (
                    <TableRow key={info.exercise} >
                      <TableCell className="font-medium">{info.exercise}</TableCell>
                      <TableCell>{info.sets}</TableCell>
                      <TableCell>{info.reps}</TableCell>
                      <TableCell>{info.weight}</TableCell>
                      <TableCell className="text-right">
                        <div className='flex justify-end'>
                          <Checkbox/>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}             
                </TableBody> 
            </Table>

        </div>

        </div>

      </div>

    </div>

  )
}

export default page


