import { BaseModalProps } from "src/models/modal";
import DataContainer from "../data-container";
import { useGetMailDetails } from "src/api/mail/usecases/useGetMailDetails";
import MailInspectorContainer from "src/containers/mail-inspector";

interface IProps extends BaseModalProps {
  mailId: string;
  onCancel: () => void;
}

export default function MailInspectorModal(props: IProps) {
  const { mail, loadingGetMailDetails, errorGetMailDetails } = useGetMailDetails(props.mailId);

  const isLoading = loadingGetMailDetails;
  const isError = errorGetMailDetails;

  return (
    <DataContainer loading={isLoading} error={isError}>
      <MailInspectorContainer mailDetails={mail!} />
    </DataContainer>
  );
}
