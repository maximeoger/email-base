import { Button } from "@nextui-org/react";
import { Check } from "lucide-react";
import { useAddMailToCollection } from "src/api/mail/usecases/useAddMailToCollection";
import FlexContainer from "../containers/flex-container";
import { CollectionDto } from "shared/types/collection";
import classNames from "classnames";

interface IProps {
  data: CollectionDto;
  mailId: number;
}

export default function AddMailToCollectionCard({ data, mailId }: IProps) {
  const { onAddMailToCollection, isAddingMailToCollection } =
    useAddMailToCollection();

  const handleClickAddToCollection = () =>
    onAddMailToCollection({
      mailId,
      collectionId: data.id,
    });

  const added = Boolean(data.emailIds.find((id) => mailId == id));

  return (
    <div className="border border-grey-300 p-2 pl-4 rounded-md cursor-pointer flex items-center justify-between">
      <span>{data.name}</span>
      <Button
        onClick={handleClickAddToCollection}
        className={classNames("bg-grey-800 text-grey-100", {
          "bg-grey-400": added,
        })}
        isLoading={isAddingMailToCollection}
        disabled={added}
        size="sm"
      >
        {added ? (
          <FlexContainer className="gap-2">
            <Check size={14} /> Added
          </FlexContainer>
        ) : (
          <span>Add to collection</span>
        )}
      </Button>
    </div>
  );
}
