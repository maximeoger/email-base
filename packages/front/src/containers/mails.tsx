import { ForwardedRef, forwardRef } from "react";
import MailCard from "../components/mail-card";
import { Masonry } from "react-plock";
interface IProps {
  mails: any[];
}

function MailsContainer({ mails }: IProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <Masonry
      items={mails}
      config={{
        columns: [2, 3, 4, 6],
        gap: [8, 8, 8, 8],
        media: [640, 768, 1024, 1240],
      }}
      render={(item, idx) => (
        <MailCard
          ref={ref}
          key={idx}
          subject={item.subject}
          screenshot={
            item.email_screenshot_email_screenshot_idToemail_screenshot.base_64
          }
          id={item.id}
        />
      )}
    />
  );
}

export default forwardRef(MailsContainer);
