"use client";

import React from "react";
import { Search, Menu, Calculator, BookmarkCheck } from "lucide-react";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  onOpenTools: () => void;
  onJumpToNorms: () => void;
}

export default function Navbar({
  onOpenSearch,
  onOpenMobileMenu,
  onOpenTools,
  onJumpToNorms,
}: NavbarProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 h-16 bg-[#062653] text-white border-b border-[#0756A5]/50 shadow-md backdrop-blur-md">
      <div className="w-full h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Left: Mobile hamburger & Logo/Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0756A5] to-[#F58220] flex items-center justify-center shadow-inner shrink-0 text-white font-bold text-base border border-white/20">
                MS
              </div>
              <div>
                <a
                  href="#top"
                  className="block font-bold text-sm sm:text-base tracking-tight leading-snug hover:text-blue-200 transition-colors"
                >
                  Compendio Detallado de Mecánica de Suelos
                </a>
                <p className="text-[11px] text-blue-200 hidden sm:block">
                  Referencia Técnica, Normas INV E y Relaciones Fásicas
                </p>
              </div>
            </div>
          </div>

          {/* Right: Quick actions & Search button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 bg-[#041B3B]/80 hover:bg-[#041B3B] text-slate-300 hover:text-white px-3 sm:px-4 py-1.5 rounded-xl border border-white/10 text-xs sm:text-sm transition-all shadow-inner group cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#F58220] group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">Buscar fórmulas, normas o términos...</span>
              <span className="md:hidden">Buscar...</span>
              <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded text-slate-300 border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Quick Tools button */}
            <button
              onClick={onOpenTools}
              className="flex items-center gap-1.5 bg-[#0756A5] hover:bg-[#064789] text-white px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs border border-white/20 cursor-pointer"
              title="Abrir calculadoras geotécnicas"
            >
              <Calculator className="w-4 h-4 text-[#F58220]" />
              <span className="hidden sm:inline">Calculadoras</span>
            </button>

            {/* Quick Norms anchor */}
            <button
              onClick={onJumpToNorms}
              className="hidden lg:flex items-center gap-1.5 text-xs text-blue-200 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Ver índice de Normas INV E"
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-400" />
              <span>Normas INV E</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
