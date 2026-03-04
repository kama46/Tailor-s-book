import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Edit,
  User,
  Phone,
  Star,
  Plus,
  Ruler,
  History,
} from "lucide-react";
import { format } from "date-fns";

export const CustomerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const customerId = parseInt(id || "0", 10);

  const customer = useLiveQuery(
    () => db.customers.get(customerId),
    [customerId],
  );
  const measurements = useLiveQuery(
    () =>
      db.measurements
        .where("customer_id")
        .equals(customerId)
        .reverse()
        .sortBy("recorded_at"),
    [customerId],
  );

  if (!customer)
    return <div className="p-4 text-center text-stone-500">Loading...</div>;

  return (
    <div className="flex flex-col h-full bg-stone-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-emerald-700 text-white shadow-md sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 hover:bg-emerald-600 rounded-full transition-colors"
        >
          <ArrowLeft size={28} />
        </button>
        <h1 className="text-xl font-bold truncate flex-1 text-center px-4">
          {customer.name}
        </h1>
        <button className="p-2 -mr-2 hover:bg-emerald-600 rounded-full transition-colors">
          <Edit size={24} />
        </button>
      </div>

      {/* Profile Info */}
      <div className="p-6 bg-white shadow-sm mb-4 flex flex-col items-center border-b border-stone-200">
        <div className="h-24 w-24 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4 overflow-hidden border-4 border-white shadow-md relative">
          {customer.photo_url ? (
            <img
              src={customer.photo_url}
              alt={customer.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <User size={48} />
          )}
          {customer.is_loyal && (
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
              <Star size={20} className="text-amber-500 fill-amber-500" />
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-stone-900 mb-1 flex items-center gap-2">
          {customer.name}
        </h2>

        <a
          href={`tel:${customer.phone}`}
          className="flex items-center gap-2 text-emerald-600 text-lg font-medium hover:underline"
        >
          <Phone size={20} />
          {customer.phone}
        </a>
      </div>

      {/* Measurements Section */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <Ruler size={24} className="text-stone-400" />
            {t("measurements")}
          </h3>
          <Link
            to={`/customer/${customerId}/add-measurement`}
            className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold hover:bg-emerald-200 transition-colors"
          >
            <Plus size={20} />
            Add
          </Link>
        </div>

        {measurements && measurements.length > 0 ? (
          <div className="space-y-4">
            {measurements.map((m) => (
              <div
                key={m.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200"
              >
                <div className="flex justify-between items-center mb-3 border-b border-stone-100 pb-2">
                  <span className="text-sm font-semibold text-stone-500 flex items-center gap-1">
                    <History size={16} />
                    {format(new Date(m.recorded_at), "dd MMM yyyy")}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-600 px-2 py-1 rounded-md">
                    {m.unit}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {Object.entries(m.values).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center text-lg"
                    >
                      <span className="text-stone-600 capitalize">
                        {t(key) || key}
                      </span>
                      <span className="font-bold text-stone-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-stone-100 rounded-2xl border border-dashed border-stone-300">
            <Ruler size={48} className="mx-auto text-stone-300 mb-2" />
            <p className="text-stone-500 text-lg">No measurements yet.</p>
            <Link
              to={`/customer/${customerId}/add-measurement`}
              className="inline-block mt-4 text-emerald-600 font-semibold hover:underline"
            >
              Tap here to add
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
