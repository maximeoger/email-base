"use client"
import { useGetCollections } from "src/api/collection/usecases/useGetCollections";
import DataContainer from "./data-container";
import CollectionsContainer from "src/containers/collections";

export default function CollectionResults() {
  const { collections, loadingGetCollections, errorGetCollections } = useGetCollections()

  return (
    <DataContainer loading={loadingGetCollections} error={errorGetCollections}>
      <CollectionsContainer data={collections}/>
    </DataContainer>
  )
}