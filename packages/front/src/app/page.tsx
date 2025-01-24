"use client"
import { useTranslations } from "next-intl";
import Link from "next/link";
import PageServiceContainer from "../components/page-service-container";
import MailResults from "../components/mail-results";
import ModalManager from "../components/modal-manager";
import { Button } from "@nextui-org/react";

export default async function Home() {
  const t = useTranslations("pages.index")
  
  return (
    <PageServiceContainer>
      <div className="w-full">
        <section className="h-[333px] w-full bg-mint-100 px-16 flex flex-col justify-around">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-black text-grey-900">
              { t('jumbotron.text', { count: "15K" }) }
            </h1>
            <Link href={"/login"}>
              <Button className="bg-mint-500 text-grey-100">{t('jumbotron.button')}</Button>
            </Link>
          </div>
        </section>
        <section className="mt-16">
          <MailResults />
        </section>
      </div>
      <ModalManager />
    </PageServiceContainer>
  );
}
