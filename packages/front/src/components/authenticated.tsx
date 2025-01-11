"use client"
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoggedIn from "./logged-in";

export default function Authenticated () {
  const {data: session} = useSession();

  return (
    <div>
      { session?.user ? (
        <div className="flex gap-4 items-center">
          <LoggedIn 
            userName={session.user.name as unknown as string}
            userImageSrc={session.user.image as unknown as string}
          />
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link href="/login">
            <Button 
              size="md"
              className="bg-grey-800 text-grey-100"
            >
              Log in
            </Button>
          </Link>
        </div> 
      )}
    </div>
  )
}