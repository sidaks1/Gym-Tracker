import { Button } from "@/components/ui/button"
import { Home, Link } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Banana } from 'lucide-react';
import { ListCheck } from 'lucide-react';
import { UserPen } from 'lucide-react';
import { BrainCircuit } from 'lucide-react';

import React from 'react'

const Sidebar = () => {
  return (
    <div className="flex gap-10 flex-col pt-5 pl-5 pr-5 bg-[#141417] border border-r h-screen">

        <Link href="/">
            <Button variant = 'outline' size = "sm">
                <Home></Home>
                Home
            </Button>
        </Link>

        <Link href="/macrosgraph">
            <Button variant = 'outline' size = "sm">
                <Banana></Banana>
                Macros
            </Button>
        </Link>

        <Link href="/todo">
            <Button variant = 'outline' size = "sm">
                <ListCheck></ListCheck>
                To Do
            </Button>
        </Link>

        <Link href="/profile">
            <Button variant = 'outline' size = "sm">
                <UserPen></UserPen>
                Profile Details
            </Button>
        </Link>


        <Link href="/ai-chatbot">
            <Button variant = 'outline' size = "sm">
                <BrainCircuit></BrainCircuit>
                AI Chatbot
            </Button>
        </Link>


    </div>
  )
}

export default Sidebar
