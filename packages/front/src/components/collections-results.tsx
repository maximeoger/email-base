"use client";
import { useGetCollections } from "src/api/collection/usecases/useGetCollections";
import DataContainer from "./data-container";
import CollectionsContainer from "src/containers/collections";

interface IProps {
  onCreateCollectionClick: () => void;
}

export default function CollectionResults(props: IProps) {
  const { collections, loadingGetCollections, errorGetCollections } = useGetCollections();

  return (
    <DataContainer loading={loadingGetCollections} error={errorGetCollections}>
      <CollectionsContainer 
        data={collections} 
        onCreateCollectionClick={props.onCreateCollectionClick}
      />
    </DataContainer>
  );
}
