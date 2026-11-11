"use client";

import React, { useState } from "react";
import { Calculator, X } from "lucide-react";
import MathBlock from "./MathBlock";

interface InteractiveToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "spt" | "fasicas" | "ig" | "succion";
}

export default function InteractiveToolsModal({
  isOpen,
  onClose,
  initialTab = "ig",
}: InteractiveToolsModalProps) {
  const [activeTab, setActiveTab] = useState<"spt" | "fasicas" | "ig" | "succion">(initialTab);

  // SPT State
  const [sptN, setSptN] = useState<number>(18);
  const [sptEm, setSptEm] = useState<number>(60);
  const [sptCb, setSptCb] = useState<number>(1.0);
  const [sptCs, setSptCs] = useState<number>(1.0);
  const [sptCr, setSptCr] = useState<number>(1.0);

  // Group Index State
  const [igF, setIgF] = useState<number>(55);
  const [igLL, setIgLL] = useState<number>(48);
  const [igIP, setIgIP] = useState<number>(22);
  const [isA2Special, setIsA2Special] = useState<boolean>(false);

  // Relaciones Fásicas State
  const [fasicaE, setFasicaE] = useState<number>(0.75);
  const [fasicaGs, setFasicaGs] = useState<number>(2.68);
  const [fasicaSr, setFasicaSr] = useState<number>(85); // %

  // Succión State
  const [filterWf, setFilterWf] = useState<number>(32.5); // %

  if (!isOpen) return null;

  // Calculators logic
  // 1. SPT N60
  const sptN60 = sptN * (sptEm / 60) * sptCb * sptCs * sptCr;

  // 2. IG AASHTO
  let calculatedIG = 0;
  if (isA2Special) {
    calculatedIG = 0.01 * (igF - 15) * (igIP - 10);
  } else {
    calculatedIG =
      (igF - 35) * (0.2 + 0.005 * (igLL - 40)) + 0.01 * (igF - 15) * (igIP - 10);
  }
  const finalIG = Math.max(0, Math.round(calculatedIG));

  // 3. Fásicas
  const nPercent = (fasicaE / (1 + fasicaE)) * 100;
  // e * Sr = w * Gs  =>  w = (e * Sr) / Gs (Sr in decimal)
  const calculatedW = ((fasicaE * (fasicaSr / 100)) / fasicaGs) * 100;
  const gammaW = 9.81; // kN/m³
  const gammaD = (fasicaGs / (1 + fasicaE)) * gammaW;
  const gammaM = ((fasicaGs + fasicaE * (fasicaSr / 100)) / (1 + fasicaE)) * gammaW;
  const gammaSat = ((fasicaGs + fasicaE) / (1 + fasicaE)) * gammaW;
  const gammaSub = ((fasicaGs - 1) / (1 + fasicaE)) * gammaW;

  // 4. Succión
  let logH = 0;
  if (filterWf <= 45.3) {
    logH = 5.327 - 0.0779 * filterWf;
  } else {
    logH = 2.412 - 0.0135 * filterWf;
  }
  const suctionKPa = Math.pow(10, logH);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#062653] text-white px-6 py-4 flex items-center justify-between border-b border-[#0756A5]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#0756A5]/50 border border-white/20 text-[#F58220]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">Calculadoras Geotécnicas Interactivas</h3>
              <p className="text-xs text-blue-200">
                Verificación paramétrica basada en las fórmulas oficiales del compendio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab("ig")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "ig"
                ? "border-[#F58220] text-[#062653] font-semibold bg-white rounded-t-lg"
                : "border-transparent text-slate-600 hover:text-[#062653]"
            }`}
          >
            Índice de Grupo (IG)
          </button>
          <button
            onClick={() => setActiveTab("fasicas")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "fasicas"
                ? "border-[#F58220] text-[#062653] font-semibold bg-white rounded-t-lg"
                : "border-transparent text-slate-600 hover:text-[#062653]"
            }`}
          >
            Relaciones Fásicas
          </button>
          <button
            onClick={() => setActiveTab("spt")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "spt"
                ? "border-[#F58220] text-[#062653] font-semibold bg-white rounded-t-lg"
                : "border-transparent text-slate-600 hover:text-[#062653]"
            }`}
          >
            Corrección SPT (N60)
          </button>
          <button
            onClick={() => setActiveTab("succion")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "succion"
                ? "border-[#F58220] text-[#062653] font-semibold bg-white rounded-t-lg"
                : "border-transparent text-slate-600 hover:text-[#062653]"
            }`}
          >
            Succión Papel Filtro
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* 1. INDICE DE GRUPO TAB */}
          {activeTab === "ig" && (
            <div className="space-y-5">
              <div className="bg-[#EBF3FC] p-4 rounded-xl border border-[#0756A5]/20 text-sm">
                <span className="font-semibold text-[#062653]">Norma INV E-180: </span>
                <span>
                  Permite graduar la calidad de un suelo fino como subrasante vial.
                </span>
                <MathBlock
                  math="IG = (F - 35) \cdot [0.2 + 0.005(LL - 40)] + 0.01(F - 15)(IP - 10)"
                  display={true}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    % Pasa Tamiz #200 (F)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={igF}
                    onChange={(e) => setIgF(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5]"
                  />
                  <span className="text-[11px] text-slate-500">Valor entero en %</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Límite Líquido (LL)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={120}
                    value={igLL}
                    onChange={(e) => setIgLL(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5]"
                  />
                  <span className="text-[11px] text-slate-500">INV E-125 (%)</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Índice de Plasticidad (IP)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={80}
                    value={igIP}
                    onChange={(e) => setIgIP(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5]"
                  />
                  <span className="text-[11px] text-slate-500">IP = LL - LP (%)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="a2-check"
                  checked={isA2Special}
                  onChange={(e) => setIsA2Special(e.target.checked)}
                  className="rounded-sm border-slate-300 text-[#0756A5] focus:ring-[#0756A5]"
                />
                <label htmlFor="a2-check" className="text-xs text-slate-700 cursor-pointer">
                  Aplica para grupos AASHTO <strong>A-2-6</strong> o <strong>A-2-7</strong> (usa solo término parcial IP)
                </label>
              </div>

              {/* Result card */}
              <div className="bg-[#062653] text-white p-5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-blue-200">
                    Índice de Grupo Resultante
                  </div>
                  <div className="text-3xl font-extrabold text-[#F58220] flex items-baseline gap-2">
                    IG = {finalIG}
                    <span className="text-xs text-slate-300 font-normal">
                      (calculado: {calculatedIG.toFixed(2)})
                    </span>
                  </div>
                  <div className="text-xs text-blue-100 mt-1">
                    {finalIG === 0 && "Calidad de subrasante: Excelente (0)"}
                    {finalIG > 0 && finalIG <= 4 && "Calidad de subrasante: Buena a Aceptable (1 - 4)"}
                    {finalIG > 4 && finalIG <= 9 && "Calidad de subrasante: Regular (5 - 9)"}
                    {finalIG > 9 && finalIG <= 20 && "Calidad de subrasante: Pobre (10 - 20)"}
                    {finalIG > 20 && "Calidad de subrasante: Muy deficiente (> 20)"}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-mono text-[#F58220] border border-[#F58220]/40">
                    AASHTO M145
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2. RELACIONES FASICAS TAB */}
          {activeTab === "fasicas" && (
            <div className="space-y-5">
              <div className="bg-[#EBF3FC] p-4 rounded-xl border border-[#0756A5]/20 text-sm">
                <span className="font-semibold text-[#062653]">Relación Fundamental del Suelo: </span>
                <span>Modelo trifásico de sólido, agua y aire.</span>
                <MathBlock math="e \cdot S_r = w \cdot G_s \quad;\quad n = \frac{e}{1+e}" display={true} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Relación de Vacíos (e)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min={0.1}
                    max={3.0}
                    value={fasicaE}
                    onChange={(e) => setFasicaE(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5]"
                  />
                  <span className="text-[11px] text-slate-500">e = Vv / Vs</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gravedad Específica (Gs)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={2.0}
                    max={3.2}
                    value={fasicaGs}
                    onChange={(e) => setFasicaGs(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5]"
                  />
                  <span className="text-[11px] text-slate-500">Normalmente 2.60 - 2.80</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Grado de Saturación (Sr %)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={fasicaSr}
                    onChange={(e) => setFasicaSr(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5]"
                  />
                  <span className="text-[11px] text-slate-500">100% = Saturación completa</span>
                </div>
              </div>

              {/* Computed parameters grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[11px] font-medium text-slate-500">Porosidad (n)</div>
                  <div className="text-lg font-bold text-[#062653]">{nPercent.toFixed(1)}%</div>
                  <div className="text-[10px] text-slate-400">e / (1+e)</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[11px] font-medium text-slate-500">Humedad Calc. (w)</div>
                  <div className="text-lg font-bold text-[#0756A5]">{calculatedW.toFixed(1)}%</div>
                  <div className="text-[10px] text-slate-400">(e · Sr) / Gs</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[11px] font-medium text-slate-500">Peso Unit. Seco (γd)</div>
                  <div className="text-lg font-bold text-slate-800">{gammaD.toFixed(2)} kN/m³</div>
                  <div className="text-[10px] text-slate-400">[Gs / (1+e)] · γw</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="text-[11px] font-medium text-slate-500">Peso Unit. Húmedo (γm)</div>
                  <div className="text-lg font-bold text-[#F58220]">{gammaM.toFixed(2)} kN/m³</div>
                  <div className="text-[10px] text-slate-400">γd · (1 + w)</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 col-span-2">
                  <div className="text-[11px] font-medium text-slate-500">Peso Unitario Saturado (γsat)</div>
                  <div className="text-lg font-bold text-slate-800">{gammaSat.toFixed(2)} kN/m³</div>
                  <div className="text-[10px] text-slate-400">[(Gs + e)/(1+e)] · γw</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 col-span-2">
                  <div className="text-[11px] font-medium text-slate-500">Peso Sumergido (γ&apos;)</div>
                  <div className="text-lg font-bold text-slate-800">{gammaSub.toFixed(2)} kN/m³</div>
                  <div className="text-[10px] text-slate-400">γsat - γw = [(Gs - 1)/(1+e)] · γw</div>
                </div>
              </div>
            </div>
          )}

          {/* 3. CORRECCION SPT TAB */}
          {activeTab === "spt" && (
            <div className="space-y-5">
              <div className="bg-[#EBF3FC] p-4 rounded-xl border border-[#0756A5]/20 text-sm">
                <span className="font-semibold text-[#062653]">Corrección Energética SPT: </span>
                <span>Normalización al 60% de energía teórica de caída libre.</span>
                <MathBlock
                  math="N_{60} = N \cdot \left(\frac{E_m}{60}\right) \cdot C_B \cdot C_S \cdot C_R"
                  display={true}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Golpes de Campo (N)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={sptN}
                    onChange={(e) => setSptN(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5]"
                  />
                  <span className="text-[11px] text-slate-500">Masa 63.5 kg / 76 cm</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Eficiencia Martillo (Em %)
                  </label>
                  <input
                    type="number"
                    min={40}
                    max={90}
                    value={sptEm}
                    onChange={(e) => setSptEm(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5]"
                  />
                  <span className="text-[11px] text-slate-500">45% (donas) a 80% (autom.)</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Diámetro Pozo (CB)
                  </label>
                  <select
                    value={sptCb}
                    onChange={(e) => setSptCb(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5] bg-white"
                  >
                    <option value={1.0}>65 - 115 mm (CB = 1.0)</option>
                    <option value={1.05}>150 mm (CB = 1.05)</option>
                    <option value={1.15}>200 mm (CB = 1.15)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Muestreador (CS)
                  </label>
                  <select
                    value={sptCs}
                    onChange={(e) => setSptCs(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5] bg-white"
                  >
                    <option value={1.0}>Estándar con camisa (CS = 1.0)</option>
                    <option value={1.2}>Sin camisa / con holgura (CS = 1.2)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Longitud Varilla (CR)
                  </label>
                  <select
                    value={sptCr}
                    onChange={(e) => setSptCr(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5] bg-white"
                  >
                    <option value={0.75}>&lt; 4 metros (CR = 0.75)</option>
                    <option value={0.85}>4 - 6 metros (CR = 0.85)</option>
                    <option value={0.95}>6 - 10 metros (CR = 0.95)</option>
                    <option value={1.0}>&gt; 10 metros (CR = 1.00)</option>
                  </select>
                </div>
              </div>

              {/* SPT result card */}
              <div className="bg-[#062653] text-white p-5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-blue-200">
                    Número de Golpes Corregido
                  </div>
                  <div className="text-3xl font-extrabold text-[#F58220] flex items-baseline gap-2">
                    N₆₀ = {Math.round(sptN60)} golpes/pie
                    <span className="text-xs text-slate-300 font-normal">
                      (exacto: {sptN60.toFixed(2)})
                    </span>
                  </div>
                  <div className="text-xs text-blue-100 mt-1">
                    {Math.round(sptN60) < 4 && "Compacidad / Consistencia: Muy suelta / Muy blanda"}
                    {Math.round(sptN60) >= 4 && Math.round(sptN60) <= 10 && "Compacidad / Consistencia: Suelta / Blanda"}
                    {Math.round(sptN60) > 10 && Math.round(sptN60) <= 30 && "Compacidad / Consistencia: Media / Firme"}
                    {Math.round(sptN60) > 30 && Math.round(sptN60) <= 50 && "Compacidad / Consistencia: Densa / Muy firme"}
                    {Math.round(sptN60) > 50 && "Compacidad / Consistencia: Muy densa / Dura"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. SUCCION TAB */}
          {activeTab === "succion" && (
            <div className="space-y-5">
              <div className="bg-[#EBF3FC] p-4 rounded-xl border border-[#0756A5]/20 text-sm">
                <span className="font-semibold text-[#062653]">Norma INV E-159 / 2013: </span>
                <span>Calibración con papel de filtro Whatman No. 42 a 20±3°C.</span>
                <MathBlock
                  math="\begin{cases} \log h = 5.327 - 0.0779 \cdot w_f & (w_f \le 45.3\%) \\ \log h = 2.412 - 0.0135 \cdot w_f & (w_f > 45.3\%) \end{cases}"
                  display={true}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Humedad del Papel de Filtro (wf %)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min={1}
                  max={90}
                  value={filterWf}
                  onChange={(e) => setFilterWf(Number(e.target.value))}
                  className="w-full sm:w-1/2 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0756A5]"
                />
                <span className="text-[11px] text-slate-500">
                  Rango de transición en wf = 45.3%
                </span>
              </div>

              {/* Result */}
              <div className="bg-[#062653] text-white p-5 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-blue-200">
                    Succión Geotécnica Calculada
                  </div>
                  <div className="text-3xl font-extrabold text-[#F58220] flex items-baseline gap-2">
                    h = {suctionKPa > 1000 ? suctionKPa.toLocaleString("es-CO", { maximumFractionDigits: 0 }) : suctionKPa.toFixed(1)} kPa
                  </div>
                  <div className="text-xs text-blue-200 mt-1">
                    log h = {logH.toFixed(4)} | Régimen: {filterWf <= 45.3 ? "wf ≤ 45.3% (Alta Succión)" : "wf > 45.3% (Baja Succión)"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>* Fórmulas extraídas fielmente del compendio de mecánica de suelos.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#062653] text-white font-medium hover:bg-[#0756A5] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
