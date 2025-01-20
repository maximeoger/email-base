import { CollectionDto } from "shared/types/collection";
import AddMailToCollectionCard from "src/components/add-mail-to-collection-card";

interface IProps {
  data: CollectionDto[];
  mailId: number;
}

export default function CollectionsSelectorContainer({ data, mailId }: IProps) {
  return (
    <div className="flex flex-col gap-2">
      {data.map((collection: CollectionDto) => (
        <AddMailToCollectionCard 
          data={collection} 
          mailId={mailId}
        />
      ))}
    </div>
  )
}