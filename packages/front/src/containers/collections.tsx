import CollectionCard from "src/components/collection-card";

interface IProps {
  data: any;
}

export default function CollectionsContainer({ data }: IProps) {
  return (
    <div className="flex flex-wrap gap-4 mt-28">
      {data.map((collection: any) => (
        <CollectionCard name={collection.name} numberOfEmails={4} id={collection.id}/>
      ))}
    </div>
  )
}