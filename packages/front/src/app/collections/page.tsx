import CollectionResults from "src/components/collections-results";
import PageServiceContainer from "src/components/page-service-container";

export default function Collections() {
  return (
    <PageServiceContainer>
      <section className="px-20">
        <div className="flex gap-4 flex-wrap">
          {/*<CollectionCard name="Emails" numberOfEmails={12}/>*/}
          <CollectionResults/>
        </div>
      </section>
    </PageServiceContainer>
  )
}