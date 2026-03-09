import { Button } from "@/components/ui/button"
import { Home } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Banana } from 'lucide-react';
import { ListCheck } from 'lucide-react';
import { UserPen } from 'lucide-react';
import { BrainCircuit } from 'lucide-react';

import React from 'react'

const Sidebar = () => {
  return (
    <div className="flex gap-10 flex-col pt-5 pl-5 pr-5 bg-[#141417] border border-r h-screen">

        <Button variant = 'outline' size = "sm">
            <Home></Home>
            Home
        </Button>

        <Button variant = 'outline' size = "sm">
            <Banana></Banana>
            Macros
        </Button>

        <Button variant = 'outline' size = "sm">
            <ListCheck></ListCheck>
            To Do
        </Button>

        <Button variant = 'outline' size = "sm">
            <UserPen></UserPen>
            Profile Details
        </Button>

        <Button variant = 'outline' size = "sm">
            <BrainCircuit></BrainCircuit>
            AI Chatbot
        </Button>
    </div>
  )
}

export default Sidebar
