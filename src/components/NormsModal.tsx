"use client";

import React from "react";
import { INVE_NORMS } from "@/data/compendioData";
import { X, BookmarkCheck, ArrowUpRight } from "lucide-react";

interface NormsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNorm: (sectionId: string) => void;
}

export default function NormsModal({ isOpen, onClose, onSelectNorm }: NormsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#062653] text-white px-6 py-4 flex items-center justify-between border-b border-[#0756A5]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#0756A5]/50 border border-white/20 text-[#F58220]">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">
                Índice de Normas Técnicas INV E Citadas
              </h3>
              <p className="text-xs text-blue-200">
                Instituto Nacional de Vías (INVIAS) - Normas Geotécnicas Oficiales
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3">
          {INVE_NORMS.map((norm) => (
            <div
              key={norm.code}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-[#0756A5] bg-[#F5F7FC]/50 hover:bg-[#EBF3FC]/40 transition-all flex items-start justify-between gap-4 group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#062653] bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                    {norm.code}
                  </span>
                  {norm.year && (
                    <span className="text-[11px] font-semibold text-[#F58220] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Año {norm.year}
                    </span>
                  )}
                  <span className="font-semibold text-sm text-[#142B4D]">{norm.name}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {norm.description}
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectNorm(norm.sectionId);
                  onClose();
                }}
                className="shrink-0 flex items-center gap-1 text-xs font-semibold text-[#0756A5] hover:text-[#062653] bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-[#0756A5] shadow-2xs transition-all mt-1"
              >
                <span>Ver Sección</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#062653] text-white text-xs font-medium hover:bg-[#0756A5]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
