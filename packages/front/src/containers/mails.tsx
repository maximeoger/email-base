import MailCard from "../components/mail-card";
import { Masonry } from "react-plock";
interface IProps {
  mails: any[]
}

export default function MailsContainer({ mails }: IProps) {
  return (
    <Masonry
      className="px-24"
      items={mails}
      config={{
        columns: [2, 3, 4, 5],
        gap: [12, 16, 20, 24],
        media: [640, 768, 1024, 1240],
      }}
      render={(item, idx) => (
        <MailCard
          key={idx}
          screenshot={item.screenshot.base_64}
          sender={item.sender.name} 
          subject={item.subject} 
        />
      )}
    />
  )
}