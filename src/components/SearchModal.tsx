"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, BookOpen, Hash, FileText, ArrowRight, CornerDownLeft } from "lucide-react";
import { SEARCH_INDEX, SearchResult } from "@/data/searchIndex";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (targetId: string) => void;
}

export default function SearchModal({ isOpen, onClose, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setQuery("");
        setSelectedIndex(0);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.trim().toLowerCase();

  const filteredResults = SEARCH_INDEX.filter((item) => {
    if (!normalizedQuery) return true;
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.subtitle.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.tags.some((tag) => tag.includes(normalizedQuery))
    );
  }).slice(0, 10);

  const handleSelect = (item: SearchResult) => {
    onSelect(item.targetId);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredResults.length ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredResults[selectedIndex]);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-white">
          <Search className="w-5 h-5 text-[#0756A5] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar por término, fórmula (N60, IG, hc) o norma (INV E-105)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full text-sm text-[#142B4D] placeholder-slate-400 bg-transparent focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs overflow-x-auto">
          <span className="text-slate-500 font-medium mr-1 text-[11px]">Sugeridos:</span>
          {["INV E", "SPT N60", "Índice de Grupo", "Relaciones Fásicas", "Stokes", "Licuación"].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#0756A5] hover:text-[#0756A5] transition-colors text-[11px]"
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm">No se encontraron resultados para &quot;{query}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">
                Prueba buscando normas como &quot;INV E-159&quot; o fórmulas como &quot;N60&quot; o &quot;Porosidad&quot;.
              </p>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-xl cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                    isSelected ? "bg-[#EBF3FC] text-[#062653]" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                        item.type === "norm"
                          ? "bg-amber-100 text-[#F58220]"
                          : item.type === "formula"
                          ? "bg-blue-100 text-[#0756A5]"
                          : "bg-slate-100 text-[#062653]"
                      }`}
                    >
                      {item.type === "norm" && <FileText className="w-4 h-4" />}
                      {item.type === "formula" && <Hash className="w-4 h-4" />}
                      {(item.type === "term" || item.type === "section") && (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-[#142B4D]">{item.title}</span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            item.type === "norm"
                              ? "bg-amber-50 text-[#F58220] border border-[#F58220]/30"
                              : item.type === "formula"
                              ? "bg-blue-50 text-[#0756A5] border border-[#0756A5]/30"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <div className="text-xs text-[#0756A5] font-medium mt-0.5">
                        {item.subtitle}
                      </div>
                      <div className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center pt-2">
                    {isSelected ? (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-[#0756A5] bg-white px-2 py-1 rounded shadow-xs border border-blue-200">
                        <span>Ir</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">
                ↑
              </kbd>{" "}
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">
                ↓
              </kbd>{" "}
              para navegar
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">
                ENTER
              </kbd>{" "}
              para seleccionar
            </span>
          </div>
          <span>{filteredResults.length} resultados</span>
        </div>
      </div>
    </div>
  );
}
