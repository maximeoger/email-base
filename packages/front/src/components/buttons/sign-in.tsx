"use client";
import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";
import GoogleSvg from "../../assets/google.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function SignInButton() {
  const t = useTranslations('components')
  return (
    <Button
      size="md"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="bg-grey-800 text-grey-100 mt-4 flex gap-4"
    >
      <Image priority alt="google logo" src={GoogleSvg} />
      {t("sign_in_button")}
    </Button>
  );
}
