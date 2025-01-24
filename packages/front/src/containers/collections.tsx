import { CollectionDto } from "shared/types/collection";
import CollectionCard from "src/components/collection-card";
import CreateCollectionCard from "src/components/create-collection-card";

interface IProps {
  data: CollectionDto[];
  onCreateCollectionClick: () => void;
}

export default function CollectionsContainer(props: IProps) {
  const { 
    data, 
    onCreateCollectionClick 
  } = props;
  
  return (
    <div className="flex flex-wrap gap-4 mt-12">
      {data.map((collection: CollectionDto) => (
        <CollectionCard 
          data={collection} 
          key={collection.id}
        />
      ))}
      <CreateCollectionCard onCreateCollectionClick={onCreateCollectionClick}/>
    </div>
  );
}
