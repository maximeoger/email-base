import { MailAPIRepository } from "../api/repositories";
import { IMailAPIRepository, MailAPIRepositoryUID } from "../../models/api/mails";
import { ServiceContainer } from "../../models/service";

export function getServiceContainer (): ServiceContainer {
  const container = new ServiceContainer()
  const mailRepository = new MailAPIRepository();

  container.bind<IMailAPIRepository>(MailAPIRepositoryUID, mailRepository);

  return container
}