import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function LogInButton() {
  const t = useTranslations("components");
  return (
    <Link href="/login">
      <Button size="md" className="bg-grey-800 text-grey-100">
        {t("login_button")}
      </Button>
    </Link>
  );
}
