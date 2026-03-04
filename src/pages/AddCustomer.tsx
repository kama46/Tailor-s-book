import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../db/db";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Save, User, Phone, Star } from "lucide-react";

export const AddCustomer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoyal, setIsLoyal] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !phone.trim()) return;

    try {
      const id = await db.customers.add({
        name: name.trim(),
        phone: phone.trim(),
        is_loyal: isLoyal,
        created_at: Date.now(),
      });
      navigate(`/customer/${id}`);
    } catch (error) {
      console.error("Failed to add customer", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-stone-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
        >
          <ArrowLeft size={28} />
        </button>
        <h1 className="text-xl font-bold text-stone-900">
          {t("add_customer")}
        </h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Form */}
      <div className="p-6 space-y-6 flex-1 overflow-y-auto">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-stone-600 uppercase tracking-wider flex items-center gap-2">
            <User size={18} /> {t("name")}
          </label>
          <input
            type="text"
            className="w-full p-4 text-lg bg-white border border-stone-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-stone-600 uppercase tracking-wider flex items-center gap-2">
            <Phone size={18} /> {t("phone")}
          </label>
          <input
            type="tel"
            className="w-full p-4 text-lg bg-white border border-stone-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
            placeholder="e.g. 0770000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 p-4 bg-white border border-stone-200 rounded-2xl shadow-sm">
          <div
            className={`p-3 rounded-full ${isLoyal ? "bg-amber-100 text-amber-600" : "bg-stone-100 text-stone-400"}`}
          >
            <Star size={24} className={isLoyal ? "fill-amber-500" : ""} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-stone-900">
              {t("loyal_customer")}
            </h3>
            <p className="text-stone-500 text-sm">Mark if frequent buyer</p>
          </div>
          <button
            onClick={() => setIsLoyal(!isLoyal)}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out ${isLoyal ? "bg-emerald-500" : "bg-stone-300"}`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${isLoyal ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-white border-t border-stone-200 pb-safe">
        <button
          onClick={handleSave}
          disabled={!name.trim() || !phone.trim()}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white p-4 rounded-2xl text-xl font-bold shadow-md hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Save size={24} />
          {t("save")}
        </button>
      </div>
    </div>
  );
};
