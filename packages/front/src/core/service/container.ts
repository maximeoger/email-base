import { CollectionAPIRepository, MailAPIRepository } from "../api/repositories";
import { IMailAPIRepository, MailAPIRepositoryUID } from "../../models/api/mails";
import { CollectionAPIRepositoryUID, ICollectionAPIRepository } from "src/models/api/collections";

import { ServiceContainer } from "../../models/service";

export function getServiceContainer (): ServiceContainer {
  const container = new ServiceContainer()
  const mailRepository = new MailAPIRepository();
  const collectionRepository = new CollectionAPIRepository();

  container.bind<IMailAPIRepository>(MailAPIRepositoryUID, mailRepository);
  container.bind<ICollectionAPIRepository>(CollectionAPIRepositoryUID, collectionRepository)

  return container
}