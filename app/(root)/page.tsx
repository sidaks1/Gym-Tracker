import { Omega } from "lucide-react";
import Theicon from "../components/Theicon";
import Image from "next/image"
import Link from "next/link";

import { Banana } from 'lucide-react';
import { ListCheck } from 'lucide-react';
import { UserPen } from 'lucide-react';
import { BrainCircuit } from 'lucide-react';

/* flex and block*/

export default function Home() {

  return (
    /*research dropshadow*/
    <>
      <div className = "relative flex justify-center items-center bg-background h-[200px] w-full overflow-hidden relative">
        <Image src = "/a.jpg" alt = "side" fill className="object-cover"/>
        <h1 className = " absolute heading rounded-[22px] z-10 absolute border-[5px] border-black bg-background py-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Gym Tracker</h1>
      </div >


        <div className = "flex justify-between pt-10">
          <div className= "ml-[250px] w-[400px]">
            <h1 className = "font-bold text-center" >Macros</h1>
          </div>
          <div className= "mr-[250px] w-[400px]">
            <h1 className = "font-bold text-center" >To Do Today</h1>
          </div>
        </div> 

        <div className = "flex justify-between gap-[300px]">
          <Link href = "/macrosgraph">
            <Theicon className = "ml-[250px] overflow-hidden relative flex items-center justify-center">
              <Banana className="w-full h-full"></Banana>
            </Theicon>
          </Link>

          <Link href = "/splitchecklist">
            <Theicon className = "mr-[250px] relative overflow-hidden">
              <ListCheck className="w-full h-full"></ListCheck>
            </Theicon>
          </Link>
        </div>

        <div className = "flex justify-between pt-10">
          <div className= "ml-[250px] w-[400px]">
            <h1 className = "font-bold text-center" >Profile Details</h1>
          </div>
          <div className= " mr-[250px] w-[400px]">
            <h1 className = "font-bold text-center" >Ai Chatbot</h1>
          </div>
        </div> 

      <div className = "flex justify-between">
        <Link href = "/myprofile">
          <Theicon className = "ml-[250px] relative overflow-hidden">
              <UserPen className="w-full h-full"></UserPen>
          </Theicon>
        </Link>

        <Link href = "/chatbotai">
          <Theicon className = "mr-[250px] relative overflow-hidden">
              <BrainCircuit className="w-full h-full"></BrainCircuit>
          </Theicon>
        </Link>

      </div>

    </>
  );
}
