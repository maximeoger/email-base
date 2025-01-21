import { Card, CardFooter } from "@nextui-org/react";
import { Ellipsis, Trash2 } from "lucide-react";
import { useDeleteCollection } from "src/api/collection/usecases/useDeleteCollection";
import { useModal } from "src/hooks/useModal";
import ConfirmModal from "./modals/confirm-modal";
import DropdownWrapper from "./dropdown-wrapper";
import FlexContainer from "../containers/flex-container";
import { CollectionDto } from "shared/types/collection";

interface IProps {
  data: CollectionDto;
}

export default function CollectionCard({ data }: IProps) {
  const { name, emailIds, screenshots } = data;
  const { onDeleteCollection } = useDeleteCollection();
  const { openModal, closeModal } = useModal();

  const handleConfirm = () =>
    onDeleteCollection(`${data.id}`).then(() => closeModal());

  const openConfirmModal = () =>
    openModal(
      <ConfirmModal
        title="Delete collection"
        message={`Are you sure you want to delete collection ${name} ?`}
        cancelText="No get back"
        actionText="yes delete it"
        onCancel={() => closeModal()}
        onConfirm={handleConfirm}
      />,
      { size: "xl" },
    );

  const cardOptions = [
    {
      onClick: () => openConfirmModal(),
      name: "Delete collection",
      color: "default",
      className: "text-danger",
      startContent: <Trash2 />,
    },
  ];

  return (
    <Card
      shadow="none"
      isHoverable={true}
      className="min-w-[350px] border border-1 border-grey-300 rounded-md cursor-pointer"
    >
      <div className="flex flex-col bg-grey-200 h-[150px] justify-end">
        <FlexContainer className="gap-4 items-end px-8">
          {screenshots.map((screenshot, index) => (
            <img
              className="h-[110px] w-[100px] bg-grey-400"
              key={index}
              src={screenshot}
            />
          ))}
        </FlexContainer>
      </div>
      <CardFooter className="border-top-1 border-grey-300 flex justify-between">
        <FlexContainer className="flex-col gap-2">
          <p className="capitalize font-medium">{name}</p>
          <span className="capitalize font-regular">
            {emailIds.length} emails
          </span>
        </FlexContainer>
        <div className="px-4">
          <DropdownWrapper
            placement="bottom-end"
            //@ts-ignore
            options={cardOptions}
          >
            <Ellipsis className="cursor-pointer" />
          </DropdownWrapper>
        </div>
      </CardFooter>
    </Card>
  );
}
