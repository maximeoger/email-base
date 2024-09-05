import MailCard from "../components/mail-card";

interface IProps {
  mails: any[]
}

export default function MailsContainer({ mails }: IProps) {
  return (
    <div className="mt-0 mx-auto w-fit grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {mails.map((mail) => (
        <MailCard 
          key={mail.uid}
          sender={mail.sender[0].name} 
          subject={mail.subject} 
        />
      ))}
    </div>
  )
}