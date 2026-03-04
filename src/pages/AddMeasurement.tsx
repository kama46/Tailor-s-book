import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../db/db";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Save, Ruler, CheckCircle2 } from "lucide-react";

const TEMPLATES = {
  suit: [
    "chest",
    "waist",
    "hips",
    "shoulder",
    "sleeve",
    "neck",
    "inseam",
    "biceps",
    "lower_arm",
    "stomach",
    "full_length_blazer",
    "full_length_waistcoat",
    "full_length_khaftan",
    "thighs",
    "knees",
    "calf",
    "full_length",
    "bottom_pants",
  ],
  shirt: [
    "chest",
    "waist",
    "shoulder",
    "sleeve",
    "neck",
    "biceps",
    "lower_arm",
    "stomach",
    "full_length",
  ],
  dress: [
    "bust",
    "waist",
    "shoulder_to_tit",
    "shoulder_to_underbust",
    "shoulder_to_waist",
    "hips",
    "dress_length",
    "sleeve_length",
    "sleeve_width",
    "nape_to_waist",
    "shoulder_bone_to_shoulder_bone",
    "waist_to_knee",
    "waist_to_floor",
  ],
  gomesi: ["chest", "waist", "shoulder", "sleeve"],
  kanzu: [
    "chest",
    "shoulder",
    "sleeve",
    "neck",
    "inseam",
    "biceps",
    "lower_arm",
    "stomach",
    "full_length_blazer",
    "full_length_waistcoat",
    "full_length_khaftan",
    "thighs",
    "knees",
    "calf",
    "full_length",
    "bottom_pants",
  ],
  busuti: [
    "chest",
    "waist",
    "hips",
    "shoulder",
    "inseam",
    "biceps",
    "lower_arm",
    "stomach",
    "full_length_blazer",
    "full_length_waistcoat",
    "full_length_khaftan",
    "thighs",
    "knees",
    "calf",
    "full_length",
    "bottom_pants",
  ],
  school_uniform: [
    "chest",
    "waist",
    "hips",
    "shoulder",
    "sleeve",
    "inseam",
    "biceps",
    "lower_arm",
    "stomach",
    "full_length_blazer",
    "full_length_waistcoat",
    "full_length_khaftan",
    "thighs",
    "knees",
    "calf",
    "full_length",
    "bottom_pants",
  ],
  workwear: [
    "chest",
    "waist",
    "hips",
    "shoulder",
    "sleeve",
    "inseam",
    "biceps",
    "lower_arm",
    "stomach",
    "full_length_blazer",
    "full_length_waistcoat",
    "full_length_khaftan",
    "thighs",
    "knees",
    "calf",
    "full_length",
    "bottom_pants",
  ],
};

export const AddMeasurement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const customerId = parseInt(id || "0", 10);

  const [selectedTemplate, setSelectedTemplate] =
    useState<keyof typeof TEMPLATES>("suit");
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    // Reset values when template changes
    const initialValues: Record<string, string> = {};
    TEMPLATES[selectedTemplate].forEach((field) => {
      initialValues[field] = "";
    });
    setValues(initialValues);
  }, [selectedTemplate]);

  const handleSave = async () => {
    const numericValues: Record<string, number> = {};
    let hasValues = false;

    Object.entries(values).forEach(([key, val]) => {
      if (val.trim() !== "") {
        numericValues[key] = parseFloat(val);
        hasValues = true;
      }
    });

    if (!hasValues) return;

    try {
      await db.measurements.add({
        customer_id: customerId,
        unit,
        values: numericValues,
        recorded_at: Date.now(),
        recorded_by: 1, // Mock user ID
      });
      navigate(`/customer/${customerId}`);
    } catch (error) {
      console.error("Failed to add measurement", error);
    }
  };

  const handleValueChange = (field: string, value: string) => {
    // Only allow numbers and one decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setValues((prev) => ({ ...prev, [field]: value }));
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
          {t("add_measurement")}
        </h1>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Template Selector */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-stone-600 uppercase tracking-wider">
            {t("template")}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(TEMPLATES) as Array<keyof typeof TEMPLATES>).map(
              (template) => (
                <button
                  key={template}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-3 rounded-xl border-2 text-left font-semibold transition-all ${
                    selectedTemplate === template
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                      : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="capitalize">{t(template)}</span>
                    {selectedTemplate === template && (
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    )}
                  </div>
                </button>
              ),
            )}
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-stone-600 uppercase tracking-wider">
            {t("unit")}
          </label>
          <div className="flex bg-stone-200 p-1 rounded-xl">
            <button
              onClick={() => setUnit("in")}
              className={`flex-1 py-3 px-4 rounded-lg font-bold text-lg transition-colors ${
                unit === "in"
                  ? "bg-white shadow-sm text-stone-900"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {t("inches")}
            </button>
            <button
              onClick={() => setUnit("cm")}
              className={`flex-1 py-3 px-4 rounded-lg font-bold text-lg transition-colors ${
                unit === "cm"
                  ? "bg-white shadow-sm text-stone-900"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {t("cm")}
            </button>
          </div>
        </div>

        {/* Measurement Inputs */}
        <div className="space-y-4 bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-stone-100">
            <Ruler size={20} className="text-stone-400" />
            <h3 className="font-bold text-stone-700 uppercase tracking-wider">
              Enter Values
            </h3>
          </div>

          {TEMPLATES[selectedTemplate].map((field) => (
            <div key={field} className="flex items-center justify-between">
              <label className="text-lg font-medium text-stone-700 capitalize w-1/3">
                {t(field)}
              </label>
              <div className="relative w-2/3">
                <input
                  type="text"
                  inputMode="decimal"
                  className="w-full p-3 pr-12 text-xl font-bold text-right bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-colors"
                  placeholder="0.0"
                  value={values[field] || ""}
                  onChange={(e) => handleValueChange(field, e.target.value)}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-stone-400 font-semibold pointer-events-none">
                  {unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-white border-t border-stone-200 pb-safe">
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white p-4 rounded-2xl text-xl font-bold shadow-md hover:bg-emerald-700 active:bg-emerald-800 transition-all"
        >
          <Save size={24} />
          {t("save")}
        </button>
      </div>
    </div>
  );
};
