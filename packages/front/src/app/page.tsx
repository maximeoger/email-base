import PageServiceContainer from "../components/page-service-container";
import MailResults from "../components/mail-results";
import ModalManager from "../components/modal-manager";
import Jumbotron from "src/components/jumbotron";
import { SenderApiRepository } from "src/core/api/repositories/sender";
import SendersResults from "src/components/senders-results";


export default async function Home() {
  
  const api = new SenderApiRepository()

  const senders = await api.getSenders()

  return (
    <PageServiceContainer>
      <div className="w-full">
        <section className="h-[333px] w-full bg-mint-100 px-16 flex flex-col justify-around">
          <Jumbotron/>
        </section>
        <section className="p-4 bg-white sticky top-0 z-50">
          <SendersResults senders={senders}/>
        </section>
        <section className="mt-16">
          <MailResults />
        </section>
      </div>
      <ModalManager />
    </PageServiceContainer>
  );
}
