import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react"
import { BaseModalProps } from "src/models/modal";
import DataContainer from "../data-container";
import { useGetMailDetails } from "src/api/mail/usecases/useGetMailDetails";
import Link from "next/link";


interface IProps extends BaseModalProps {
  mailId: string;
  onCancel: () => void;
}

export default function MailInspectorModal (props: IProps) {
  const { mail, loading, error } = useGetMailDetails(props.mailId)


  if (!mail) return null


  return (
    <DataContainer loading={loading} error={error}>
      <>
        <ModalHeader className="flex flex-col gap-1">
          <div>
            <span>{mail.subject}</span>
          </div>
          <div className="flex gap-4 font-medium">
            <span>From: </span>
            <Link href="/" className="color-main text-underline">{mail.sender.name}</Link>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='max-h-[600px]' dangerouslySetInnerHTML={{ __html: mail.body_html }}/>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={props.onCancel}>
            Add to collection
          </Button>
        </ModalFooter>
      </>
    </DataContainer>
  )
}
