import client from "@/lib/db"
import { NextResponse } from "next/server"
import {auth} from "@/auth"

export async function POST(req: Request) {
    await client.connect()
    const session = await auth()
    const info = await req.json()



    console.log("Cookie", req.headers.get("cookie"))

    const db = client.db("routetest")
    const coll = db.collection("hii")
    let result

    if (info.type === "all") {
        result = await coll.updateOne(
        {userId: session?.user?.id},
        {$set: {[`templates.${info.day}`]: info.data.tasks}}
        )
    }
  
    else{
        result = await coll.updateOne(
        {userId: session?.user?.id},
        {$set: {'todolist': info.data}}
        ) 
    }

    console.log("Update result:", result.matchedCount)
    console.log("Modified count:", result.modifiedCount) 
    console.log(session?.user?.id)

    return NextResponse.json({ok: true})
}

export async function GET(req: Request) {

    
    const type = new URL(req.url).searchParams.get("type")
    await client.connect()
    
    if (type === "all") {

        const session = await auth()
        const user = session?.user?.id

        const db = client.db("routetest")
        const coll = db.collection("hii")

        const data = await coll.findOne({userId: user})
        const todo = data?.templates
    
        return NextResponse.json(todo)
    }
    
    else{

        const user = new URL(req.url).searchParams.get("UserId")
    
        const db = client.db("routetest")
        const coll = db.collection("hii")

        const data = await coll.findOne({userId: user})
        const todo = data?.todolist
    
    return NextResponse.json(todo)
    }

}