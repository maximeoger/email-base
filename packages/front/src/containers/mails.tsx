import { ForwardedRef, forwardRef } from "react";
import MailCard from "../components/mail-card";
import { Masonry } from "react-plock";
interface IProps {
  mails: any[]
}

function MailsContainer( { mails }: IProps, ref: ForwardedRef<HTMLDivElement> ) {
  return (
    <Masonry
      items={mails}
      config={{
        columns: [2, 3, 4, 6],
        gap: [8, 8, 8, 8],
        media: [640, 768, 1024, 1240],
      }}
      render={(item, idx) => (
        <MailCard
          ref={ref}
          key={idx}
          screenshot={item.screenshot.base_64}
          sender={item.sender.name} 
          subject={item.subject} 
        />
      )}
    />
  )
}

export default forwardRef(MailsContainer)