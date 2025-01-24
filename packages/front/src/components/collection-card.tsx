import { Card, CardFooter } from "@nextui-org/react";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import DropdownWrapper from "./dropdown-wrapper";
import FlexContainer from "../containers/flex-container";
import { CollectionDto } from "shared/types/collection";
import { useCollectionModals } from "../hooks/useCollectionModals";
import { useTranslations } from "next-intl";

interface IProps {
  data: CollectionDto;
}

export default function CollectionCard({ data }: IProps) {
  const t = useTranslations('components.collection_card');
  const { 
    openConfirmModal,
    openEditCollectionModal
  } = useCollectionModals({ data });

  const { name, emailIds, screenshots } = data;
  
  const cardOptions = [
    {
      onClick: () => openConfirmModal(data.name),
      name: t("options_dropdown.delete"),
      color: "default",
      className: "text-danger",
      startContent: <Trash2 />,
    },
    {
      onClick: () => openEditCollectionModal(),
      name: t("options_dropdown.edit"),
      color: "default",
      startContent: <Edit/>
    }
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
