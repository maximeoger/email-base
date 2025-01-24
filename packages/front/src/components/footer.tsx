import Link from "next/link";
import logo from "../assets/logo.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("components.footer");
  return (
    <div className="px-8 py-4 bg-white flex flex-col gap-8 items-center py-16">
      <Image priority alt="email base logo" src={logo} />
      <div className="flex gap-16 mb-16">
        <Link className="hover:underline" href="/terms">
          {t("terms")}
        </Link>
        <Link className="hover:underline" href="/privacy">
          {t("privacy")}
        </Link>
        <Link className="hover:underline" href="/legal">
          {t("legal")}
        </Link>
        <Link className="hover:underline" href="/contact">
          {t("contact")}
        </Link>
      </div>
    </div>
  );
}
