"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MobileDrawer from "@/components/MobileDrawer";
import SearchModal from "@/components/SearchModal";
import NormsModal from "@/components/NormsModal";
import InteractiveToolsModal from "@/components/InteractiveToolsModal";
import ReadingProgress from "@/components/ReadingProgress";
import MathBlock from "@/components/MathBlock";
import FormulaCard from "@/components/FormulaCard";
import {
  SAMPLING_TABLE,
  CLAY_MINERALS_TABLE,
  SOIL_CLASSIFICATION_TABLE,
} from "@/data/compendioData";
import { GEOTECHNICAL_FORMULAS } from "@/data/formulasData";
import {
  BookOpen,
  Calendar,
  Layers,
  Activity,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Bookmark,
  Calculator,
  ChevronRight,
  Flame,
  Scale,
  Waves,
  ShieldAlert,
  ArrowUp,
  FileCheck2,
} from "lucide-react";

export default function CompendioPage() {
  const [activeSection, setActiveSection] = useState("sec-1-1");
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [normsOpen, setNormsOpen] = useState(false);
  const [toolsTab, setToolsTab] = useState<"spt" | "fasicas" | "ig" | "succion">("ig");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ScrollSpy logic to highlight active section in sidebar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      const sectionElements = document.querySelectorAll<HTMLElement>("section[id]");

      sectionElements.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(sec.id);
        }
      });

      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);

      // Temporary pulse animation
      el.classList.add("ring-2", "ring-[#F58220]", "rounded-xl");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-[#F58220]", "rounded-xl");
      }, 1500);
    }
  };

  const openCalculator = (tab: "spt" | "fasicas" | "ig" | "succion") => {
    setToolsTab(tab);
    setToolsOpen(true);
  };

  const getFormula = (id: string) => {
    const f = GEOTECHNICAL_FORMULAS.find((item) => item.id === id);
    if (!f) throw new Error(`Formula ${id} not found`);
    return f;
  };

  return (
    <div id="top" className="min-h-screen bg-[#F5F7FC] flex flex-col text-[#142B4D]">
      <ReadingProgress />

      {/* Top Fixed Navigation */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenMobileMenu={() => setDrawerOpen(true)}
        onOpenTools={() => setToolsOpen(true)}
        onJumpToNorms={() => setNormsOpen(true)}
      />

      {/* Docked Fixed Desktop Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={scrollToSection}
        onOpenTools={() => setToolsOpen(true)}
        onJumpToNorms={() => setNormsOpen(true)}
      />

      {/* Main Content Area: Offset for fixed top navbar (pt-16) and docked sidebar (lg:pl-72 xl:pl-80) */}
      <div className="pt-16 lg:pl-72 xl:pl-80 w-full flex-1 flex flex-col transition-[padding] duration-150">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col">
          <main className="flex-1 min-w-0 space-y-10">
            {/* Editorial Hero Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#062653] text-white shadow-xl relative overflow-hidden border border-[#0756A5]">
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#0756A5]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F58220]/10 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-xs border border-white/10">
                  <BookOpen className="w-3.5 h-3.5 text-[#F58220]" />
                  <span>Documento de Referencia Técnica y Académica</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Compendio Detallado de Mecánica de Suelos
                </h1>

                <p className="text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
                  Fundamentos Teóricos, Mineralogía, Relaciones Fásicas, Clasificación Normalizada y
                  Capilaridad
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Este compendio técnico ampliado constituye una guía completa de la mecánica de
                  suelos básica y aplicada. Integra de forma detallada los conceptos históricos,
                  metodologías de exploración geotécnica, mineralogía de arcillas, relaciones fásicas
                  gravimétricas y volumétricas, métodos de laboratorio granulométricos y de
                  plasticidad, sistemas internacionales de clasificación (USCS y AASHTO), así como
                  la física de la tensión superficial, capilaridad y succión.
                </div>

                {/* Key feature pills */}
                <div className="flex flex-wrap gap-2 pt-2 text-xs">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0756A5]/60 text-white font-medium border border-blue-400/20">
                    <FileCheck2 className="w-3.5 h-3.5 text-[#F58220]" />
                    <span>9 Normas INV E</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0756A5]/60 text-white font-medium border border-blue-400/20">
                    <Layers className="w-3.5 h-3.5 text-blue-300" />
                    <span>USCS & AASHTO</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0756A5]/60 text-white font-medium border border-blue-400/20">
                    <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Calculadoras Interactivas</span>
                  </div>
                  <button
                    onClick={() => setToolsOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F58220] hover:bg-[#DC7114] text-white font-semibold transition-colors shadow-xs ml-auto"
                  >
                    <span>Abrir Herramientas</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* CAPÍTULO 1 */}
            {/* ======================================================== */}
            <section id="capitulo-1" className="space-y-8 scroll-mt-24">
              <div className="border-b-2 border-[#062653] pb-2">
                <span className="text-xs font-black tracking-widest text-[#F58220] uppercase">
                  Capítulo 1
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#062653] tracking-tight">
                  Generalidades, Evolución Histórica y Exploración Geotécnica
                </h2>
              </div>

              {/* SECTION 1.1 */}
              <section id="sec-1-1" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0756A5] text-white flex items-center justify-center font-bold text-xs">
                      1.1
                    </span>
                    <h3 className="font-bold text-lg text-[#062653]">
                      Definición y Evolución Histórica de la Mecánica de Suelos
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#0756A5] border border-blue-200">
                    Fundamentos
                  </span>
                </div>

                {/* Karl Terzaghi definition box */}
                <div className="p-4 rounded-xl bg-[#F5F7FC] border-l-4 border-[#0756A5] text-sm text-[#142B4D] leading-relaxed">
                  <p className="font-semibold text-[#062653] mb-1">
                    Definición Canónica por Karl Terzaghi (1925):
                  </p>
                  <p className="italic text-slate-700">
                    &quot;Karl Terzaghi (1925) definió la Mecánica de Suelos en su obra insigne{" "}
                    <span className="font-semibold text-[#062653]">Erdbaumechanik</span> como la
                    aplicación de las leyes de la mecánica y la hidráulica a los problemas de
                    ingeniería que tratan con sedimentos y acumulaciones no consolidadas de
                    partículas sólidas, originadas por la desintegración mecánica o desintegración
                    química de las rocas.&quot;
                  </p>
                </div>

                {/* Historical Timeline */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#0756A5]" />
                    Hitos Históricos Fundacionales:
                  </h4>

                  <div className="relative border-l-2 border-[#0756A5]/30 ml-3 pl-5 space-y-5">
                    {/* Item 1 */}
                    <div className="relative">
                      <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#0756A5] border-2 border-white ring-2 ring-[#0756A5]/20" />
                      <div className="font-bold text-xs sm:text-sm text-[#062653]">
                        Siglos XVII - XVIII (Etapa Pre-clásica)
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                        Construcción basada en métodos meramente empíricos y carencia de una teoría
                        unificada sobre la interacción entre la estructura y el suelo.
                      </p>
                    </div>

                    {/* Item 2 */}
                    <div className="relative">
                      <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#F58220] border-2 border-white ring-2 ring-[#F58220]/20" />
                      <div className="font-bold text-xs sm:text-sm text-[#062653] flex items-center gap-2">
                        <span>1925 (Nacimiento de la Mecánica de Suelos Moderna)</span>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-[#F58220]">
                          Karl Terzaghi
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                        Karl Terzaghi formula el principio fundamental del esfuerzo efectivo{" "}
                        <span className="font-semibold text-[#062653]">(σ&apos; = σ - u)</span>,
                        explicando la consolidación hidrodinámica y la deformación diferida en el
                        tiempo.
                      </p>
                    </div>

                    {/* Item 3 */}
                    <div className="relative">
                      <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#0756A5] border-2 border-white ring-2 ring-[#0756A5]/20" />
                      <div className="font-bold text-xs sm:text-sm text-[#062653]">
                        1930s - 1940s (Escuela de Harvard y Arthur Casagrande)
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                        Organización de la 1ª Conferencia Internacional (1936), desarrollo de la
                        Carta de Plasticidad, normalización universal de los límites de consistencia
                        de Atterberg y estandarización de ensayos de laboratorio.
                      </p>
                    </div>

                    {/* Item 4 */}
                    <div className="relative">
                      <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#0756A5] border-2 border-white ring-2 ring-[#0756A5]/20" />
                      <div className="font-bold text-xs sm:text-sm text-[#062653]">
                        1940s - 1960s (Skempton, Bjerrum, Fellenius)
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                        Avances cuantitativos en resistencia al corte no drenada (Su), estabilidad
                        de taludes, capacidad de carga geotécnica y consolidación secundaria.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Formula Skempton */}
                <FormulaCard
                  formula={getFormula("formula-skempton")}
                  onOpenCalculator={openCalculator}
                />
              </section>

              {/* SECTION 1.2 */}
              <section id="sec-1-2" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0756A5] text-white flex items-center justify-center font-bold text-xs">
                      1.2
                    </span>
                    <h3 className="font-bold text-lg text-[#062653]">
                      Exploración de Campo, Métodos de Muestreo y Normativa
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-[#F58220] border border-amber-200">
                    Muestreo & SPT
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  La exploración del subsuelo requiere una planificación previa meticulosa,
                  calibración de equipos y protocolos de seguridad. Las investigaciones directas
                  comprenden <strong>apiques o calicatas</strong> (excavaciones a cielo abierto para
                  inspección estrato por estrato) y <strong>barrenos manuales o mecánicos</strong>.
                </p>

                {/* Sampling Methods Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#062653]">
                      Matriz Normalizada de Métodos de Muestreo Geotécnico
                    </h4>
                    <span className="text-[11px] text-slate-500">Normas INVIAS E-101 / 104 / 105</span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#062653] text-white font-semibold">
                          <th className="py-3 px-3.5 border-r border-blue-900">Tipo de Muestra</th>
                          <th className="py-3 px-3.5 border-r border-blue-900">Método de Extracción</th>
                          <th className="py-3 px-3.5 border-r border-blue-900">Norma INV E</th>
                          <th className="py-3 px-3.5 border-r border-blue-900">Preservación de Estructura</th>
                          <th className="py-3 px-3.5">Ensayos Destinados</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {SAMPLING_TABLE.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3.5 font-bold text-[#062653] whitespace-nowrap">
                              {row.sampleType}
                            </td>
                            <td className="py-3 px-3.5 text-slate-700">{row.extractionMethod}</td>
                            <td className="py-3 px-3.5">
                              <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-blue-50 text-[#0756A5] border border-blue-200">
                                {row.norm}
                              </span>
                            </td>
                            <td className="py-3 px-3.5 text-slate-700">{row.preservation}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-800">
                              {row.designatedTests}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Ensayo SPT Callout */}
                <div className="p-4 rounded-xl bg-[#EBF3FC] border border-[#0756A5]/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#F58220]" />
                    <h4 className="font-bold text-sm text-[#062653]">
                      Ensayo de Penetración Estándar (SPT)
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Consiste en hincar un muestreador partido mediante la caída libre de un martillo
                    de <strong>63.5 kg</strong> desde una altura de <strong>76 cm</strong>. El
                    número de golpes obtenido (N) debe ser corregido rígidamente para estandarizar
                    la energía real entregada al suelo:
                  </p>
                </div>

                {/* SPT Formula Card */}
                <FormulaCard formula={getFormula("formula-spt")} onOpenCalculator={openCalculator} />
              </section>
            </section>

            {/* ======================================================== */}
            {/* CAPÍTULO 2 */}
            {/* ======================================================== */}
            <section id="capitulo-2" className="space-y-8 scroll-mt-24">
              <div className="border-b-2 border-[#062653] pb-2">
                <span className="text-xs font-black tracking-widest text-[#F58220] uppercase">
                  Capítulo 2
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#062653] tracking-tight">
                  Mineralogía de Arcillas y Relaciones Gravimétricas y Volumétricas
                </h2>
              </div>

              {/* SECTION 2.1 */}
              <section id="sec-2-1" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0756A5] text-white flex items-center justify-center font-bold text-xs">
                      2.1
                    </span>
                    <h3 className="font-bold text-lg text-[#062653]">
                      Fundamentos de Mineralogía y Estructura Cristalina
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#0756A5] border border-blue-200">
                    Cristaloquímica
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed space-y-2">
                  <p>
                    Los silicatos representan más del <strong>90% de la corteza terrestre</strong>.
                    La unidad fundamental estructural es el <strong>tetraedro de sílice</strong> (Si⁴⁺
                    coordinado con 4 átomos de O²⁻).
                  </p>
                  <p>
                    Las hojas octaédricas pueden ser de <strong>Gibsita</strong> (Al³⁺ rodeado de 6
                    grupos OH⁻/O²⁻) o de <strong>Brucita</strong> (Mg²⁺ rodeado de 6 OH⁻).
                  </p>
                </div>

                {/* Clay Minerals Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#062653]">
                      Comparativa Estructural y Geotécnica de Minerales Arcillosos
                    </h4>
                    <span className="text-[11px] text-slate-500">Estructuras 1:1 vs 2:1</span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#062653] text-white font-semibold">
                          <th className="py-3 px-3.5 border-r border-blue-900">Grupo Mineral</th>
                          <th className="py-3 px-3.5 border-r border-blue-900">Estructura Cristalina</th>
                          <th className="py-3 px-3.5 border-r border-blue-900">Tipo de Enlace Interlaminar</th>
                          <th className="py-3 px-3.5 border-r border-blue-900">Propiedades de Plasticidad</th>
                          <th className="py-3 px-3.5">Comportamiento Geotécnico</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {CLAY_MINERALS_TABLE.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3.5 font-bold text-[#062653] whitespace-nowrap">
                              {row.group}
                            </td>
                            <td className="py-3 px-3.5 font-mono text-[11px] text-[#0756A5]">
                              {row.structure}
                            </td>
                            <td className="py-3 px-3.5 text-slate-700">{row.interlayerBond}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.plasticityProperties}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-800">
                              {row.geotechnicalBehavior}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* SECTION 2.2 */}
              <section id="sec-2-2" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0756A5] text-white flex items-center justify-center font-bold text-xs">
                      2.2
                    </span>
                    <h3 className="font-bold text-lg text-[#062653]">
                      Composición Trifásica y Relaciones Gravimétricas y Volumétricas
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    11 Ecuaciones
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#F5F7FC] border border-slate-200 text-sm text-slate-700 leading-relaxed">
                  El suelo es un sistema multifásico compuesto por:
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm">
                    <li>
                      <strong>(1) Fase Sólida:</strong> partículas minerales originadas por
                      meteorización física o química.
                    </li>
                    <li>
                      <strong>(2) Fase Líquida:</strong> agua libre y agua adsorbida ligada a la
                      superficie de las partículas.
                    </li>
                    <li>
                      <strong>(3) Fase Gaseosa:</strong> aire u otros gases ocupando los vacíos
                      libres.
                    </li>
                  </ul>
                  <p className="mt-2 text-xs text-slate-600">
                    Las relaciones fundamentales entre los pesos y volúmenes de estas fases permiten
                    modelar cuantitativamente el comportamiento del suelo.
                  </p>
                </div>

                {/* Phase Equations Cards */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#062653]">
                      Resumen Completo de Ecuaciones de Relaciones Fásicas
                    </h4>
                    <button
                      onClick={() => openCalculator("fasicas")}
                      className="text-xs font-semibold text-[#0756A5] hover:text-[#062653] flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
                    >
                      <Calculator className="w-3.5 h-3.5 text-[#F58220]" />
                      <span>Calcular en vivo</span>
                    </button>
                  </div>

                  {/* 1. Porosidad y Vacios */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormulaCard formula={getFormula("formula-porosidad")} />
                    <FormulaCard formula={getFormula("formula-vacios")} />
                  </div>

                  {/* 2. Conversiones n y e */}
                  <FormulaCard formula={getFormula("formula-conversion-n-e")} />

                  {/* 3. Saturación y Humedad */}
                  <FormulaCard formula={getFormula("formula-saturacion")} />

                  {/* 4. Relación Fundamental */}
                  <FormulaCard
                    formula={getFormula("formula-relacion-fundamental")}
                    onOpenCalculator={openCalculator}
                  />

                  {/* 5. Pesos Unitarios */}
                  <FormulaCard formula={getFormula("formula-pesos-unitarios")} />
                </div>
              </section>

              {/* SECTION 2.3 */}
              <section id="sec-2-3" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0756A5] text-white flex items-center justify-center font-bold text-xs">
                      2.3
                    </span>
                    <h3 className="font-bold text-lg text-[#062653]">
                      Comparación de Propiedades Índice entre Suelos y Rocas
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Geomecánica
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed space-y-3">
                  <p>
                    En la mecánica de rocas, a diferencia del suelo donde la porosidad es totalmente
                    accesible y deformable, se distingue claramente entre la{" "}
                    <strong>porosidad accesible</strong> (
                    <MathBlock math="V_{ha}" display={false} />) y la{" "}
                    <strong>porosidad inaccesible</strong> (
                    <MathBlock math="V_{hi}" display={false} />) contenida en vesículas estancas.
                  </p>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs sm:text-sm">
                    <span className="font-bold text-[#062653] block mb-1">
                      Porosidad Eficaz en Macizos Rocosos:
                    </span>
                    <MathBlock math="n_e = \frac{V_{ha}}{V_T}" display={true} />
                    <p className="text-xs text-slate-600 mt-1">
                      La porosidad eficaz dicta la permeabilidad primaria de la matriz rocosa intacta.
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700">
                    Además, la resistencia a la compresión simple en rocas (
                    <MathBlock math="\sigma_c" display={false} />) presenta una correlación
                    inversamente proporcional con el incremento de la porosidad: a mayor volumen de
                    poros o microfisuras, la resistencia mecánica del material decae exponencialmente.
                  </p>
                </div>
              </section>
            </section>

            {/* ======================================================== */}
            {/* CAPÍTULO 3 */}
            {/* ======================================================== */}
            <section id="capitulo-3" className="space-y-8 scroll-mt-24">
              <div className="border-b-2 border-[#062653] pb-2">
                <span className="text-xs font-black tracking-widest text-[#F58220] uppercase">
                  Capítulo 3
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#062653] tracking-tight">
                  Estructura, Granulometría y Clasificación de Suelos
                </h2>
              </div>

              {/* SECTION 3.1 */}
              <section id="sec-3-1" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0756A5] text-white flex items-center justify-center font-bold text-xs">
                      3.1
                    </span>
                    <h3 className="font-bold text-lg text-[#062653]">
                      Distribución Granulométrica y Métodos de Laboratorio
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#0756A5] border border-blue-200">
                    INV E-123 & E-235
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  El análisis granulométrico determina la proporción cuantitativa de los tamaños de
                  grano presentes en el suelo. Para fracciones gruesas (retenido en{" "}
                  <strong>Tamiz #200 / 0.075 mm</strong>) se emplea el{" "}
                  <strong>Tamizado mecánico (INV E-123)</strong>. La distribución se evalúa mediante
                  dos coeficientes numéricos característicos:
                </p>

                {/* Coeficientes Cu y Cc */}
                <FormulaCard formula={getFormula("formula-cu-cc")} />

                {/* Ensayos en Suelos Finos */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#062653]">
                    Ensayos en Suelos Finos (Pasa Tamiz #200):
                  </h4>

                  {/* 1. Hidrómetro */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#0756A5] text-white text-xs font-bold flex items-center justify-center">
                        1
                      </span>
                      <h5 className="font-bold text-sm text-[#062653]">
                        Método del Hidrómetro (Ley de Stokes)
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Fundamentado en la Ley de Stokes para la velocidad de caída de partículas
                      esféricas en un medio fluido:
                    </p>
                    <MathBlock math="v = K \cdot D^2" display={true} />
                    <p className="text-xs text-slate-700">
                      Requiere aplicar dos correcciones rigurosas a las lecturas del hidrómetro:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <span className="font-bold text-[#062653] block mb-0.5">
                          Corrección por Menisco (Cm):
                        </span>
                        <p className="text-slate-600">
                          Adición de aprox. <strong>+1 unidad</strong> debido a la lectura tomada en
                          la parte superior del menisco formado en el vástago.
                        </p>
                      </div>

                      <div className="p-3 bg-white rounded-lg border border-slate-200">
                        <span className="font-bold text-[#062653] block mb-0.5">
                          Corrección por Defloculante (Cd):
                        </span>
                        <p className="text-slate-600">
                          Se agrega <strong>Hexametafosfato de Sodio (NaPO₃)</strong> para
                          neutralizar las cargas eléctricas superficiales y evitar la floculación de
                          arcillas.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Azul de Metileno */}
                  <div className="p-4 rounded-xl bg-[#EBF3FC] border border-[#0756A5]/30 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#F58220] text-white text-xs font-bold flex items-center justify-center">
                        2
                      </span>
                      <h5 className="font-bold text-sm text-[#062653]">
                        Ensayo de Azul de Metileno (INV E-235 / 2013)
                      </h5>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Mide la cantidad de tinte absorbido por la fracción fina pasa tamiz #200 para
                      cuantificar la superficie específica y la actividad de los minerales
                      arcillosos presentes.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 3.2 */}
              <section id="sec-3-2" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0756A5] text-white flex items-center justify-center font-bold text-xs">
                      3.2
                    </span>
                    <h3 className="font-bold text-lg text-[#062653]">
                      Límites de Atterberg y Ensayos de Consistencia (INV E-125, E-126)
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-[#F58220] border border-amber-200">
                    INV E-125 / E-126
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
                  <p className="mb-3">
                    Los límites de consistencia establecen los contenidos de humedad en los cuales
                    un suelo fino pasa de un estado físico a otro:
                  </p>

                  {/* Flow Diagram of States */}
                  <div className="flex items-center justify-center flex-wrap gap-2 text-xs font-semibold py-2">
                    <span className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-900">
                      Estado Líquido
                    </span>
                    <span className="text-[#F58220] font-black">→ [LL] →</span>
                    <span className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900">
                      Estado Plástico
                    </span>
                    <span className="text-[#F58220] font-black">→ [LP] →</span>
                    <span className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-800">
                      Estado Semisólido
                    </span>
                    <span className="text-[#F58220] font-black">→ [LC] →</span>
                    <span className="px-3 py-1.5 rounded-lg bg-stone-300 text-stone-900">
                      Estado Sólido
                    </span>
                  </div>
                </div>

                {/* Shrinkage Formulas */}
                <FormulaCard formula={getFormula("formula-atterberg-contraccion")} />
              </section>

              {/* SECTION 3.3 */}
              <section id="sec-3-3" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0756A5] text-white flex items-center justify-center font-bold text-xs">
                      3.3
                    </span>
                    <h3 className="font-bold text-lg text-[#062653]">
                      Sistemas de Clasificación de Suelos (USCS y AASHTO)
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    INV E-180 (IG)
                  </span>
                </div>

                {/* Classification Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#062653]">
                      Matriz Comparativa de Clasificación Geotécnica
                    </h4>
                    <span className="text-[11px] text-slate-500">USCS vs AASHTO</span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#062653] text-white font-semibold">
                          <th className="py-3 px-3.5 border-r border-blue-900">Sistema</th>
                          <th className="py-3 px-3.5 border-r border-blue-900">Símbolo</th>
                          <th className="py-3 px-3.5 border-r border-blue-900">Descripción del Grupo</th>
                          <th className="py-3 px-3.5 border-r border-blue-900">
                            Criterio Granulométrico / Plasticidad
                          </th>
                          <th className="py-3 px-3.5">Campo de Aplicación Geotécnica</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {SOIL_CLASSIFICATION_TABLE.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3.5 font-bold text-[#0756A5]">
                              {row.system}
                            </td>
                            <td className="py-3 px-3.5 font-mono font-bold text-[#F58220] whitespace-nowrap">
                              {row.symbol}
                            </td>
                            <td className="py-3 px-3.5 font-medium text-slate-800">
                              {row.description}
                            </td>
                            <td className="py-3 px-3.5 text-slate-700">{row.criteria}</td>
                            <td className="py-3 px-3.5 text-slate-700">
                              {row.geotechnicalApplication}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* AASHTO Group Index Section */}
                <div className="p-4 rounded-xl bg-[#EBF3FC] border border-[#0756A5]/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-[#062653] flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-[#F58220]" />
                      Índice de Grupo (IG) en Sistema AASHTO (INV E-180)
                    </h4>
                    <button
                      onClick={() => openCalculator("ig")}
                      className="text-xs font-semibold text-[#0756A5] hover:text-[#062653] flex items-center gap-1 bg-white px-2 py-0.5 rounded shadow-2xs border border-blue-200"
                    >
                      <Calculator className="w-3 h-3 text-[#F58220]" />
                      <span>Calcular IG</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Permite graduar la calidad de un suelo fino como subrasante vial. Se calcula
                    mediante la ecuación:
                  </p>
                </div>

                {/* IG Formula Card */}
                <FormulaCard
                  formula={getFormula("formula-indice-grupo")}
                  onOpenCalculator={openCalculator}
                />
              </section>
            </section>

            {/* ======================================================== */}
            {/* CAPÍTULO 4 */}
            {/* ======================================================== */}
            <section id="capitulo-4" className="space-y-8 scroll-mt-24">
              <div className="border-b-2 border-[#062653] pb-2">
                <span className="text-xs font-black tracking-widest text-[#F58220] uppercase">
                  Capítulo 4
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#062653] tracking-tight">
                  El Agua en los Suelos: Tensión Superficial, Capilaridad y Succión
                </h2>
              </div>

              {/* SECTION 4.1 */}
              <section id="sec-4-1" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0756A5] text-white flex items-center justify-center font-bold text-xs">
                      4.1
                    </span>
                    <h3 className="font-bold text-lg text-[#062653]">
                      El Agua en el Ciclo Hidrológico y su Importancia en Ingeniería Civil
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#0756A5] border border-blue-200">
                    Hidrogeología
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  El agua subterránea interactúa de forma dinámica con la fase sólida del suelo a
                  través de los procesos hidrológicos de precipitación, infiltración, escorrentía,
                  evaporación y evapotranspiración. En las obras de ingeniería geotécnica, el estudio
                  del agua es determinante para:
                </p>

                {/* 4 Pillars of Water in Soils */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2">
                      <Waves className="w-4 h-4 text-[#0756A5]" />
                      <h4 className="font-bold text-xs sm:text-sm text-[#062653]">
                        Flujo y Permeabilidad
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Cálculo de caudales de filtración y fugas en presas de tierra y redes de flujo.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#F58220]" />
                      <h4 className="font-bold text-xs sm:text-sm text-[#062653]">
                        Esfuerzo Efectivo y Resistencia
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Control de la presión de poros (u) que reduce la resistencia al corte:
                      <MathBlock math="\tau = c' + \sigma' \tan\phi'" display={false} />
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      <h4 className="font-bold text-xs sm:text-sm text-[#062653]">
                        Asentamientos
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Determinación de la velocidad de consolidación primaria y deformaciones
                      verticales en el tiempo.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <h4 className="font-bold text-xs sm:text-sm text-[#062653]">
                        Presiones Hidrostáticas
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Empujes de agua sobre estructuras de contención y superficies potenciales de
                      falla en taludes.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 4.2 */}
              <section id="sec-4-2" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0756A5] text-white flex items-center justify-center font-bold text-xs">
                      4.2
                    </span>
                    <h3 className="font-bold text-lg text-[#062653]">
                      Tensión Superficial y Ascenso Capilar
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#0756A5] border border-blue-200">
                    Ecuación hc
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  La <strong>Tensión Superficial (Ts)</strong> surge del desequilibrio de las
                  fuerzas de atracción intermolecular en la superficie libre del agua en contacto
                  con el aire. En los poros del suelo, que actúan como finos tubos capilares
                  interconectados, la tensión superficial genera un menisco cóncavo que eleva la
                  columna de agua por encima del Nivel Freático (N.F.).
                </p>

                {/* Capillarity Formula */}
                <FormulaCard formula={getFormula("formula-capilaridad")} />

                {/* Geotechnical effect by soil type */}
                <div className="p-4 rounded-xl bg-[#F5F7FC] border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#062653] flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-[#0756A5]" />
                    Efecto Geotécnico Cuantitativo según Tipo de Suelo:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                      <span className="font-bold text-slate-500 block">Gravas</span>
                      <span className="text-lg font-extrabold text-[#062653] block my-0.5">
                        &lt; 10 cm
                      </span>
                      <span className="text-[11px] text-slate-500">Ascenso casi nulo</span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                      <span className="font-bold text-slate-500 block">Arenas Finas</span>
                      <span className="text-lg font-extrabold text-[#0756A5] block my-0.5">
                        0.3 m - 1.0 m
                      </span>
                      <span className="text-[11px] text-slate-500">Capilaridad moderada</span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-center">
                      <span className="font-bold text-slate-500 block">Arcillas Finas</span>
                      <span className="text-lg font-extrabold text-[#F58220] block my-0.5">
                        3.0 m - 10.0 m
                      </span>
                      <span className="text-[11px] text-slate-500">Ascenso muy significativo</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 4.3 */}
              <section id="sec-4-3" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 scroll-mt-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#0756A5] text-white flex items-center justify-center font-bold text-xs">
                      4.3
                    </span>
                    <h3 className="font-bold text-lg text-[#062653]">
                      Succión en Suelos no Saturados y Fenómeno de Licuación
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-[#F58220] border border-amber-200">
                    INV E-159 & Licuación
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed space-y-2">
                  <p>
                    En la zona no saturada del suelo, el agua retenida por capilaridad genera
                    presiones de poros negativas (<strong>succión matricial</strong>). La{" "}
                    <strong>Succión Total</strong> comprende dos componentes fundamentales:
                  </p>
                  <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1">
                    <li>
                      <strong>Succión Matricial (uₐ - u_w):</strong> Asociada a la tensión
                      superficial y los efectos de curvatura en los meniscos capilares.
                    </li>
                    <li>
                      <strong>Succión Osmótica (ψₒ):</strong> Ocasionada por la concentración de
                      sales disueltas en el agua de los poros.
                    </li>
                  </ul>
                </div>

                {/* Filter paper INV E-159 */}
                <div className="p-4 rounded-xl bg-[#EBF3FC] border border-[#0756A5]/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-[#062653]">
                      Determinación de la Succión mediante Papel de Filtro (INV E-159 / 2013)
                    </h4>
                    <button
                      onClick={() => openCalculator("succion")}
                      className="text-xs font-semibold text-[#0756A5] hover:text-[#062653] flex items-center gap-1 bg-white px-2 py-0.5 rounded shadow-2xs border border-blue-200"
                    >
                      <Calculator className="w-3 h-3 text-[#F58220]" />
                      <span>Calcular Succión</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    El ensayo coloca discos de papel de filtro (<strong>Whatman No. 42</strong>) en
                    contacto directo (para succión matricial) o suspendido (para succión total) con
                    la muestra de suelo a <strong>20±3°C</strong> durante un período de equilibrio.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    La succión (h en kPa) se calcula mediante las curvas de calibración logarítmicas
                    en función del contenido de humedad del papel de filtro (wf):
                  </p>
                </div>

                {/* Filter paper formula */}
                <FormulaCard
                  formula={getFormula("formula-papel-filtro")}
                  onOpenCalculator={openCalculator}
                />

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 font-medium">
                  <strong>Nota Técnica:</strong> Para obtener la succión real h se aplica la
                  función antilogaritmo: <MathBlock math="h = 10^{\log h}" display={false} /> (en
                  kPa).
                </div>

                {/* Liquefaction Box */}
                <div className="p-5 rounded-xl bg-linear-to-br from-red-50 to-orange-50 border border-red-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h4 className="font-bold text-sm sm:text-base text-red-950">
                      Fenómeno de Licuación de Suelos
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    En arenas finas o limos saturados no consolidados sometidos a cargas dinámicas
                    (sismos o vibraciones), la presión de poros aumenta rápidamente (
                    <MathBlock math="u \to \sigma" display={false} />
                    ). De acuerdo con la ecuación de esfuerzo efectivo (
                    <MathBlock math="\sigma' = \sigma - u" display={false} />
                    ), el esfuerzo efectivo se reduce a cero (
                    <MathBlock math="\sigma' = 0" display={false} />
                    ), anulando la resistencia al corte del suelo (
                    <MathBlock math="\tau = 0" display={false} />
                    ) y haciendo que el terreno se comporte momentáneamente como un líquido denso.
                  </p>

                  <FormulaCard formula={getFormula("formula-licuacion")} />
                </div>
              </section>
            </section>

            {/* ======================================================== */}
            {/* CONCLUSIONES Y SÍNTESIS */}
            {/* ======================================================== */}
            <section id="conclusiones" className="space-y-6 scroll-mt-24">
              <div className="border-b-2 border-[#062653] pb-2">
                <span className="text-xs font-black tracking-widest text-[#F58220] uppercase">
                  Síntesis y Aplicabilidad
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#062653] tracking-tight">
                  Conclusiones y Síntesis de Aplicabilidad Práctica
                </h2>
              </div>

              <section id="sec-conclusiones" className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5 scroll-mt-24">
                <div className="flex items-center gap-2 text-[#062653] font-bold text-base border-b border-slate-100 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>4 Pilares Indispensables para la Ingeniería Geotécnica Práctica:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Point 1 */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0756A5] transition-colors space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#062653] text-white text-xs font-bold flex items-center justify-center">
                        1
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#062653]">
                        Muestreo Inalterado y Corrección SPT
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      La correcta toma de muestras inalteradas (<strong>INV E-104/105</strong>) y la
                      corrección energética del SPT (<strong>N₆₀</strong>) son indispensables para
                      análisis de cimentaciones.
                    </p>
                  </div>

                  {/* Point 2 */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0756A5] transition-colors space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#062653] text-white text-xs font-bold flex items-center justify-center">
                        2
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#062653]">
                        Mineralogía y Potencial Expansivo
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      La mineralogía determina el potencial expansivo: las{" "}
                      <strong>montmorillonitas</strong> demandan especial atención geotécnica frente
                      a las <strong>caolinitas</strong>.
                    </p>
                  </div>

                  {/* Point 3 */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0756A5] transition-colors space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#062653] text-white text-xs font-bold flex items-center justify-center">
                        3
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#062653]">
                        Clasificación Estandarizada
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      La clasificación <strong>USCS</strong> y <strong>AASHTO</strong> junto a los{" "}
                      <strong>Límites de Atterberg</strong> brindan el marco de diseño estandarizado
                      para carreteras y estructuras.
                    </p>
                  </div>

                  {/* Point 4 */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0756A5] transition-colors space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#062653] text-white text-xs font-bold flex items-center justify-center">
                        4
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#062653]">
                        Capilaridad, Succión y Licuación
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      La física de la capilaridad y succión (<strong>INV E-159</strong>) explica la
                      estabilidad de taludes no saturados y previene fallas dinámicas por{" "}
                      <strong>licuación</strong>.
                    </p>
                  </div>
                </div>
              </section>
            </section>

            {/* Document Footer */}
            <footer className="pt-8 pb-12 border-t border-slate-200 text-center space-y-3">
              <div className="flex items-center justify-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#062653] text-[#F58220] flex items-center justify-center font-bold text-xs">
                  MS
                </div>
                <span className="font-bold text-sm text-[#062653]">
                  Compendio Detallado de Mecánica de Suelos
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                Basado en el documento de referencia técnica oficial v2.0. Desarrollado con Next.js,
                TypeScript, Tailwind CSS y KaTeX.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-[#0756A5] font-medium pt-1">
                <button onClick={() => setNormsOpen(true)} className="hover:underline">
                  Índice de Normas INV E
                </button>
                <span>•</span>
                <button onClick={() => setToolsOpen(true)} className="hover:underline">
                  Calculadoras Geotécnicas
                </button>
                <span>•</span>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="hover:underline"
                >
                  Volver al inicio
                </button>
              </div>
            </footer>
          </main>
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-[#062653] text-white shadow-xl hover:bg-[#0756A5] hover:scale-105 transition-all border border-white/20"
        >
          <ArrowUp className="w-5 h-5 text-[#F58220]" />
        </button>
      )}

      {/* Modals & Drawers */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={scrollToSection}
      />

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeSection={activeSection}
        onSelectSection={scrollToSection}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenTools={() => setToolsOpen(true)}
        onJumpToNorms={() => setNormsOpen(true)}
      />

      <InteractiveToolsModal
        isOpen={toolsOpen}
        onClose={() => setToolsOpen(false)}
        initialTab={toolsTab}
      />

      <NormsModal
        isOpen={normsOpen}
        onClose={() => setNormsOpen(false)}
        onSelectNorm={scrollToSection}
      />
    </div>
  );
}
