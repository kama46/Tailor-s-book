import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { useTranslation } from "react-i18next";
import { Search, Plus, User, Star } from "lucide-react";
import { Link } from "react-router-dom";

export const CustomerList: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  const customers = useLiveQuery(() => {
    if (!searchQuery) {
      return db.customers.orderBy("name").toArray();
    }
    const lowerQuery = searchQuery.toLowerCase();
    return db.customers
      .filter(
        (c) =>
          c.name.toLowerCase().includes(lowerQuery) ||
          c.phone.includes(lowerQuery),
      )
      .toArray();
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-stone-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 bg-white border border-stone-200 rounded-2xl text-lg shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder={t("search_placeholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Add Customer Button */}
      <Link
        to="/add-customer"
        className="flex items-center justify-center gap-2 bg-emerald-600 text-white p-4 rounded-2xl shadow-md hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
      >
        <Plus size={28} />
        <span className="text-xl font-semibold">{t("add_customer")}</span>
      </Link>

      {/* Customer List */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-20">
        {customers?.length === 0 ? (
          <div className="text-center text-stone-500 py-10 text-lg">
            {t("no_customers")}
          </div>
        ) : (
          customers?.map((customer) => (
            <Link
              key={customer.id}
              to={`/customer/${customer.id}`}
              className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
            >
              <div className="h-14 w-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mr-4 overflow-hidden shrink-0">
                {customer.photo_url ? (
                  <img
                    src={customer.photo_url}
                    alt={customer.name}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <User size={32} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-stone-900 truncate flex items-center gap-2">
                  {customer.name}
                  {customer.is_loyal && (
                    <Star size={18} className="text-amber-500 fill-amber-500" />
                  )}
                </h2>
                <p className="text-stone-500 text-lg truncate">
                  {customer.phone}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
