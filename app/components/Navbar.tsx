
import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import {auth, signOut, signIn} from "@/auth"

const Navbar = async() => {
  const session = await auth()
  return (
    <header className = "px-5 py-1 shadow-sm bg-[#1b1d24]">
      <nav className = "flex justify-between items-center">
        <Link href = "/">
          <Image src = "/logo.png" alt = "logo" width = {60} height = {10} />
        </Link>

        <div className = 'flex items-center gap-5 text-sm'>
          {session  && session?.user ? (
            <>
              <Link href = "/startup/create">
                <span>Create</span>
              </Link>

              <button onClick = {async() => {
                "use server"
                
                await signOut({redirectTo: "/"})
              }}>

                <span>Logout</span>


              </button>

              <Link href ={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>

              </Link>
            </>
          ) : (
            <button onClick={async() => {  
              "use server"; 
              await signIn('github');
            }}>
              <span>Login</span>
            </button>
          )}

        </div>
      </nav>
    </header>   

  )

}
export default Navbar

