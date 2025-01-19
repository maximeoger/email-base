import { CollectionDto } from "shared/types/collection";
import CollectionCard from "src/components/collection-card";

interface IProps {
  data: CollectionDto[];
}

export default function CollectionsContainer({ data }: IProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-12">
      {data.map((collection: any) => (
        <CollectionCard 
          name={collection.name} 
          numberOfEmails={collection.numberOfEmails} id={collection.id}
        />
      ))}
    </div>
  )
}