import { Link, ModalHeader } from "@nextui-org/react";
import { Mail } from "src/models/mail";
import { useSession } from "next-auth/react";
import LogInButton from "src/components/log-in-button";
import CollectionSelector from "src/components/collection-selector";

interface IProps {
  mailDetails: Mail;
}

function MailInspectorContainer ({mailDetails}: IProps) {
  const { data: session } = useSession();
  const { subject, sender, body_html, id } = mailDetails

  return (
    <div className="flex h-[80vh]">
      <div className="h-full overflow-y-auto rounded-l-md" dangerouslySetInnerHTML={{ __html: body_html }}/>
      <div>
        <ModalHeader className="flex flex-col p-4 text-md border-b">
          <div>
            <span>Subject: </span>
            <span className="text-ellipsis max-w-[350px] text-wrap">{subject}</span>
          </div>
          <div className="flex gap-4 font-medium">
            <span>From: </span>
            <Link href="/" className="color-mint-500 text-underline">{sender.name}</Link>
          </div>
        </ModalHeader>
        {
          session?.user ? (
            <div className="p-4 flex flex-col">
              <span className="text-sm font-semibold">Add this email to a collection</span>
              <div className="w-[350px] mt-4">
                <CollectionSelector mailId={id}/>
              </div>
            </div>  
          ) : (
            <div className="p-4 flex flex-col">
              <span className="text-sm font-semibold">Log in to save this email to your collection !</span>
              <div className="w-[350px] mt-4">
                <LogInButton/>
              </div>
            </div>  
          )
        }
      </div>
    </div>
  )
} 

export default MailInspectorContainer;