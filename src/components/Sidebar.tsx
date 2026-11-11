"use client";

import React from "react";
import { CHAPTERS, INVE_NORMS } from "@/data/compendioData";
import { Calculator, BookmarkCheck } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  onOpenTools: () => void;
  onJumpToNorms: () => void;
}

export default function Sidebar({
  activeSection,
  onSelectSection,
  onOpenTools,
  onJumpToNorms,
}: SidebarProps) {
  return (
    <aside className="w-72 shrink-0 hidden lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto pr-3 py-2 space-y-6">
        {/* Quick action cards inside sidebar */}
        <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#062653] flex items-center justify-between">
            <span>Herramientas Rápidas</span>
            <span className="w-2 h-2 rounded-full bg-[#F58220] animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onOpenTools}
              className="flex flex-col items-start p-2 rounded-lg bg-[#EBF3FC] hover:bg-[#0756A5] text-[#062653] hover:text-white transition-all text-left group"
            >
              <Calculator className="w-4 h-4 text-[#F58220] mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold">Calculadoras</span>
              <span className="text-[10px] text-slate-500 group-hover:text-blue-100">
                SPT, IG, Fases
              </span>
            </button>

            <button
              onClick={onJumpToNorms}
              className="flex flex-col items-start p-2 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-950 hover:text-white transition-all text-left group"
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-600 group-hover:text-white mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold">Normas INV E</span>
              <span className="text-[10px] text-emerald-700 group-hover:text-emerald-100">
                9 Códigos
              </span>
            </button>
          </div>
        </div>

        {/* Chapters navigation */}
        <nav className="space-y-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-2">
            Tabla de Contenido
          </div>

          {CHAPTERS.map((chapter) => {
            const isChapterActive = chapter.sections.some((s) => s.id === activeSection);
            return (
              <div key={chapter.id} className="space-y-1">
                <div className={`px-2 py-1 rounded-md transition-colors ${isChapterActive ? "bg-blue-50/80" : ""}`}>
                  <span className="text-[10px] font-extrabold text-[#F58220] uppercase tracking-wider block">
                    {chapter.number}
                  </span>
                  <h4 className="text-xs font-bold text-[#062653] leading-tight mt-0.5">
                    {chapter.title}
                  </h4>
                </div>

                <div className="space-y-0.5 pl-2 border-l-2 border-slate-200">
                  {chapter.sections.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => onSelectSection(sec.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all flex items-start justify-between group ${
                          isActive
                            ? "bg-[#0756A5] text-white font-medium shadow-xs"
                            : "text-[#142B4D] hover:bg-white hover:text-[#0756A5]"
                        }`}
                      >
                        <div className="flex items-start gap-1.5">
                          <span
                            className={`font-mono text-[11px] font-bold shrink-0 ${
                              isActive ? "text-[#F58220]" : "text-slate-500 group-hover:text-[#0756A5]"
                            }`}
                          >
                            {sec.number}
                          </span>
                          <span className="line-clamp-2 leading-tight">{sec.title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* INVIAS Norms Badge Section */}
        <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-[#062653]">
            <span>Normas INV E Citadas</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-[#0756A5] font-mono">
              {INVE_NORMS.length} normas
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {INVE_NORMS.map((n) => (
              <button
                key={n.code}
                onClick={() => onSelectSection(n.sectionId)}
                title={n.name}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#F5F7FC] hover:bg-[#0756A5] hover:text-white border border-slate-200 text-[#142B4D] transition-colors"
              >
                {n.code}
              </button>
            ))}
          </div>
        </div>

        {/* Institutional Footer */}
        <div className="px-2 text-[11px] text-slate-500 space-y-1">
          <p className="font-semibold text-[#062653]">
            Compendio de Mecánica de Suelos
          </p>
          <p className="text-[10px] text-slate-500">
            Fidelidad técnica completa según compendio v2.0
          </p>
        </div>
      </div>
    </aside>
  );
}
