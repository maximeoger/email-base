"use client";
import { PropsWithChildren, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ServicesProvider } from "src/core/service";
import { getServiceContainer } from "src/core/service/container";
import { useSession } from "next-auth/react";
import { API_TIMEOUT_MS } from "src/models/api";
import axios from "axios";

const queryClient = new QueryClient();

export default function PageServiceContainer({ children }: PropsWithChildren) {
  const { data: session } = useSession();

  const instance = useMemo(
    () =>
      axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        timeout: API_TIMEOUT_MS,
        withCredentials: true,
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${session?.user?.jwt}`,
        },
      }),
    [session],
  );

  const serviceContainer = getServiceContainer(instance);

  return (
    <QueryClientProvider client={queryClient}>
      <ServicesProvider container={serviceContainer}>
        {children}
      </ServicesProvider>
    </QueryClientProvider>
  );
}
