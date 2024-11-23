import { Button, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react"
import { BaseModalProps } from "src/models/modal";

interface IProps extends BaseModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal (props: IProps) {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{props.title}</ModalHeader>
      <ModalBody>
        {props.message}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={props.onCancel}>
          {props.cancelText}
        </Button>
        <Button color="primary" onPress={props.onConfirm}>
          {props.actionText}
        </Button>
      </ModalFooter>
    </>
  )
}
