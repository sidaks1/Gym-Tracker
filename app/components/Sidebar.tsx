import Link from 'next/link';
import { Home, Banana, ListCheck, UserPen, BrainCircuit } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <aside className="flex flex-col justify-between w-64 h-full bg-[#020617] border-r border-[#1e293b] p-4">

      <div>
        <div className="mb-8">
          <h1 className="text-lg font-bold text-[#22c55e]">Gym Tracker</h1>
          <p className="text-xs text-slate-400">Dashboard</p>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/">
            <Button className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-[#0f172a]" variant="ghost">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>

          <Link href="/splitchecklist">
            <Button className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-[#0f172a]" variant="ghost">
              <ListCheck className="h-4 w-4" />
              Today's Workout
            </Button>
          </Link>

          <Link href="/myprofile">
            <Button className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-[#0f172a]" variant="ghost">
              <UserPen className="h-4 w-4" />
              Exercise Library
            </Button>
          </Link>

          <Link href="/chatbotai">
            <Button className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-[#0f172a]" variant="ghost">
              <BrainCircuit className="h-4 w-4" />
                Your Templates
            </Button>
          </Link>

          <Link href="/macrosgraph">
            <Button className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-[#0f172a]" variant="ghost">
              <Banana className="h-4 w-4" />
              Macros
            </Button>
          </Link>
          
        </div>
      </div>

      <div className="border-t border-[#1e293b] pt-4">
        <div className="bg-[#0f172a] rounded-lg p-3">
          <p className="text-xs text-slate-400">Today's Progress</p>
          <p className="text-sm font-semibold text-white mt-1">Keep going 💪</p>
        </div>

      </div>

    </aside>
  )
}

export default Sidebar;