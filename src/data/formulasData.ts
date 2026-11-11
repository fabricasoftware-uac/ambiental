export interface GeotechnicalFormula {
  id: string;
  category: string;
  name: string;
  latex: string;
  explanation: string;
  sectionId: string;
  norm?: string;
  variables: { symbol: string; meaning: string }[];
}

export const GEOTECHNICAL_FORMULAS: GeotechnicalFormula[] = [
  {
    id: "formula-skempton",
    category: "Capítulo 1: Exploración y Fundaciones",
    name: "Capacidad Portante de Cimentaciones (Método Skempton - CPT)",
    latex: "R_d = K_c \\cdot N_c \\cdot S_u + \\gamma \\cdot D",
    explanation:
      "Determina la capacidad portante unitaria de cimentaciones directas en suelos cohesivos no drenados.",
    sectionId: "sec-1-1",
    variables: [
      { symbol: "R_d", meaning: "Capacidad portante unitaria del suelo" },
      { symbol: "K_c", meaning: "Factor de inclinación de la carga" },
      { symbol: "N_c", meaning: "Factor de capacidad portante de Skempton" },
      { symbol: "S_u", meaning: "Resistencia al corte no drenada" },
      { symbol: "\\gamma", meaning: "Peso unitario del suelo sobre la base" },
      { symbol: "D", meaning: "Profundidad de desplante de la zapata" },
    ],
  },
  {
    id: "formula-spt",
    category: "Capítulo 1: Exploración Geotécnica",
    name: "Corrección Energética del Ensayo SPT (N60)",
    latex: "N_{60} = N \\cdot \\left(\\frac{E_m}{60}\\right) \\cdot C_B \\cdot C_S \\cdot C_R",
    explanation:
      "Normaliza el número de golpes de campo al 60% de la energía teórica de caída libre.",
    sectionId: "sec-1-2",
    variables: [
      { symbol: "N", meaning: "Número de golpes registrado en campo (masa 63.5 kg, caída 76 cm)" },
      { symbol: "E_m", meaning: "Eficiencia del martillo (45% a 80% según el tipo de sistema)" },
      { symbol: "C_B", meaning: "Corrección por diámetro de perforación (1.0 para 65-115 mm, 1.05 para 150 mm)" },
      { symbol: "C_S", meaning: "Corrección por muestreador con o sin revestimiento interior (1.0 a 1.2)" },
      { symbol: "C_R", meaning: "Corrección por longitud de varillaje (0.75 para <4m, 1.0 para >10m)" },
    ],
  },
  {
    id: "formula-porosidad",
    category: "Capítulo 2: Relaciones Fásicas",
    name: "Porosidad (n)",
    latex: "n = \\left(\\frac{V_v}{V_T}\\right) \\cdot 100\\%",
    explanation: "Proporción porcentual del volumen de vacíos respecto al volumen total del suelo.",
    sectionId: "sec-2-2",
    variables: [
      { symbol: "V_v", meaning: "Volumen de vacíos (agua + aire)" },
      { symbol: "V_T", meaning: "Volumen total de la masa de suelo" },
    ],
  },
  {
    id: "formula-vacios",
    category: "Capítulo 2: Relaciones Fásicas",
    name: "Relación de Vacíos (e)",
    latex: "e = \\frac{V_v}{V_s}",
    explanation: "Relación entre el volumen de vacíos y el volumen ocupado por los sólidos minerales.",
    sectionId: "sec-2-2",
    variables: [
      { symbol: "V_v", meaning: "Volumen de vacíos" },
      { symbol: "V_s", meaning: "Volumen de partículas sólidas" },
    ],
  },
  {
    id: "formula-conversion-n-e",
    category: "Capítulo 2: Relaciones Fásicas",
    name: "Conversión entre Porosidad (n) y Relación de Vacíos (e)",
    latex: "n = \\frac{e}{1 + e} \\quad\\Longleftrightarrow\\quad e = \\frac{n}{1 - n}",
    explanation: "Permite transformar indistintamente porosidad volumétrica y relación de vacíos.",
    sectionId: "sec-2-2",
    variables: [
      { symbol: "n", meaning: "Porosidad (en fracción decimal)" },
      { symbol: "e", meaning: "Relación de vacíos" },
    ],
  },
  {
    id: "formula-saturacion",
    category: "Capítulo 2: Relaciones Fásicas",
    name: "Grado de Saturación (Sr) y Contenido de Humedad (w)",
    latex: "S_r = \\left(\\frac{V_w}{V_v}\\right) \\cdot 100\\% \\quad,\\quad w = \\left(\\frac{P_w}{P_s}\\right) \\cdot 100\\%",
    explanation:
      "Sr cuantifica el llenado de los poros con agua; w cuantifica el peso del agua respecto a los sólidos secos.",
    sectionId: "sec-2-2",
    variables: [
      { symbol: "V_w", meaning: "Volumen de la fase líquida (agua)" },
      { symbol: "V_v", meaning: "Volumen de vacíos totales" },
      { symbol: "P_w", meaning: "Peso del agua evaporable" },
      { symbol: "P_s", meaning: "Peso de las partículas sólidas secas" },
    ],
  },
  {
    id: "formula-relacion-fundamental",
    category: "Capítulo 2: Relaciones Fásicas",
    name: "Gravedad Específica (Gs) y Relación Fundamental del Suelo",
    latex: "G_s = \\frac{P_s}{V_s \\cdot \\gamma_w} \\quad\\Longrightarrow\\quad e \\cdot S_r = w \\cdot G_s",
    explanation:
      "La ecuación fundamental que vincula vacíos, saturación, humedad gravimétrica y peso específico de sólidos.",
    sectionId: "sec-2-2",
    variables: [
      { symbol: "G_s", meaning: "Gravedad específica de los sólidos" },
      { symbol: "e", meaning: "Relación de vacíos" },
      { symbol: "S_r", meaning: "Grado de saturación (en fracción decimal)" },
      { symbol: "w", meaning: "Contenido de humedad (en fracción decimal)" },
      { symbol: "\\gamma_w", meaning: "Peso unitario del agua destilada (9.81 kN/m³ ó 1.0 g/cm³)" },
    ],
  },
  {
    id: "formula-pesos-unitarios",
    category: "Capítulo 2: Relaciones Fásicas",
    name: "Pesos Unitarios: Húmedo (γm), Seco (γd), Saturado (γsat) y Sumergido (γ')",
    latex: "\\begin{aligned} \\gamma_m &= \\frac{P_T}{V_T} = \\left[\\frac{G_s + e \\cdot S_r}{1 + e}\\right] \\gamma_w \\\\[4pt] \\gamma_d &= \\frac{P_s}{V_T} = \\frac{\\gamma_m}{1 + w} = \\left[\\frac{G_s}{1 + e}\\right] \\gamma_w \\\\[4pt] \\gamma_{sat} &= \\left[\\frac{G_s + e}{1 + e}\\right] \\gamma_w \\\\[4pt] \\gamma' &= \\gamma_{sat} - \\gamma_w = \\left[\\frac{G_s - 1}{1 + e}\\right] \\gamma_w \\end{aligned}",
    explanation:
      "Expresiones completas para el peso volumétrico en cualquier condición de campo y bajo el nivel freático.",
    sectionId: "sec-2-2",
    variables: [
      { symbol: "\\gamma_m", meaning: "Peso unitario húmedo total" },
      { symbol: "\\gamma_d", meaning: "Peso unitario seco" },
      { symbol: "\\gamma_{sat}", meaning: "Peso unitario completamente saturado" },
      { symbol: "\\gamma'", meaning: "Peso unitario sumergido o boyante" },
    ],
  },
  {
    id: "formula-cu-cc",
    category: "Capítulo 3: Granulometría",
    name: "Coeficientes de Gradación Granulométrica (Cu y Cc)",
    latex: "C_u = \\frac{D_{60}}{D_{10}} \\quad,\\quad C_c = \\frac{(D_{30})^2}{D_{60} \\cdot D_{10}}",
    explanation:
      "Evalúan el rango y la curvatura granulométrica. Cu > 4 (gravas) y Cu > 6 (arenas) junto con 1 ≤ Cc ≤ 3 definen suelos bien gradados.",
    sectionId: "sec-3-1",
    norm: "INV E-123",
    variables: [
      { symbol: "D_{10}", meaning: "Diámetro efectivo donde pasa el 10% del peso" },
      { symbol: "D_{30}", meaning: "Diámetro correspondiente al 30% que pasa" },
      { symbol: "D_{60}", meaning: "Diámetro correspondiente al 60% que pasa" },
      { symbol: "C_u", meaning: "Coeficiente de uniformidad" },
      { symbol: "C_c", meaning: "Coeficiente de curvatura" },
    ],
  },
  {
    id: "formula-stokes",
    category: "Capítulo 3: Hidrómetro",
    name: "Ley de Stokes y Correcciones del Hidrómetro",
    latex: "v = K \\cdot D^2 \\quad;\\quad C_m \\approx +1 \\quad,\\quad C_d = \\text{NaPO}_3",
    explanation:
      "Rige la sedimentación de partículas esféricas. Aplica corrección por menisco (Cm) y defloculante hexametafosfato sódico (Cd).",
    sectionId: "sec-3-1",
    variables: [
      { symbol: "v", meaning: "Velocidad terminal de sedimentación" },
      { symbol: "K", meaning: "Constante dependiente de viscosidad y densidad del fluido" },
      { symbol: "D", meaning: "Diámetro equivalente de la partícula de suelo" },
      { symbol: "C_m", meaning: "Corrección por menisco (+1 unidad)" },
      { symbol: "C_d", meaning: "Corrección por defloculante neutralizante" },
    ],
  },
  {
    id: "formula-atterberg-contraccion",
    category: "Capítulo 3: Consistencia y Contracción",
    name: "Límites de Atterberg y Parámetros Volumétricos de Contracción",
    latex: "\\begin{aligned} IP &= LL - LP \\\\[4pt] LC &= w - \\left[\\frac{(V - V_0) \\cdot \\rho_w}{M_0}\\right] \\cdot 100 \\\\[4pt] R &= \\frac{M_0}{V_0 \\cdot \\rho_w} \\quad,\\quad CV = (w_1 - LC) \\cdot R \\\\[4pt] CL &= 100 \\cdot \\left[1 - \\left(\\frac{100}{100 + CV}\\right)^{1/3}\\right] \\end{aligned}",
    explanation:
      "Cuantifica la transición plástica y la susceptibilidad volumétrica al secado.",
    sectionId: "sec-3-2",
    norm: "INV E-125, INV E-126",
    variables: [
      { symbol: "IP", meaning: "Índice de Plasticidad" },
      { symbol: "LL", meaning: "Límite Líquido (copa Casagrande 25 golpes)" },
      { symbol: "LP", meaning: "Límite Plástico (cilindro 3 mm)" },
      { symbol: "LC", meaning: "Límite de Contracción" },
      { symbol: "M_0", meaning: "Masa de la pastilla de suelo seco" },
      { symbol: "V", meaning: "Volumen de la pastilla en estado húmedo" },
      { symbol: "V_0", meaning: "Volumen seco (desplazamiento en mercurio)" },
      { symbol: "\\rho_w", meaning: "Densidad del agua = 1.0 g/cm³" },
      { symbol: "R", meaning: "Relación de contracción" },
      { symbol: "CV", meaning: "Cambio volumétrico" },
      { symbol: "CL", meaning: "Contracción lineal (%)" },
    ],
  },
  {
    id: "formula-indice-grupo",
    category: "Capítulo 3: Clasificación AASHTO",
    name: "Ecuación Oficial del Índice de Grupo (IG)",
    latex: "IG = (F - 35) \\cdot [0.2 + 0.005 \\cdot (LL - 40)] + 0.01 \\cdot (F - 15) \\cdot (IP - 10)",
    explanation:
      "Evalúa la capacidad soporte como subrasante vial. Si IG < 0 se reporta IG = 0. En grupos A-2-6 y A-2-7 solo se aplica el segundo término: IG = 0.01(F - 15)(IP - 10).",
    sectionId: "sec-3-3",
    norm: "INV E-180",
    variables: [
      { symbol: "F", meaning: "Porcentaje entero que pasa el Tamiz No. 200 (75 μm)" },
      { symbol: "LL", meaning: "Límite Líquido" },
      { symbol: "IP", meaning: "Índice de Plasticidad" },
    ],
  },
  {
    id: "formula-capilaridad",
    category: "Capítulo 4: Hidráulica y Succión",
    name: "Ecuación Físico-Matemática del Ascenso Capilar (hc)",
    latex: "h_c = \\frac{4 \\cdot T_s \\cdot \\cos \\alpha}{d_c \\cdot \\gamma_w} \\approx \\frac{C}{e \\cdot D_{10}}",
    explanation:
      "Modela la altura que alcanza el agua sobre el nivel freático por tensión superficial. Gravas: <10 cm, Arenas finas: 0.3-1.0 m, Arcillas finas: 3.0-10.0 m.",
    sectionId: "sec-4-2",
    variables: [
      { symbol: "T_s", meaning: "Tensión superficial del agua (≈ 0.073 N/m a 20°C)" },
      { symbol: "\\alpha", meaning: "Ángulo de contacto suelo-agua (≈ 0° para mojado completo)" },
      { symbol: "d_c", meaning: "Diámetro equivalente de los poros" },
      { symbol: "\\gamma_w", meaning: "Peso unitario del agua" },
      { symbol: "C", meaning: "Constante empírica dependiente de forma y empaquetamiento" },
      { symbol: "e", meaning: "Relación de vacíos" },
      { symbol: "D_{10}", meaning: "Diámetro efectivo granulométrico" },
    ],
  },
  {
    id: "formula-papel-filtro",
    category: "Capítulo 4: Succión no Saturada",
    name: "Curvas de Calibración de Succión con Papel de Filtro (Whatman No. 42)",
    latex: "\\begin{cases} \\log h = 5.327 - 0.0779 \\cdot w_f & \\text{para } w_f \\le 45.3\\% \\\\[6pt] \\log h = 2.412 - 0.0135 \\cdot w_f & \\text{para } w_f > 45.3\\% \\end{cases} \\quad\\Longrightarrow\\quad h = 10^{\\log h}",
    explanation:
      "Determina la succión matricial o total en kPa a partir de la humedad del papel de filtro a 20±3°C.",
    sectionId: "sec-4-3",
    norm: "INV E-159 / 2013",
    variables: [
      { symbol: "w_f", meaning: "Contenido de humedad del papel de filtro Whatman No. 42 (%)" },
      { symbol: "h", meaning: "Succión geotécnica en kiloPascales (kPa)" },
    ],
  },
  {
    id: "formula-licuacion",
    category: "Capítulo 4: Dinámica Geotécnica",
    name: "Criterio de Licuación y Anulación de Esfuerzo Efectivo",
    latex: "u \\to \\sigma \\quad\\Longrightarrow\\quad \\sigma' = \\sigma - u = 0 \\quad\\Longrightarrow\\quad \\tau = c' + \\sigma' \\tan\\phi' = 0",
    explanation:
      "En suelos arenosos saturados sometidos a cargas cíclicas (sismos), el aumento de la presión de poros anula el esfuerzo efectivo y la resistencia al corte.",
    sectionId: "sec-4-3",
    variables: [
      { symbol: "u", meaning: "Presión intersticial o de poros de agua" },
      { symbol: "\\sigma", meaning: "Esfuerzo total confinado" },
      { symbol: "\\sigma'", meaning: "Esfuerzo efectivo intergranular (Principio de Terzaghi)" },
      { symbol: "\\tau", meaning: "Resistencia al corte del terreno" },
    ],
  },
];
