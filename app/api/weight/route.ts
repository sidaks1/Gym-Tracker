import client from "@/lib/db"
import { NextResponse } from "next/server"
import {auth} from "@/auth"
import { ObjectId } from "mongodb"

export async function POST(req: Request) {
    await client.connect()
    const session = await auth()
    const info = await req.json()

    console.log("Cookie", req.headers.get("cookie"))

    const db = client.db("routetest")
    const coll = db.collection("hii")

    const elapsedDays = calculatedays(new Date().toISOString().split("T")[0], info.date)

    const result = await coll.updateOne(
      {userId: session?.user?.id},
      {$set: {[`weight.${elapsedDays}`]: info.weight}}
    )

    console.log("Update result:", result.matchedCount)
    console.log("Modified count:", result.modifiedCount) 
    console.log(session?.user?.id)
    console.log(info.weight)

    return NextResponse.json({ok: true})
}


export async function GET(req: Request) {
    await client.connect()
    const session = await auth()

    const db = client.db("routetest")
    const coll = db.collection("hii")

    const data = await coll.findOne({userId: session?.user?.id})
    const cals = data?.weight
    
    return NextResponse.json(cals)

}



  function calculatedays(today: string, newdate: string){

    const todayDate = new Date(today)
    const newDate = new Date(newdate)

    const diffTime = Math.abs(newDate.getTime() - todayDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    console.log(today)

    const daysindex = 31-diffDays
    return daysindex
  }