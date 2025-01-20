import type { IServiceContainer } from "./models";

export class ServiceContainer implements IServiceContainer {
  services: Map<symbol, unknown>;

  constructor() {
    this.services = new Map();
  }

  public bind<T>(identifier: symbol, serviceInstance: T) {
    this.services.set(identifier, serviceInstance);
  }

  public get<T>(identifier: symbol): T {
    const service = this.services.get(identifier) as T | undefined;
    if (service) {
      return service;
    }
    throw Error();
  }

  public merge(container: ServiceContainer) {
    container.services.forEach((value, key) => {
      this.bind(key, value);
    });
  }
}
