'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemplateForm } from '@/components/ui/templateform'
import ExerciseTemplateTable from '@/app/components/ExerciseTemplateTable'




const ClientTemplatePage = () => {

    const [dayofweek, setday] = useState<number>(1)

    const [refresh,activaterefresh] = useState<boolean>(false)

    function triggerrefresh(){
        activaterefresh(!refresh)
    }

    return (
        <div className="grid lg:grid-cols-2 gap-6 items-start">

            {/* LEFT PANEL */}
            <div className="
            bg-gradient-to-br from-[#0f172a] to-[#020617]
            border border-[#1e293b]
            shadow-xl shadow-black/40
            rounded-xl p-4
            ">

            <Tabs defaultValue="monday">

                {/* Tabs */}
                <TabsList className="
                bg-[#020617]
                border border-[#1e293b]
                mb-4 w-full justify-start
                ">
                <TabsTrigger value="monday" onClick={() => setday(1)}>
                    Mon
                </TabsTrigger>

                <TabsTrigger value="tuesday" onClick={() => setday(2)}>
                    Tue
                </TabsTrigger>

                <TabsTrigger value="wednesday" onClick={() => setday(3)}>
                    Wed
                </TabsTrigger>

                <TabsTrigger value="thursday" onClick={() => setday(4)}>
                    Thu
                </TabsTrigger>

                <TabsTrigger value="friday" onClick={() => setday(5)}>
                    Fri
                </TabsTrigger>

                <TabsTrigger value="saturday" onClick={() => setday(6)}>
                    Sat
                </TabsTrigger>

                <TabsTrigger value="sunday" onClick={() => setday(7)}>
                    Sun
                </TabsTrigger>

                </TabsList>

                {/* Content */}
                <TabsContent value="monday"><ExerciseTemplateTable clientday = {dayofweek} refresh={refresh} /></TabsContent>
                <TabsContent value="tuesday"><ExerciseTemplateTable clientday = {dayofweek} refresh={refresh} /></TabsContent>
                <TabsContent value="wednesday"><ExerciseTemplateTable clientday = {dayofweek} refresh={refresh} /></TabsContent>
                <TabsContent value="thursday"><ExerciseTemplateTable clientday = {dayofweek} refresh={refresh} /></TabsContent>
                <TabsContent value="friday"><ExerciseTemplateTable clientday = {dayofweek} refresh={refresh} /></TabsContent>
                <TabsContent value="saturday"><ExerciseTemplateTable clientday = {dayofweek} refresh={refresh} /></TabsContent>
                <TabsContent value="sunday"><ExerciseTemplateTable clientday = {dayofweek} refresh={refresh} /></TabsContent>

            </Tabs>
            </div>

            {/* RIGHT PANEL */}
            <TemplateForm clientday={dayofweek} type = "all" triggerrefresh={triggerrefresh}/>

        </div>
    )
}

export default ClientTemplatePage