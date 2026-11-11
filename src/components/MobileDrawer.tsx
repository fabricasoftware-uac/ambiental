"use client";

import React, { useEffect } from "react";
import { CHAPTERS, INVE_NORMS } from "@/data/compendioData";
import { X, Calculator, Search, BookmarkCheck } from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSelectSection: (id: string) => void;
  onOpenSearch: () => void;
  onOpenTools: () => void;
  onJumpToNorms: () => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  activeSection,
  onSelectSection,
  onOpenSearch,
  onOpenTools,
  onJumpToNorms,
}: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleItemClick = (id: string) => {
    onSelectSection(id);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex lg:hidden bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-left duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-[#062653] text-white p-4 flex items-center justify-between border-b border-[#0756A5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0756A5] to-[#F58220] flex items-center justify-center font-bold text-white text-sm">
              MS
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight text-white">Mecánica de Suelos</h3>
              <p className="text-[11px] text-blue-200">Navegación del Compendio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10"
            aria-label="Cerrar navegación"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Quick Actions */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 grid grid-cols-3 gap-1.5">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-white border border-slate-200 text-xs font-medium text-[#062653] shadow-2xs hover:bg-[#EBF3FC]"
          >
            <Search className="w-3.5 h-3.5 text-[#F58220]" />
            <span>Buscar</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenTools();
            }}
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-[#0756A5] text-white text-xs font-medium shadow-2xs hover:bg-[#064789]"
          >
            <Calculator className="w-3.5 h-3.5 text-[#F58220]" />
            <span>Calcular</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onJumpToNorms();
            }}
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium shadow-2xs hover:bg-emerald-100"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Normas</span>
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {CHAPTERS.map((chapter) => (
            <div key={chapter.id} className="space-y-1">
              <span className="text-[10px] font-extrabold text-[#F58220] uppercase tracking-wider block">
                {chapter.number}
              </span>
              <h4 className="text-xs font-bold text-[#062653] leading-tight">{chapter.title}</h4>

              <div className="space-y-1 pt-1 pl-2 border-l-2 border-slate-200">
                {chapter.sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleItemClick(sec.id)}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isActive
                          ? "bg-[#0756A5] text-white font-medium"
                          : "text-[#142B4D] hover:bg-slate-100"
                      }`}
                    >
                      <span className="font-mono font-bold mr-2 text-[11px] shrink-0">
                        {sec.number}
                      </span>
                      <span className="truncate flex-1 text-left">{sec.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Norms Tag Cloud */}
          <div className="pt-3 border-t border-slate-200">
            <span className="text-[11px] font-bold text-[#062653] block mb-2">
              Normas INV E Citadas
            </span>
            <div className="flex flex-wrap gap-1.5">
              {INVE_NORMS.map((n) => (
                <button
                  key={n.code}
                  onClick={() => handleItemClick(n.sectionId)}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#F5F7FC] hover:bg-[#0756A5] hover:text-white border border-slate-200 text-[#142B4D]"
                >
                  {n.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Compendio Técnico Oficial de Mecánica de Suelos
        </div>
      </div>
    </div>
  );
}
