import logo from "../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Authenticated from "./authenticated";

export default function Header() {
  return (
    <div className="mx-auto px-8 py-4 bg-white flex justify-between items-center">
      <Link href="/">
        <p className="leading-9 uppercase font-bold">
          <Image priority alt="email base logo" src={logo} />
        </p>
      </Link>
      <Authenticated />
    </div>
  );
}
