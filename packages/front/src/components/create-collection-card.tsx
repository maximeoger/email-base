import { Button, Card } from "@nextui-org/react";
import { useTranslations } from "next-intl";

interface IProps {
  onCreateCollectionClick: () => void;
}

export default function CreateCollectionCard (props: IProps) {
  const t = useTranslations("components.create_collection_card");

  return (
    <Card
      shadow="none"
      className="min-w-[350px] h-[230px] border border-1 border-grey-300 rounded-md cursor-pointer flex flex-col items-center justify-around"
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold">{t('title')}</span>
        <span className="text-md font-regular text-grey-400">{t("text")}</span>
      </div>
      <Button 
        className="bg-grey-800 text-grey-100 w-fit" 
        onClick={props.onCreateCollectionClick}
      >
        {t("button")}
      </Button>
    </Card>
  )
}