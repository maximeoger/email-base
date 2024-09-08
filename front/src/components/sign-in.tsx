"use client"
import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
 
export default function SignIn() {
  return (
    <Button 
      variant="light"
      size="sm" 
      onClick={() => signIn("google")} 
      type="submit">Sign In
    </Button>
  )
} 