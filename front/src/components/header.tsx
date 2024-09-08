"use client"
import { useSession } from "next-auth/react"
import SignIn from "./sign-in"
import SignOut from "./sign-out"
import Image from "next/image"
import logo from "../assets/logo.svg"
import SignUp from "./sign-up"

export default function Header() {
  const { data: session } = useSession()

  return (
    <div className="mx-auto px-8 py-4 fixed z-[40] bg-white left-0 right-0 flex justify-between items-center">
      <p className="leading-9 uppercase font-bold">
        <Image 
          priority 
          alt="email base logo" 
          src={logo}
        />
      </p>
      <div>
      { session?.user ? (
        <div className="flex gap-4 items-center">
          <span>Logged in as : {session.user.email}</span>
          <SignOut/>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <SignIn/>
          <SignUp/>
        </div> 
      )}
      </div>
    </div>
  )
}