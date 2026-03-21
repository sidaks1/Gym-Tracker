import { Button } from "@/components/ui/button"
import { Home} from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Banana } from 'lucide-react';
import { ListCheck } from 'lucide-react';
import { UserPen } from 'lucide-react';
import { BrainCircuit } from 'lucide-react';
import Link from 'next/link'

import React from 'react'

const Sidebar = () => {
  return (
    <div className="flex gap-3 flex-col p-4 bg-[#141417] border border-r h-screen">

        <Link href="/">
            <Button variant = 'ghost' size = "sm" className="w-full justify-start gap-3">
                <Home></Home>
                Home
            </Button>
        </Link>

        <Link href="/macrosgraph">
            <Button variant = 'ghost' size = "sm" className="w-full justify-start gap-3">
                <Banana></Banana>
                Macros
            </Button>
        </Link>

        <Link href="/todo">
            <Button variant = 'ghost' size = "sm" className="w-full justify-start gap-3">
                <ListCheck></ListCheck>
                To Do
            </Button>
        </Link>

        <Link href="/profile">
            <Button variant = 'ghost' size = "sm" className="w-full justify-start gap-3">
                <UserPen></UserPen>
                Profile Details
            </Button>
        </Link>


        <Link href="/ai-chatbot">
            <Button variant = 'ghost' size = "sm" className="w-full justify-start gap-3">
                <BrainCircuit></BrainCircuit>
                AI Chatbot
            </Button>
        </Link>


    </div>
  )
}

export default Sidebar
