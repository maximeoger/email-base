"use client"
import { Button } from "@nextui-org/react";
import { signIn } from '../api/auth';

export default function LoginPage() {
  return (
    <div className="flex flex-1 gap-16">
      <div className="flex-1 bg-white"/>
      <div className="flex-1 flex flex-col justify-around">
        <div>
          <p className="text-3xl font-black">
            <span className="text-main">Sign In</span> to your account
          </p>
          <Button
            size="md"
            onClick={() => signIn()}
            className="bg-main text-white mt-4"
          >
            Sign In with Google
          </Button>
        </div>
      </div>
    </div>
  )
}