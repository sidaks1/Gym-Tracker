import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GitHub from "next-auth/providers/github"
import client from "./lib/db"

const daytemplate = [
  {
  exercise: "1",
  sets: 10,
  reps: 10,
  weight: 20,
  idkey: 0
},
  {
  exercise: "2",
  sets: 10,
  reps: 10,
  weight: 20,
  idkey: 1
},
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [GitHub],



  events: {
    async createUser(message) {
      await client.connect()
      const db = client.db("routetest")
      const coll = db.collection("hii")
      await coll.insertOne({
        userId: message.user.id,
        calories: Array(31).fill(0),
        goalcalories: 2000,
        weight: Array(31).fill(0),
        templates: Array.from({ length: 7 }, () => structuredClone(daytemplate))
      })
      console.log("New user created with ID:", message.user.id)
    }

  }




})