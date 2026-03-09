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

    const result = await coll.updateOne(
      {userId: session?.user?.id},
      {$set: {goalcalories: info.calories}}
    )

    console.log("Update result:", result.matchedCount)
    console.log("Modified count:", result.modifiedCount) 
    console.log(session?.user?.id)
    console.log(info.calories)

    return NextResponse.json({ok: true})
}


export async function GET(req: Request) {
    await client.connect()
    const session = await auth()

    const db = client.db("routetest")
    const coll = db.collection("hii")

    const data = await coll.findOne({userId: session?.user?.id})
    const cals = data?.goalcalories
    
    return NextResponse.json(cals)

}
