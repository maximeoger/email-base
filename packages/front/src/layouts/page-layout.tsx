"use client"
import { PropsWithChildren } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ServicesProvider } from "src/core/service";
import { getServiceContainer } from "src/core/service/container";

const serviceContainer = getServiceContainer()
const queryClient = new QueryClient()

export default function PageLayout ({ children }: PropsWithChildren) {
  return (
    <>
      <Header/>
      <main className="bg-gray-100 pt-[66px] flex flex-1">
        <QueryClientProvider client={queryClient}>
          <ServicesProvider container={serviceContainer}>
            {children}
          </ServicesProvider>
        </QueryClientProvider>
      </main>
      <Footer/>
    </>
  )
} 