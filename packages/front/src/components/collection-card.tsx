import { Card, CardFooter } from "@nextui-org/react";
import DropdownButton from "./buttons/dropdown-button";
import { Trash2 } from "lucide-react";
import { useDeleteCollection } from "src/api/collection/usecases/useDeleteCollection";
import { useModal } from "src/hooks/useModal";
import ConfirmModal from "./modals/confirm-modal";

interface IProps {
  id: string;
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
      color: "danger",
      className: "text-danger",
      startContent: <Trash2/>
    }
  ]


  const openConfirmModal = () => openModal(
    <ConfirmModal
      title="Delete collection"
      message={`Are you sure you want to delete collection ${props.name} ?`}
      cancelText="No get back"
      actionText="yes delete it"
      onCancel={() => closeModal()}
      onConfirm={() => onDeleteCollection(props.id)}
    />
  )

  return (
    <Card shadow="none" className="min-w-[350px] border border-1 border-grey-300">
      <div className="bg-grey-200 h-[150px] flex justify-around">
        <div className="flex gap-4 items-end px-14">
          <div className="h-[80px] w-[90px] bg-grey-400"></div>
          <div className="h-[130px] w-[90px] bg-grey-400"></div>
          <div className="h-[50px] w-[90px] bg-grey-400"></div>
        </div>
      </div>
      <CardFooter className="border-top-1 border-grey-300 flex justify-between">
        <div className="flex flex-col gap-2">
          <p className="capitalize font-medium">{name}</p>
          <span className="capitalize font-regular">{numberOfEmails} emails</span>
        </div>
        <div className="px-4">
          <DropdownButton options={cardOptions}/>
        </div>
      </CardFooter>
    </Card>
  )  
}