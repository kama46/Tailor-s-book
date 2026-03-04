import React from "react";
import { useTranslation } from "react-i18next";
import { Globe, CheckCircle2 } from "lucide-react";

export const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex flex-col h-full bg-stone-50 p-4 space-y-6">
      <h2 className="text-2xl font-bold text-stone-900 mb-4">
        {t("settings")}
      </h2>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-100">
          <Globe size={24} className="text-stone-400" />
          <h3 className="font-bold text-stone-700 uppercase tracking-wider">
            {t("language")}
          </h3>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => changeLanguage("en")}
            className={`w-full p-4 rounded-xl border-2 text-left font-semibold transition-all flex items-center justify-between ${
              i18n.language === "en"
                ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
            }`}
          >
            <span className="text-lg">{t("english")}</span>
            {i18n.language === "en" && (
              <CheckCircle2 size={24} className="text-emerald-500" />
            )}
          </button>

          <button
            onClick={() => changeLanguage("lg")}
            className={`w-full p-4 rounded-xl border-2 text-left font-semibold transition-all flex items-center justify-between ${
              i18n.language === "lg"
                ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
            }`}
          >
            <span className="text-lg">{t("luganda")}</span>
            {i18n.language === "lg" && (
              <CheckCircle2 size={24} className="text-emerald-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
