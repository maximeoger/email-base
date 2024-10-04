"use client"
import { Button } from "@nextui-org/react";
import { signIn } from "src/api/auth";
 
export default function SignInButton() {
  return (
    <Button
      size="md"
      onClick={() => signIn()}
      className="bg-main text-white mt-4"
    >
      Sign In with Google
    </Button>
  )
} 