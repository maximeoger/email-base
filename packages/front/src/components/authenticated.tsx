"use client"
import { Button } from "@nextui-org/react";
import Link from "next/link";
import SignOut from "./sign-out";
import { useSession } from "next-auth/react";

export default function Authenticated () {
  const {data: session} = useSession();

  return (
    <div>
      { session?.user ? (
        <div className="flex gap-4 items-center">
          <Link href="/collections">my collections</Link>
          <span>Logged in as : {session.user.email}</span>
          <SignOut/>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link href="/login">
            <Button 
              size="md"
              className="bg-grey-800 text-grey-100"
            >Log in</Button>
          </Link>
          
        </div> 
      )}
    </div>
  )
}