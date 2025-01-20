import { Card, CardFooter } from "@nextui-org/react";
import { Ellipsis, Trash2 } from "lucide-react";
import { useDeleteCollection } from "src/api/collection/usecases/useDeleteCollection";
import { useModal } from "src/hooks/useModal";
import ConfirmModal from "./modals/confirm-modal";
import DropdownWrapper from "./dropdown-wrapper";
import FlexContainer from "../containers/flex-container"; // Import FlexContainer

interface IProps {
  id: number;
  name: string;
  numberOfEmails: number;
}

export default function CollectionCard (props: IProps) {
  const { name, numberOfEmails } = props;
  const { onDeleteCollection } = useDeleteCollection()
  const { openModal, closeModal } = useModal()

  const cardOptions = [
    {
      onClick: () => openConfirmModal(),
      name: "Delete collection",
      color: "default",
      className: "text-danger",
      startContent: <Trash2/>
    }
  ]

  const handleConfirm = () => onDeleteCollection(`${props.id}`).then(() => closeModal())

  const openConfirmModal = () => openModal(
    <ConfirmModal
      title="Delete collection"
      message={`Are you sure you want to delete collection ${props.name} ?`}
      cancelText="No get back"
      actionText="yes delete it"
      onCancel={() => closeModal()}
      onConfirm={handleConfirm}
    />,
    { size: "xl" }
  )

  return (
    <Card shadow="none" className="min-w-[350px] border border-1 border-grey-300 rounded-md">
      <FlexContainer className="bg-grey-200 h-[150px] justify-around">
        <FlexContainer className="gap-4 items-bottom px-14">
          <div className="h-[80px] w-[90px] bg-grey-400"></div>
          <div className="h-[130px] w-[90px] bg-grey-400"></div>
          <div className="h-[50px] w-[90px] bg-grey-400"></div>
        </FlexContainer>
      </FlexContainer>
      <CardFooter className="border-top-1 border-grey-300 flex justify-between">
        <FlexContainer className="flex-col gap-2">
          <p className="capitalize font-medium">{name}</p>
          <span className="capitalize font-regular">{numberOfEmails} emails</span>
        </FlexContainer>
        <div className="px-4">
          <DropdownWrapper 
            placement="bottom-end" 
            //@ts-ignore
            options={cardOptions}
          >
            <Ellipsis className="cursor-pointer"/>
          </DropdownWrapper>
        </div>
      </CardFooter>
    </Card>
  )  
}