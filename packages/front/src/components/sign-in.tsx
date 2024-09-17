"use client"
import { Button } from "@nextui-org/react";
import Link from "next/link";
 
export default function SignIn() {
  return (
    <Link href="/login">
      <Button 
        variant="light"
        size="sm" 
        type="submit">Sign In
      </Button>
    </Link>
  )
} 