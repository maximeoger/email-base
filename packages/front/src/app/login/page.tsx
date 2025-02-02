"use client"
import { useTranslations } from "next-intl";
import SignInButton from "src/components/buttons/sign-in";
import useMediaQuery from "src/hooks/useMediaQuery";
import { Breakpoints } from "src/models/breakpoints";

export default function Login() {
  const isMd = useMediaQuery(Breakpoints.md);
  const t = useTranslations('pages.login');

  
  return (
    <div className="flex flex-1 gap-16">
      {!isMd && <div className="flex-1 bg-white" />}
      <div className="flex-1 flex flex-col justify-around p-8">
        <div>
          <p className="text-3xl font-black">
            <span className="text-main">{t('sign_in')}</span> &nbsp;
            {t('to_your_account')}
          </p>
          <SignInButton />
        </div>
      </div>
    </div>
  );
}
