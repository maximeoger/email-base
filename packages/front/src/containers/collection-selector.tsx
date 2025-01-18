import AddMailToCollectionCard from "src/components/add-mail-to-collection-card";

interface IProps {
  data: any;
  mailId: number;
}

export default function CollectionsSelectorContainer({ data, mailId }: IProps) {
  return (
    <div className="flex flex-col gap-2">
      {data.map((collection: any) => (
        <AddMailToCollectionCard data={collection} mailId={mailId}/>
      ))}
    </div>
  )
}