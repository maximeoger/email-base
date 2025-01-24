"use client";
import { GalleryVertical, LogOut } from "lucide-react";
import Image from "next/image";
import { DropdownOption } from "src/models/dropdown";
import DropdownWrapper from "./dropdown-wrapper";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

interface IProps {
  userImageSrc: string;
  userName: string;
}

export default function LoggedIn(props: IProps) {
  const t = useTranslations("components.header")
  const router = useRouter();

  const options: Array<DropdownOption> = [
    {
      name: t('authenticated_dropdown.collections'),
      onClick: () => router.push("/collections"),
      startContent: <GalleryVertical />,
      className: "",
      color: "default",
    },
    {
      name: t('authenticated_dropdown.log_out'),
      onClick: () => signOut(),
      startContent: <LogOut />,
      className: "",
      color: "default",
    },
  ];

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
  );
}
