import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Users, ClipboardList, Settings } from "lucide-react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { path: "/", label: t("customers"), icon: Users },
    { path: "/orders", label: t("orders"), icon: ClipboardList },
    { path: "/settings", label: t("settings"), icon: Settings },
  ];

  return (
    <div className="flex flex-col h-screen bg-stone-100 text-stone-900 font-sans">
      <header className="bg-emerald-700 text-white p-4 shadow-md flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">{t("app_name")}</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="max-w-md mx-auto h-full">{children}</div>
      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t border-stone-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
        <div className="max-w-md mx-auto flex justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-3 rounded-xl min-w-[80px] transition-colors ${
                  isActive
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-stone-500 hover:bg-stone-50"
                }`}
              >
                <Icon size={28} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
