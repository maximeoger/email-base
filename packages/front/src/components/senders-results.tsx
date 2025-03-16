import type { InferGetServerSidePropsType } from 'next'
import SendersContainer from 'src/containers/senders'
import { SenderApiRepository } from "src/core/api/repositories/sender"

export async function getServerSideProps () {  
  const api = new SenderApiRepository()

  return {
    props: {
      senders: await api.getSenders()
    }
  }
}

export default function SendersResults ({ senders }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="sticky top-0">
      <SendersContainer data={senders}/>
    </div>
  )  
}