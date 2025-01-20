import { Button } from "@nextui-org/react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function LogInButton(props: PropsWithChildren) {
  return (
    <Link href="/login">
      <Button size="md" className="bg-grey-800 text-grey-100">
        {props.children}
      </Button>
    </Link>
  );
}
