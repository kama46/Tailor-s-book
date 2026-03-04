import React from "react";
import { useTranslation } from "react-i18next";
import { ClipboardList } from "lucide-react";

export const Orders: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full bg-stone-50 p-4 items-center justify-center text-center">
      <ClipboardList size={64} className="text-stone-300 mb-4" />
      <h2 className="text-2xl font-bold text-stone-900 mb-2">{t("orders")}</h2>
      <p className="text-stone-500 text-lg">
        Order tracking coming in Phase 2.
      </p>
    </div>
  );
};
