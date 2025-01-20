import {
  CollectionAPIRepository,
  MailAPIRepository,
} from "../api/repositories";
import {
  IMailAPIRepository,
  MailAPIRepositoryUID,
} from "../../models/api/mails";
import {
  CollectionAPIRepositoryUID,
  ICollectionAPIRepository,
} from "src/models/api/collections";

import { ServiceContainer } from "../../models/service";
import { APIInstance } from "src/models/api";

export function getServiceContainer(instance: APIInstance): ServiceContainer {
  const container = new ServiceContainer();

  const mailRepository = new MailAPIRepository(instance);
  const collectionRepository = new CollectionAPIRepository(instance);

  container.bind<IMailAPIRepository>(MailAPIRepositoryUID, mailRepository);
  container.bind<ICollectionAPIRepository>(
    CollectionAPIRepositoryUID,
    collectionRepository,
  );

  return container;
}
