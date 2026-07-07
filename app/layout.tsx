import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diagnóstico Orden antes de IA | Vena Digital",
  description:
    "Diagnóstico interactivo para saber si un negocio está listo para implementar inteligencia artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
