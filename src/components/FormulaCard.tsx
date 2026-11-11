"use client";

import React from "react";
import MathBlock from "./MathBlock";
import { GeotechnicalFormula } from "@/data/formulasData";
import { Hash, Calculator, Info } from "lucide-react";

interface FormulaCardProps {
  formula: GeotechnicalFormula;
  onOpenCalculator?: (type: "spt" | "fasicas" | "ig" | "succion") => void;
}

export default function FormulaCard({ formula, onOpenCalculator }: FormulaCardProps) {
  let calcType: "spt" | "fasicas" | "ig" | "succion" | null = null;
  if (formula.id === "formula-spt") calcType = "spt";
  if (formula.id.startsWith("formula-porosidad") || formula.id.startsWith("formula-vacios") || formula.id.startsWith("formula-relacion-fundamental") || formula.id.startsWith("formula-conversion") || formula.id.startsWith("formula-pesos")) calcType = "fasicas";
  if (formula.id === "formula-indice-grupo") calcType = "ig";
  if (formula.id === "formula-papel-filtro") calcType = "succion";

  return (
    <div className="my-5 rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden transition-all hover:border-[#0756A5]/40 hover:shadow-md">
      {/* Top Header */}
      <div className="bg-[#F5F7FC] px-4 py-2.5 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-[#0756A5]/10 text-[#0756A5]">
            <Hash className="w-3.5 h-3.5" />
          </span>
          <h4 className="font-semibold text-xs sm:text-sm text-[#062653]">{formula.name}</h4>
        </div>
        <div className="flex items-center gap-2">
          {formula.norm && (
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-[#F58220] border border-amber-200">
              {formula.norm}
            </span>
          )}
          {calcType && onOpenCalculator && (
            <button
              onClick={() => onOpenCalculator(calcType)}
              className="flex items-center gap-1 text-[11px] font-semibold text-[#0756A5] hover:text-[#062653] bg-white px-2 py-0.5 rounded-md border border-slate-200 hover:border-[#0756A5] shadow-2xs transition-colors"
            >
              <Calculator className="w-3 h-3 text-[#F58220]" />
              <span>Calcular</span>
            </button>
          )}
        </div>
      </div>

      {/* KaTeX Display */}
      <div className="p-4 sm:p-5">
        <MathBlock math={formula.latex} display={true} showCopy={true} />

        {/* Explanation */}
        <p className="text-xs sm:text-sm text-slate-600 mt-2 mb-3 leading-relaxed">
          {formula.explanation}
        </p>

        {/* Variables List */}
        {formula.variables && formula.variables.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-[#0756A5]" />
              Nomenclatura y Variables:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-700 bg-slate-50/70 p-3 rounded-lg border border-slate-100">
              {formula.variables.map((v, idx) => (
                <div key={idx} className="flex items-baseline gap-1.5">
                  <span className="font-serif font-bold text-[#062653] shrink-0">
                    <MathBlock math={v.symbol} display={false} />:
                  </span>
                  <span className="text-slate-600 text-[11px] leading-tight">{v.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
