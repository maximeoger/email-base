import { ServiceContainer } from "./utils";

export interface IServiceContainer {
  bind: <T>(identifier: symbol, serviceInstance: T) => void;
  get: <T>(identifier: symbol) => T;
  merge: (container: ServiceContainer) => void;
}
