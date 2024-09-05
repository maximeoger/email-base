import {NextUIProvider} from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ServicesProvider } from '../core/service';
import { getServiceContainer } from "../core/service/container";
import '../index.css'

const container = getServiceContainer()
const queryClient = new QueryClient()

function App({ Component }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <ServicesProvider container={container}>
        <NextUIProvider>
          <Component/>
        </NextUIProvider>
      </ServicesProvider>
    </QueryClientProvider>  
  )
}

export default App
