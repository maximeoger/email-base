import { Button } from "@nextui-org/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { useAddMailToCollection } from "src/api/mail/usecases/useAddMailToCollection";
import FlexContainer from "../containers/flex-container";

interface IProps {
  data: any;
  mailId: number;
}

export default function AddMailToCollectionCard ({data, mailId} : IProps) {
  const [added, setAdded] = useState(false)
  const { onAddMailToCollection, isAddingMailToCollection } = useAddMailToCollection()

  const handleClickAddToCollection = () => onAddMailToCollection({
    mailId,
    collectionId: data.id
  }).then(() => setAdded(true))

  return (
    <div className="border border-grey-300 p-2 pl-4 rounded-md cursor-pointer flex items-center justify-between">
      <span>{data.name}</span>
      <Button 
        onClick={handleClickAddToCollection}
        className="bg-grey-800 text-grey-100"
        isLoading={isAddingMailToCollection}
        disabled={added}
        size="sm"
      >
        {added ? (
          <FlexContainer className="gap-2">
            <Check size={14}/> Added
          </FlexContainer>
        ): (
          <span>Add to collection</span>
        )}
      </Button>
    </div>
  )
}
