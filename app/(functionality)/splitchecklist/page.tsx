import { ClientDashboard } from "@/app/components/ClientDashboard"
import {auth} from "@/auth"

export default async function TodayDashboard() {

  const session = await auth()
  const res = await fetch(`http://localhost:3000/api/todo?UserId=${session?.user?.id}`, {
    method: "GET"
  })

  const data = await res.json()
  const todotasks = data.tasks

  return (  
    <ClientDashboard data={todotasks}/>
  )
}
