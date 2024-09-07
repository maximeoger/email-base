"use client"
import type { PropsWithChildren } from "react";
import React, { createContext, useContext } from "react";
import type { IServiceContainer } from "../../models/service";

interface IServiceContext {
  container: IServiceContainer | null;
}

interface IServicesProvider extends PropsWithChildren {
  container: IServiceContainer
}

const ServicesContext = createContext<IServiceContext>({
  container: null
})

export const ServicesProvider = ({container, children}: IServicesProvider) => (
  <ServicesContext.Provider value={{container}}>{children}</ServicesContext.Provider>
)

const getServiceID = (service:symbol):string => (typeof service === "symbol" ? service.description : String(service))

export function useInjection<T>(service: symbol): T{
  const {container} = useContext(ServicesContext)
  const serviceId = getServiceID(service)
  if(!container){
      throw new Error(`The container should not be null (id: ${serviceId}`)
  }
  try{
      return container.get<T>(service)
  }
  catch(e){
      throw new Error(`${serviceId} is not a valid service`)
  }
}
