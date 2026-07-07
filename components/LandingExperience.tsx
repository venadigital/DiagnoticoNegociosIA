"use client";

import { useState } from "react";
import { questions } from "@/data/questions";
import { calculateDiagnosisResult } from "@/lib/scoring";
import type { DiagnosisResult, UserAnswer } from "@/types/diagnosis";
import { ContactForm } from "./ContactForm";
import { DiagnosisForm } from "./DiagnosisForm";
import { ResultCard } from "./ResultCard";

const maxScore = questions.length * 4;
const evaluationAreas = ["Clientes", "Ventas", "Oferta e inventario", "Finanzas", "Procesos", "Preparación para IA"];
const promiseCards = [
  { eyebrow: "01", title: "Mide el orden real", body: "No evalúa qué tantas herramientas usas. Evalúa si tu información puede sostener decisiones, automatizaciones y seguimiento." },
  { eyebrow: "02", title: "Encuentra el punto débil", body: "El resultado detecta el área que más puede frenar tu implementación: clientes, ventas, oferta, finanzas, procesos o IA." },
  { eyebrow: "03", title: "Recibe una ruta simple", body: "Terminas con recomendaciones concretas para ordenar primero y automatizar después, sin tecnicismos ni ruido." },
];

export function LandingExperience() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  function startDiagnosis() { setStarted(true); window.requestAnimationFrame(() => document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" })); }
  function completeDiagnosis(nextAnswers: UserAnswer[]) { setAnswers(nextAnswers); setResult(calculateDiagnosisResult(nextAnswers, maxScore)); window.requestAnimationFrame(() => document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth", block: "start" })); }
  return (
    <main className="overflow-hidden">
      <section className="relative px-5 pb-12 pt-5 sm:px-8 lg:px-10">
        <div className="absolute inset-x-0 top-0 -z-10 h-[44rem] bg-[linear-gradient(110deg,#FFFDF8_0%,#FAF7EF_54%,#F8E8BD_100%)]" />
        <div className="absolute left-1/2 top-10 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F5C935]/25 blur-3xl" />
        <header className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-[#0A2142]/10 bg-white/78 px-4 py-3 shadow-[0_14px_40px_rgba(10,33,66,0.08)] backdrop-blur sm:px-5">
          <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A2142] text-sm font-semibold text-[#F5C935]">V</span><span className="text-sm font-semibold text-[#0A2142]">Vena Digital</span></div>
          <button type="button" onClick={startDiagnosis} className="hidden rounded-full bg-[#0A2142] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#14345f] sm:inline-flex">Hacer diagnóstico</button>
        </header>
        <div className="mx-auto grid min-h-[76svh] max-w-6xl items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
          <div>
            <p className="inline-flex rounded-full border border-[#FF6B5E]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#FF6B5E] shadow-sm">Diagnóstico gratuito · Orden antes de IA</p>
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.98] text-[#0A2142] sm:text-6xl lg:text-7xl">¿Tu negocio está listo para usar inteligencia artificial?</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#0A2142]/72 sm:text-xl">Antes de conectar un chatbot, automatizar procesos o pagar otra herramienta de IA, descubre si tu negocio tiene la información mínima organizada para que la inteligencia artificial realmente funcione.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3"><button type="button" onClick={startDiagnosis} className="rounded-full bg-[#FF6B5E] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_38px_rgba(255,107,94,0.32)] transition hover:-translate-y-0.5 hover:bg-[#e85d51]">Hacer diagnóstico gratis</button><span className="rounded-full border border-[#0A2142]/10 bg-white px-4 py-3 text-sm font-semibold text-[#0A2142] shadow-sm">Menos de 3 minutos</span></div>
          </div>
          <aside className="rounded-[32px] border border-[#0A2142]/10 bg-white/82 p-5 shadow-[0_28px_80px_rgba(10,33,66,0.12)] backdrop-blur sm:p-6"><div className="rounded-[24px] bg-[#FAF7EF] p-5 sm:p-6"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0A2142]/55">Qué recibes</p><div className="mt-6 grid gap-4">{["Puntaje de preparación", "Área más débil", "Recomendación práctica"].map((item) => <div key={item} className="flex items-start gap-4"><span className="mt-1 h-3 w-3 rounded-full bg-[#FF6B5E]" /><div><h2 className="text-xl font-semibold text-[#0A2142]">{item}</h2><p className="mt-1 leading-6 text-[#0A2142]/68">Una lectura clara para ordenar primero y automatizar después.</p></div></div>)}</div></div></aside>
        </div>
      </section>
      <section className="px-5 pb-16 sm:px-8 lg:px-10"><div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[32px] bg-[#0A2142] p-6 text-white shadow-[0_26px_70px_rgba(10,33,66,0.16)] sm:p-8"><div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#F5C935]">Sistema de diagnóstico</p><h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">Evalúa seis áreas clave antes de implementar IA.</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{evaluationAreas.map((area) => <div key={area} className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold">{area}</div>)}</div></div></div>
        <div className="mb-8 grid gap-4 lg:grid-cols-3">{promiseCards.map((card) => <article key={card.title} className="rounded-[28px] border border-[#0A2142]/10 bg-white p-6 shadow-[0_18px_48px_rgba(10,33,66,0.07)] sm:p-7"><p className="text-sm font-semibold text-[#FF6B5E]">{card.eyebrow}</p><h2 className="mt-4 text-2xl font-semibold leading-tight text-[#0A2142]">{card.title}</h2><p className="mt-4 leading-7 text-[#0A2142]/70">{card.body}</p></article>)}</div>
        {!started ? <div className="rounded-[28px] border border-[#0A2142]/10 bg-white p-6 text-center shadow-sm"><p className="text-lg font-semibold text-[#0A2142]">Empieza cuando quieras. Son 12 preguntas cerradas.</p><p className="mt-2 text-[#0A2142]/65">El resultado se calcula con reglas, no con IA generativa.</p></div> : null}
        {started && !result ? <DiagnosisForm onComplete={completeDiagnosis} /> : null}
        {result ? <div id="resultado" className="grid gap-8"><ResultCard result={result} /><ContactForm answers={answers} result={result} /></div> : null}
      </div></section>
    </main>
  );
}
