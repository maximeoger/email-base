"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ServicesProvider } from "src/core/service"
import { getServiceContainer } from "src/core/service/container"
import MailResults from "./mail-results"

const serviceContainer = getServiceContainer()
const queryClient = new QueryClient()

export default function HomePage () {

  return (
    <QueryClientProvider client={queryClient}>
      <ServicesProvider container={serviceContainer}>
        <MailResults/>
      </ServicesProvider>
    </QueryClientProvider>
  )
}

