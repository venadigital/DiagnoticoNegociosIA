"use client";

import { useState } from "react";
import type { DiagnosisResult, UserAnswer } from "@/types/diagnosis";

type ContactFormProps = { answers: UserAnswer[]; result: DiagnosisResult };
type ContactFormState = { name: string; email: string; phone: string; business: string; message: string };

export function ContactForm({ answers, result }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormState>({ name: "", email: "", phone: "", business: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  function updateField<K extends keyof ContactFormState>(field: K, value: ContactFormState[K]) { setForm((current) => ({ ...current, [field]: value })); }
  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("loading"); setMessage("");
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contact: form, answers, result }) });
    if (!response.ok) { const data = (await response.json().catch(() => null)) as { error?: string } | null; setStatus("error"); setMessage(data?.error ?? "No pudimos enviar tu mensaje. Inténtalo de nuevo."); return; }
    setStatus("success"); setMessage("Gracias. Tu mensaje fue enviado a Vena Digital."); setForm({ name: "", email: "", phone: "", business: "", message: "" });
  }
  return (
    <section className="mx-auto w-full max-w-5xl rounded-[32px] border border-[#0A2142]/10 bg-white p-6 shadow-[0_24px_80px_rgba(10,33,66,0.10)] sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#FF6B5E]">Acompañamiento opcional</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#0A2142] sm:text-4xl">¿Quieres que te ayude a aterrizar esto a tu negocio?</h2>
          <p className="mt-4 leading-7 text-[#0A2142]/72">Si quieres entender cómo implementar IA de forma eficiente, qué datos ordenar primero o qué procesos conviene automatizar, déjame un mensaje. Te responderá Laura Salazar desde Vena Digital.</p>
        </div>
        <form className="grid gap-4" onSubmit={submitContact}>
          <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold text-[#0A2142]">Nombre<input required value={form.name} onChange={(event) => updateField("name", event.target.value)} className="rounded-2xl border border-[#0A2142]/14 bg-[#FAF7EF] px-4 py-3 font-normal outline-none focus:border-[#FF6B5E] focus:ring-4 focus:ring-[#F5C935]/30" placeholder="Tu nombre" /></label><label className="grid gap-2 text-sm font-semibold text-[#0A2142]">Correo<input required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="rounded-2xl border border-[#0A2142]/14 bg-[#FAF7EF] px-4 py-3 font-normal outline-none focus:border-[#FF6B5E] focus:ring-4 focus:ring-[#F5C935]/30" placeholder="tu@negocio.com" /></label></div>
          <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold text-[#0A2142]">Teléfono opcional<input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className="rounded-2xl border border-[#0A2142]/14 bg-[#FAF7EF] px-4 py-3 font-normal outline-none focus:border-[#FF6B5E] focus:ring-4 focus:ring-[#F5C935]/30" placeholder="+57 300 000 0000" /></label><label className="grid gap-2 text-sm font-semibold text-[#0A2142]">Negocio opcional<input value={form.business} onChange={(event) => updateField("business", event.target.value)} className="rounded-2xl border border-[#0A2142]/14 bg-[#FAF7EF] px-4 py-3 font-normal outline-none focus:border-[#FF6B5E] focus:ring-4 focus:ring-[#F5C935]/30" placeholder="Nombre o tipo de negocio" /></label></div>
          <label className="grid gap-2 text-sm font-semibold text-[#0A2142]">Mensaje<textarea required value={form.message} onChange={(event) => updateField("message", event.target.value)} className="min-h-36 rounded-2xl border border-[#0A2142]/14 bg-[#FAF7EF] px-4 py-3 font-normal outline-none focus:border-[#FF6B5E] focus:ring-4 focus:ring-[#F5C935]/30" placeholder="Cuéntame qué quieres ordenar, automatizar o entender mejor." /></label>
          <button type="submit" disabled={status === "loading"} className="rounded-full bg-[#FF6B5E] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(255,107,94,0.35)] transition hover:-translate-y-0.5 hover:bg-[#e85d51] disabled:cursor-not-allowed disabled:opacity-60">{status === "loading" ? "Enviando..." : "Enviar mensaje"}</button>
          {message ? <p className={`rounded-2xl px-4 py-3 text-sm ${status === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
