import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compendio Detallado de Mecánica de Suelos | Portal Técnico y Académico",
  description:
    "Portal educativo interactivo de referencia técnica en Mecánica de Suelos: fundamentos teóricos, mineralogía de arcillas, relaciones fásicas, clasificación USCS y AASHTO, normas INV E y física de la capilaridad y succión.",
  keywords: [
    "Mecánica de Suelos",
    "Geotecnia",
    "Normas INV E",
    "Karl Terzaghi",
    "Relaciones Fásicas",
    "Límites de Atterberg",
    "USCS",
    "AASHTO",
    "Índice de Grupo",
    "SPT N60",
    "Capilaridad",
    "Succión",
    "Licuación",
  ],
  authors: [{ name: "Compendio Técnico de Mecánica de Suelos" }],
};

export const viewport: Viewport = {
  themeColor: "#062653",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#F5F7FC] text-[#142B4D] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
