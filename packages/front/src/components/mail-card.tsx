import { ForwardedRef, forwardRef } from "react";
import { useModal } from "src/hooks/useModal";
import MailInspectorModal from "./modals/mail-inspector-modal";

interface IProps {
  subject: string;
  screenshot: string;
  id: string;
}

 function MailCard (props: IProps, ref: ForwardedRef<HTMLDivElement>) {
  const { openModal, closeModal } = useModal();

  const openMailInspector = () => openModal(
    <MailInspectorModal
      title={props.subject}
      mailId={props.id}
      onCancel={closeModal}
      actionText="add to collection"
      cancelText="close"
    />, 
    { size: "4xl" }
  )

  return (
    <div 
      ref={ref}
      onClick={openMailInspector} 
      className={"border-1 rounded-sm hover:border-grey hover:cursor-pointer hover:border-black"}
    >
      <img src={props.screenshot}/>
    </div>
  )
}

export default forwardRef(MailCard)