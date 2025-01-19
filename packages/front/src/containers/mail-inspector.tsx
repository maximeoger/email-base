import { Link, ModalHeader } from "@nextui-org/react";
import { Mail } from "src/models/mail";
import { useSession } from "next-auth/react";
import LogInButton from "src/components/log-in-button";
import CollectionSelector from "src/components/collection-selector";
import FlexContainer from "./flex-container";

interface IProps {
  mailDetails: Mail;
}

function MailInspectorContainer ({mailDetails}: IProps) {
  const { data: session } = useSession();
  const { subject, sender, body_html, id } = mailDetails;

  return (
    <div className="flex h-[80vh]">
      <div className="flex-1 h-full overflow-y-auto rounded-l-md" dangerouslySetInnerHTML={{ __html: body_html }}/>
      <div className="w-[400px]">
        <ModalHeader className="flex flex-col p-4 text-md border-b">
          <span className="text-ellipsis  text-wrap">{subject}</span>
          <div className="flex gap-4 font-medium">
            <span>From: </span>
            <Link href="/" className="color-mint-500 text-underline">{sender.name}</Link>
          </div>
        </ModalHeader>
        <div className="bg-grey-200 m-4 mt-8 rounded-md">
          {
            session?.user ? (
              <div className="p-4 flex flex-col">
                <span className="text-sm font-semibold">Add this email to a collection</span>
                <div className="mt-4">
                  <CollectionSelector mailId={id}/>
                </div>
              </div>  
            ) : (
              <FlexContainer className="flex-col p-4 gap-4">
                <FlexContainer className="flex-col gap-2">
                  <span className="text-md font-semibold">You are not Logged In.</span>
                  <span className="text-sm font-medium text-center font-grey-300">
                    By Loging Into your account, <br/> 
                    you can save this email and manage <br/> 
                    your collections !
                  </span>
                </FlexContainer>
                <div className="mt-4">
                  <LogInButton>Log In</LogInButton>
                </div>
              </FlexContainer>  
            )
          }
        </div>
      </div>
    </div>
  )
} 

export default MailInspectorContainer;