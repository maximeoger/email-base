import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function LogInButton () {
  return (
    <Link href="/login">
      <Button 
        size="md"
        className="bg-grey-800 text-grey-100"
      >
        Log in
      </Button>
    </Link>
  )
} 