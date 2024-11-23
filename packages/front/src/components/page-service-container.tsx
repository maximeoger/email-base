"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ServicesProvider } from "src/core/service";
import { getServiceContainer } from "src/core/service/container";

const serviceContainer = getServiceContainer()
const queryClient = new QueryClient()

export default function PageServiceContainer ({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ServicesProvider container={serviceContainer}>
        { children }
      </ServicesProvider>
    </QueryClientProvider>
  )
}

