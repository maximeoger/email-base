"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ServicesProvider } from "src/core/service"
import { getServiceContainer } from "src/core/service/container"
import MailResults from "./mail-results"
import { Button } from "@nextui-org/react"
import Link from "next/link"

const serviceContainer = getServiceContainer()
const queryClient = new QueryClient()

export default function HomePage () {

  return (
    <QueryClientProvider client={queryClient}>
      <ServicesProvider container={serviceContainer}>
        <div>
          <section className="h-[333px] bg-main px-16 flex flex-col justify-around">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-black text-white">
                Explore <span className="text-black">15K+</span> 
                original emails <br/> of many online brands
              </h1>  
              <Link href={"/login"}>
                <Button className="bg-white text-main">Get Started</Button>   
              </Link>     
            </div>
          </section>
          <section className="mt-16">
            <MailResults/>
          </section>
        </div>
      </ServicesProvider>
    </QueryClientProvider>
  )
}

