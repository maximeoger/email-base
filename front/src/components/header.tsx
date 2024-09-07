"use client"
import { useSession } from "next-auth/react"
import SignIn from "./sign-in"
import SignOut from "./sign-out"

export default function Header() {
  const { data: session } = useSession()

  return (
    <div className="mx-auto px-8 py-4 fixed z-[40] bg-white left-0 right-0 flex justify-between items-center">
      <p className="leading-9 uppercase font-bold">
        <span>email</span>
        &nbsp;
        <span className="text-blue-500">base</span>
      </p>
      <div>
      { session?.user ? (
        <div className="flex gap-4 items-center">
          <span>Logged in as : {session.user.email}</span>
          <SignOut/>
        </div>
      ) : <SignIn/> }
      </div>
    </div>
  )
}