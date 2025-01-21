import { Button, Card } from "@nextui-org/react";
import { CollectionDto } from "shared/types/collection";
import CollectionCard from "src/components/collection-card";

interface IProps {
  data: CollectionDto[];
  onCreateCollectionClick: () => void;
}

export default function CollectionsContainer(props: IProps) {
  const { data, onCreateCollectionClick } = props;
  return (
    <div className="flex flex-wrap gap-4 mt-12">
      {data.map((collection: CollectionDto) => (
        <CollectionCard 
          data={collection} 
          key={collection.id}
        />
      ))}
      <Card
        shadow="none"
        className="min-w-[350px] h-[230px] border border-1 border-grey-300 rounded-md cursor-pointer flex flex-col items-center justify-around"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xl font-semibold">Start a new collection</span>
          <span className="text-md font-regular text-grey-400">Add Emails for inspiration</span>
        </div>
        <Button 
          className="bg-grey-800 text-grey-100 w-fit" 
          onClick={onCreateCollectionClick}
        >
          Create Collection
        </Button>
      </Card>
    </div>
  );
}
