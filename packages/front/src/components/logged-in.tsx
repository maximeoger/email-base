"use client"
import { GalleryVertical, LogOut } from "lucide-react";
import Image from "next/image";
import { DropdownOption } from "src/models/dropdown";
import DropdownWrapper from "./dropdown-wrapper";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface IProps {
  userImageSrc: string;
  userName: string;
}

export default function LoggedIn (props: IProps) {
  const router = useRouter()

  const options : Array<DropdownOption> = [
    {
      name: "Collections",
      onClick: () => router.push('/collections'),
      startContent: <GalleryVertical/>,
      className: "",
      color: "default"
    }, 
    {
      name: "Log out",
      onClick: () => signOut(),
      startContent: <LogOut/>,
      className: "",
      color: "default"
    }
  ]

  return (
    <DropdownWrapper options={options} placement="bottom-start">
      <Image 
        className="rounded-full cursor-pointer" 
        src={props.userImageSrc} 
        width={24} 
        height={24} 
        alt="user avatar"
      />
    </DropdownWrapper>
  )
}