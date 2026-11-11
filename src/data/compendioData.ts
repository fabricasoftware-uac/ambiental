export interface NormReference {
  code: string;
  name: string;
  description: string;
  year?: string;
  sectionId: string;
}

export interface FormulaItem {
  id: string;
  name: string;
  latex: string;
  description: string;
  variables: { symbol: string; label: string; unit?: string }[];
  sectionId: string;
}

export interface SamplingMethodRow {
  sampleType: string;
  extractionMethod: string;
  norm: string;
  preservation: string;
  designatedTests: string;
}

export interface ClayMineralRow {
  group: string;
  structure: string;
  interlayerBond: string;
  plasticityProperties: string;
  geotechnicalBehavior: string;
}

export interface SoilClassificationRow {
  system: "USCS" | "AASHTO";
  symbol: string;
  description: string;
  criteria: string;
  geotechnicalApplication: string;
}

export interface ChapterSection {
  id: string;
  number: string;
  title: string;
  badge?: string;
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  sections: ChapterSection[];
}

export const CHAPTERS: Chapter[] = [
  {
    id: "capitulo-1",
    number: "CAPÍTULO 1",
    title: "Generalidades, Evolución Histórica y Exploración Geotécnica",
    sections: [
      {
        id: "sec-1-1",
        number: "1.1",
        title: "Definición y Evolución Histórica de la Mecánica de Suelos",
        badge: "Fundamentos & Skempton",
      },
      {
        id: "sec-1-2",
        number: "1.2",
        title: "Exploración de Campo, Métodos de Muestreo y Normativa",
        badge: "INV E-101 / E-104 / E-105 & SPT N60",
      },
    ],
  },
  {
    id: "capitulo-2",
    number: "CAPÍTULO 2",
    title: "Mineralogía de Arcillas y Relaciones Gravimétricas y Volumétricas",
    sections: [
      {
        id: "sec-2-1",
        number: "2.1",
        title: "Fundamentos de Mineralogía y Estructura Cristalina",
        badge: "Tetraedros, Octaedros & Minerales",
      },
      {
        id: "sec-2-2",
        number: "2.2",
        title: "Composición Trifásica y Relaciones Gravimétricas y Volumétricas",
        badge: "11 Ecuaciones Fásicas",
      },
      {
        id: "sec-2-3",
        number: "2.3",
        title: "Comparación de Propiedades Índice entre Suelos y Rocas",
        badge: "Porosidad Accesible vs Inaccesible",
      },
    ],
  },
  {
    id: "capitulo-3",
    number: "CAPÍTULO 3",
    title: "Estructura, Granulometría y Clasificación de Suelos",
    sections: [
      {
        id: "sec-3-1",
        number: "3.1",
        title: "Distribución Granulométrica y Métodos de Laboratorio",
        badge: "Cu, Cc, Stokes & INV E-123 / E-235",
      },
      {
        id: "sec-3-2",
        number: "3.2",
        title: "Límites de Atterberg y Ensayos de Consistencia",
        badge: "INV E-125 / E-126 & Parámetros Volumétricos",
      },
      {
        id: "sec-3-3",
        number: "3.3",
        title: "Sistemas de Clasificación de Suelos (USCS y AASHTO)",
        badge: "USCS, AASHTO & INV E-180 (IG)",
      },
    ],
  },
  {
    id: "capitulo-4",
    number: "CAPÍTULO 4",
    title: "El Agua en los Suelos: Tensión Superficial, Capilaridad y Succión",
    sections: [
      {
        id: "sec-4-1",
        number: "4.1",
        title: "El Agua en el Ciclo Hidrológico y su Importancia en Ingeniería Civil",
        badge: "4 Aspectos Geotécnicos",
      },
      {
        id: "sec-4-2",
        number: "4.2",
        title: "Tensión Superficial y Ascenso Capilar",
        badge: "Ecuación hc & Efectos por Suelo",
      },
      {
        id: "sec-4-3",
        number: "4.3",
        title: "Succión en Suelos no Saturados y Fenómeno de Licuación",
        badge: "INV E-159 Papel Filtro & Licuación",
      },
    ],
  },
  {
    id: "conclusiones",
    number: "SÍNTESIS",
    title: "Conclusiones y Síntesis de Aplicabilidad Práctica",
    sections: [
      {
        id: "sec-conclusiones",
        number: "5.0",
        title: "4 Pilares de la Práctica Geotécnica",
        badge: "Criterios Profesionales",
      },
    ],
  },
];

export const SAMPLING_TABLE: SamplingMethodRow[] = [
  {
    sampleType: "Alterada",
    extractionMethod: "Palas, barrenos, frascos",
    norm: "INV E-101 / E-105",
    preservation: "Se pierde la estructura original del suelo",
    designatedTests: "Granulometría, Límites de Atterberg, Gravedad Específica",
  },
  {
    sampleType: "Inalterada (Bloques)",
    extractionMethod: "Talla manual en pared de calicata",
    norm: "INV E-104",
    preservation: "Conserva estructura, humedad y porosidad",
    designatedTests: "Consolidación, Consolidación triaxial, Corte Directo",
  },
  {
    sampleType: "Inalterada (Tubo)",
    extractionMethod: "Muestreador de tubo Shelby de pared delgada",
    norm: "INV E-105",
    preservation: "Alta calidad en suelos finos blandos a firmes",
    designatedTests: "Permeabilidad, Resistencia no drenada, Triaxial",
  },
];

export const CLAY_MINERALS_TABLE: ClayMineralRow[] = [
  {
    group: "Caolinita",
    structure: "1:1 (Lámina Si + Lámina Al)",
    interlayerBond: "Hidrógeno (Fuerte)",
    plasticityProperties: "Baja a moderada plasticidad",
    geotechnicalBehavior: "No expansiva, alta permeabilidad relativa, estable",
  },
  {
    group: "Montmorillonita",
    structure: "2:1 (Si - Al - Si)",
    interlayerBond: "Van der Waals + Cationes (Débil)",
    plasticityProperties: "Muy alta plasticidad y actividad",
    geotechnicalBehavior: "Altamente expansiva, baja permeabilidad, inestable",
  },
  {
    group: "Illita",
    structure: "2:1 (Si - Al - Si)",
    interlayerBond: "Iones de Potasio (K⁺) fijos",
    plasticityProperties: "Plasticidad intermedia",
    geotechnicalBehavior: "Expansión moderada, producto de micas meteorizadas",
  },
  {
    group: "Vermiculita",
    structure: "2:1 modificada",
    interlayerBond: "Cationes hidratados intercambiables",
    plasticityProperties: "Alta capacidad de intercambio",
    geotechnicalBehavior: "Expansividad intermedia entre Illita y Montmorillonita",
  },
];

export const SOIL_CLASSIFICATION_TABLE: SoilClassificationRow[] = [
  {
    system: "USCS",
    symbol: "GW / GP",
    description: "Grava Bien / Mal Gradada",
    criteria: "Finos < 5%, Cu ≥ 4 y 1 ≤ Cc ≤ 3 (GW)",
    geotechnicalApplication: "Filtros, bases de alta capacidad portante",
  },
  {
    system: "USCS",
    symbol: "SW / SP",
    description: "Arena Bien / Mal Gradada",
    criteria: "Finos < 5%, Cu ≥ 6 y 1 ≤ Cc ≤ 3 (SW)",
    geotechnicalApplication: "Rellenos estructurales, cimentaciones",
  },
  {
    system: "USCS",
    symbol: "CL / CH",
    description: "Arcilla de Baja / Alta Plasticidad",
    criteria: "Finos ≥ 50%, Sobre Línea A (IP > 7), LL < 50 (CL) o LL ≥ 50 (CH)",
    geotechnicalApplication: "Núcleos impermeables (CL), riesgo expansión (CH)",
  },
  {
    system: "USCS",
    symbol: "ML / MH",
    description: "Limo de Baja / Alta Elasticidad",
    criteria: "Finos ≥ 50%, Bajo Línea A, LL < 50 (ML) o LL ≥ 50 (MH)",
    geotechnicalApplication: "Suelos micáceos, alta compresibilidad (MH)",
  },
  {
    system: "AASHTO",
    symbol: "A-1 a A-3",
    description: "Materiales Granulares (Vías)",
    criteria: "Pasa Tamiz #200 ≤ 35%, IP bajo o NP",
    geotechnicalApplication: "Excelentes subbases y subrasantes viales",
  },
  {
    system: "AASHTO",
    symbol: "A-4 a A-7",
    description: "Materiales Limo-Arcillosos",
    criteria: "Pasa Tamiz #200 > 35%, evaluados por Índice de Grupo (IG)",
    geotechnicalApplication: "Subrasantes regulares a pobres",
  },
];

export const INVE_NORMS: NormReference[] = [
  {
    code: "INV E-101",
    name: "Investigación y Muestreo de Suelos",
    description: "Procedimiento estándar para la recolección de muestras alteradas mediante palas y barrenos.",
    sectionId: "sec-1-2",
  },
  {
    code: "INV E-104",
    name: "Toma de Muestras Inalteradas en Bloque",
    description: "Talla manual meticulosa en pared de calicata para conservar estructura, humedad y porosidad original.",
    sectionId: "sec-1-2",
  },
  {
    code: "INV E-105",
    name: "Toma de Muestras con Tubo Shelby de Pared Delgada",
    description: "Extracción inalterada de alta calidad en suelos finos blandos a firmes para ensayos de consolidación y corte.",
    sectionId: "sec-1-2",
  },
  {
    code: "INV E-123",
    name: "Análisis Granulométrico de Suelos por Tamizado",
    description: "Determinación de la distribución cuantitativa de tamaños de grano para fracción retenida en Tamiz #200 (0.075 mm).",
    sectionId: "sec-3-1",
  },
  {
    code: "INV E-125",
    name: "Determinación del Límite Líquido (LL)",
    description: "Determinación del contenido de humedad mediante la copa de Casagrande para 25 golpes de cierre de ranura.",
    sectionId: "sec-3-2",
  },
  {
    code: "INV E-126",
    name: "Determinación del Límite Plástico (LP) e Índice de Plasticidad (IP)",
    description: "Determinación del contenido de humedad cuando cilindros de 3 mm comienzan a resquebrajarse.",
    sectionId: "sec-3-2",
  },
  {
    code: "INV E-159",
    name: "Determinación de la Succión del Suelo Mediante Papel de Filtro",
    description: "Medición de succión matricial y total a 20±3°C con papel Whatman No. 42 y curvas de calibración logarítmicas.",
    year: "2013",
    sectionId: "sec-4-3",
  },
  {
    code: "INV E-180",
    name: "Determinación del Índice de Grupo (IG) AASHTO",
    description: "Cálculo empírico numérico para evaluar el comportamiento del suelo como subrasante vial en función de F, LL e IP.",
    sectionId: "sec-3-3",
  },
  {
    code: "INV E-235",
    name: "Valor de Azul de Metileno en Suelos Finos",
    description: "Cuantificación de la superficie específica y actividad mineral de arcillas mediante absorción de reactivo azul de metileno.",
    year: "2013",
    sectionId: "sec-3-1",
  },
];
