"use client";

import React, { useState } from "react";
import katex from "katex";
import { Copy, Check } from "lucide-react";

interface MathBlockProps {
  math: string;
  display?: boolean;
  className?: string;
  showCopy?: boolean;
}

export default function MathBlock({
  math,
  display = false,
  className = "",
  showCopy = false,
}: MathBlockProps) {
  const [copied, setCopied] = useState(false);

  let html = "";
  try {
    html = katex.renderToString(math, {
      displayMode: display,
      throwOnError: false,
      output: "htmlAndMathml",
    });
  } catch {
    html = `<span class="text-red-500 font-mono">${math}</span>`;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(math);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (!display) {
    return (
      <span
        className={`inline-block align-baseline font-serif px-1 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div className={`relative group my-3 ${className}`}>
      <div
        className="overflow-x-auto py-2.5 px-3 rounded-lg bg-[#F5F7FC]/70 border border-[#E2E8F0] text-center"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {showCopy && (
        <button
          onClick={handleCopy}
          aria-label="Copiar fórmula LaTeX"
          title="Copiar fórmula LaTeX"
          className="absolute right-2 top-2 p-1.5 rounded-md text-slate-400 hover:text-[#0756A5] hover:bg-white border border-transparent hover:border-slate-200 opacity-0 group-hover:opacity-100 transition-all text-xs flex items-center gap-1 shadow-xs bg-white/80"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-medium text-[11px]">Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium">LaTeX</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
