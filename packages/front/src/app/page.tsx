"use client"
import MailResults from "src/components/mail-results"
import { Button, Link } from "@nextui-org/react"
import PageServiceContainer from "src/components/page-service-container"
import ModalManager from "src/components/modal-manager"

export default function Home() {
  return (
    <PageServiceContainer>
      <div className="w-full">
        <section className="h-[333px] w-full bg-mint-100 px-16 flex flex-col justify-around">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-black text-grey-900">
              Explore <span className="text-mint-500">15K+</span> 
              original emails <br/> of many online brands
            </h1>  
            <Link href={"/login"}>
              <Button className="bg-mint-500 text-grey-100">Get Started</Button>   
            </Link>     
          </div>
        </section>
        <section className="mt-16">
          <MailResults/>
        </section>
      </div>
      <ModalManager/>
    </PageServiceContainer>
  )
}