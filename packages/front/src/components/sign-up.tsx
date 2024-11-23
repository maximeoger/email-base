"use client"
import { Button } from "@nextui-org/react";
import Link from "next/link";
 
export default function SignUp() {
  return (
    <Link href="/login">
      <Button 
        className="bg-grey-800 text-white"
        size="sm" 
        type="submit">Sign Up
      </Button>
    </Link>
  )
}