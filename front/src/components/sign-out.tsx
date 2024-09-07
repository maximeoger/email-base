"use client"
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
 
export default function SignOut() {
  return (
    <Button variant="bordered" size="sm" onClick={() => signOut()} type="submit">Sign Out</Button>
  )
} 