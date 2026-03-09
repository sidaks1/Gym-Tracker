import client from "@/lib/db"
import { NextResponse } from "next/server"



export async function POST(){
    await client.connect()

    const db = client.db("routetest")
    const coll = db.collection("hii")

    await coll.insertOne({testing: 2})

    return NextResponse.json({ok: true})

}