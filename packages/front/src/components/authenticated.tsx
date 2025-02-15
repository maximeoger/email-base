"use client";
import { useSession } from "next-auth/react";
import LoggedIn from "./logged-in";
import LogInButton from "./log-in-button";
import FlexContainer from "../containers/flex-container";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Authenticated() {
  const t = useTranslations("components.header.authenticated");

  const { data: session } = useSession();
  return (
    <div className="flex gap-4 items-center">
      <Link href="/collections">{t('collections')}</Link>
      {session?.user ? (
        <FlexContainer className="gap-4">
          <LoggedIn
            userName={session.user.name as unknown as string}
            userImageSrc={session.user.image as unknown as string}
          />
        </FlexContainer>
      ) : (
        <FlexContainer className="gap-4">
          <LogInButton/>
        </FlexContainer>
      )}
    </div>
  );
}
