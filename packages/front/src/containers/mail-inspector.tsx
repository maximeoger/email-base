import { Link, ModalHeader } from "@nextui-org/react";
import { Mail } from "src/models/mail";
import { useSession } from "next-auth/react";
import LogInButton from "src/components/log-in-button";
import CollectionSelector from "src/components/collection-selector";
import FlexContainer from "./flex-container";
import { useTranslations } from "next-intl";

interface IProps {
  mailDetails: Mail;
}

function MailInspectorContainer({ mailDetails }: IProps) {
  const { data: session } = useSession();
  const { subject, sender, body_html, id } = mailDetails;

  const t = useTranslations("components.mail_inspector");

  return (
    <div className="flex flex-col md:flex-row h-[100vh] md:h-[80vh]">
      <div
        className="flex-1 h-full overflow-y-auto rounded-l-md"
        dangerouslySetInnerHTML={{ __html: body_html }}
      />
      <div className="w-full md:w-[300px] xl:w-[360px]">
        <ModalHeader className="flex flex-col p-4 text-md border-t md:border-none">
          <span className="text-ellipsis  text-wrap">{subject}</span>
          <div className="flex gap-4 font-medium">
            <span>{t("from")}</span>
            <Link href="/" className="color-mint-500 text-underline">
              {sender.name}
            </Link>
          </div>
        </ModalHeader>
        <div className="bg-grey-200 p-4 border-t">
          {session?.user ? (
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {t('add_to_collection_button')}
              </span>
              <div className="mt-4 max-h-[128px] md:max-h-full overflow-scroll">
                <CollectionSelector mailId={id} />
              </div>
            </div>
          ) : (
            <FlexContainer className="flex-col gap-4">
              <FlexContainer className="flex-col gap-2">
                <span className="text-md font-semibold">
                {t('not_logged_in.title')}
                </span>
                <span className="text-sm font-medium text-center font-grey-300">
                  {t('not_logged_in.text')}
                </span>
              </FlexContainer>
              <div className="mt-4">
                <LogInButton/>
              </div>
            </FlexContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default MailInspectorContainer;
