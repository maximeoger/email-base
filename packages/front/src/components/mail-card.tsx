import { ForwardedRef, forwardRef } from "react";
import { useModal } from "src/hooks/useModal";
import MailInspectorModal from "./modals/mail-inspector-modal";
import useMediaQuery from "src/hooks/useMediaQuery";
import { Breakpoints } from "src/models/breakpoints";

interface IProps {
  subject: string;
  screenshot: string;
  id: string;
}

function MailCard(props: IProps, ref: ForwardedRef<HTMLDivElement>) {
  const isMd = useMediaQuery(Breakpoints.md);
  const isLg = useMediaQuery(Breakpoints.lg);
  const isXl = useMediaQuery(Breakpoints.xl);
 
  const { openModal, closeModal } = useModal();

  const size = () => {
    if (isMd) return "full"
    if (isLg) return "3xl"
    if (isXl) return "4xl"
    return "5xl"
  }

  const openMailInspector = () =>
    openModal(
      <MailInspectorModal
        title={props.subject}
        mailId={props.id}
        onCancel={closeModal}
        actionText="add to collection"
        cancelText="close"
      />,
      { size: size() },
    );

  return (
    <div
      ref={ref}
      onClick={openMailInspector}
      className={
        "border-1 rounded-sm hover:border-grey hover:cursor-pointer hover:border-black"
      }
    >
      <img src={props.screenshot} />
    </div>
  );
}

export default forwardRef(MailCard);
