"use client"
import { useGetCollections } from "src/api/collection/usecases/useGetCollections";
import DataContainer from "./data-container";
import CollectionsContainer from "src/containers/collections";

export default function CollectionResults() {
  const { collections, loading, error } = useGetCollections()

  return (
    <DataContainer loading={loading} error={error}>
      <CollectionsContainer data={collections}/>
    </DataContainer>
  )
}