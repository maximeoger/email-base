import { Button } from "@nextui-org/react";
import CollectionResults from "./collections-results";
import ModalManager from "./modal-manager";
import { useCollectionModals } from "src/hooks/useCollectionModals";
import { useTranslations } from "next-intl";

export default function CollectionPage () {
  const t = useTranslations("pages.collections")
  const { openCreateCollectionModal } = useCollectionModals()

  return (
    <>
      <section className="p-4 md:px-20 md:mt-20">
        <Button 
          className="bg-grey-800 text-grey-100" 
          onClick={openCreateCollectionModal}
          >
            {t('create_collection_button')}
        </Button>
        <div className="flex gap-4 flex-wrap">
          <CollectionResults 
            onCreateCollectionClick={openCreateCollectionModal}
          />
        </div>
      </section>
      <ModalManager />
    </>
  )
}