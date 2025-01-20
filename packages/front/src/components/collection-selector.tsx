import { useGetCollections } from "src/api/collection/usecases/useGetCollections";
import DataContainer from "./data-container";
import CollectionsSelectorContainer from "src/containers/collection-selector";

interface IProps {
  mailId: number;
}

export default function CollectionSelector(props: IProps) {
  const { mailId } = props;
  const { collections, loadingGetCollections, errorGetCollections } =
    useGetCollections();
  return (
    <DataContainer loading={loadingGetCollections} error={errorGetCollections}>
      <CollectionsSelectorContainer data={collections} mailId={mailId} />
    </DataContainer>
  );
}
