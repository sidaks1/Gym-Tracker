import Link from "next/link"
import Theicon from "../components/Theicon"

import { Banana } from "lucide-react"
import { ListCheck } from "lucide-react"
import { UserPen } from "lucide-react"
import { BrainCircuit } from "lucide-react"
import { Flame } from "lucide-react"
import { Dumbbell } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/10 blur-[120px] top-[-150px] left-[-150px]" />
      <div className="absolute w-[400px] h-[400px] bg-green-400/10 blur-[120px] bottom-[-100px] right-[-100px]" />

      <div className="relative z-10">

        {/* hero */}
        <div className="text-center pt-20 pb-12">
          <h1 className="text-5xl font-bold text-[#22c55e]">Gym Tracker</h1>
          <p className="text-slate-400 mt-4 text-lg">
            Track workouts, nutrition, and progress in one place
          </p>
        </div>

        {/* quick stats */}
        <div className="flex justify-center gap-10 mb-16">

          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl px-8 py-5 flex items-center gap-3 shadow-lg">
            <Flame className="text-[#22c55e]" />
            <div>
              <p className="text-sm text-slate-400">Current Streak</p>
              <p className="text-xl font-bold">5 days</p>
            </div>
          </div>

          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl px-8 py-5 flex items-center gap-3 shadow-lg">
            <Dumbbell className="text-[#22c55e]" />
            <div>
              <p className="text-sm text-slate-400">Workouts Logged</p>
              <p className="text-xl font-bold">32</p>
            </div>
          </div>

        </div>

        {/* feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl mx-auto px-8 pb-20">

          <Link href="/macrosgraph">
            <div className="flex flex-col items-center gap-3">
              <Theicon>
                <Banana className="w-16 h-16"/>
              </Theicon>
              <p className="text-slate-300 font-medium">Track Macros</p>
            </div>
          </Link>

          <Link href="/splitchecklist">
            <div className="flex flex-col items-center gap-3">
              <Theicon>
                <ListCheck className="w-16 h-16"/>
              </Theicon>
              <p className="text-slate-300 font-medium">Today's Workout</p>
            </div>
          </Link>

          <Link href="/myprofile">
            <div className="flex flex-col items-center gap-3">
              <Theicon>
                <UserPen className="w-16 h-16"/>
              </Theicon>
              <p className="text-slate-300 font-medium">Profile</p>
            </div>
          </Link>

          <Link href="/chatbotai">
            <div className="flex flex-col items-center gap-3">
              <Theicon>
                <BrainCircuit className="w-16 h-16"/>
              </Theicon>
              <p className="text-slate-300 font-medium">AI Coach</p>
            </div>
          </Link>

        </div>

      </div>
    </div>
  )
}