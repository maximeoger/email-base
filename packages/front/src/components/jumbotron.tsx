"use client"
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Jumbotron () {
    const t = useTranslations("pages.index")
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-black text-grey-900">
          {t('jumbotron.text', { count: "15K" })}
        </h1>
        <Link href={"/login"}>
          <Button className="bg-mint-500 text-grey-100">{t('jumbotron.button')}</Button>
        </Link>
      </div>
    )
} 