import Link from "next/link"
import logo from "../assets/logo.svg"
import Image from "next/image"

export default function Footer() {
  return (
    <div className="px-8 py-4 bg-white flex flex-col gap-8 items-center py-16">
      <Image 
        priority 
        alt="email base logo" 
        src={logo}
      />
      <div className="flex gap-16">
        <Link className="hover:underline" href="/">Terms</Link>
        <Link className="hover:underline" href="/">Privacy</Link>
        <Link className="hover:underline" href="/">Legal</Link>
        <Link className="hover:underline" href="/">Contact</Link>
      </div>
    </div>
  )
}
