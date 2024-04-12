import React from "react";
import { useTranslations } from "next-intl";

export default function FinalPage() {
  const t = useTranslations("Index");

  return (
    <div className="main">
      <p>
        {t("data-saved")} <br />
        {t("link-reaction-test")}
        <a href={t("link")}>{t("link")}</a>
      </p>
    </div>
  );
}
