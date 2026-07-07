import { NextResponse } from "next/server";
import { Resend } from "resend";
import { blockLabels, resultLevels } from "@/data/results";
import type { DiagnosisResult, UserAnswer } from "@/types/diagnosis";

type ContactRequestBody = { contact?: { name?: string; email?: string; phone?: string; business?: string; message?: string }; answers?: UserAnswer[]; result?: DiagnosisResult };
function escapeHtml(value: string) { return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
function renderEmail(body: ContactRequestBody) {
  const contact = body.contact; const result = body.result; const level = result ? resultLevels[result.level] : null; const answers = body.answers ?? [];
  const answerItems = answers.map((answer) => `<li><strong>${escapeHtml(answer.questionId)}</strong>: ${escapeHtml(answer.answerLabel)} (${answer.score} puntos)</li>`).join("");
  return `<div style="font-family: Arial, sans-serif; color: #0A2142; line-height: 1.6;"><h1>Nuevo mensaje desde Diagnóstico Orden antes de IA</h1><h2>Contacto</h2><p><strong>Nombre:</strong> ${escapeHtml(contact?.name ?? "")}</p><p><strong>Correo:</strong> ${escapeHtml(contact?.email ?? "")}</p><p><strong>Teléfono:</strong> ${escapeHtml(contact?.phone ?? "")}</p><p><strong>Negocio:</strong> ${escapeHtml(contact?.business ?? "")}</p><p><strong>Mensaje:</strong><br>${escapeHtml(contact?.message ?? "").replaceAll("\n", "<br>")}</p>${result && level ? `<h2>Resumen del diagnóstico</h2><p><strong>Puntaje final:</strong> ${result.finalScore}/100</p><p><strong>Puntaje bruto:</strong> ${result.rawScore}/48</p><p><strong>Nivel:</strong> ${escapeHtml(level.title)}</p><p><strong>Área más débil:</strong> ${escapeHtml(blockLabels[result.weakestBlock])}</p>` : ""}<h2>Respuestas</h2><ul>${answerItems}</ul></div>`;
}
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactRequestBody | null;
  if (!body?.contact?.name || !body.contact.email || !body.contact.message) return NextResponse.json({ error: "Faltan nombre, correo o mensaje." }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY; const toEmail = process.env.CONTACT_TO_EMAIL; const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Vena Digital <onboarding@resend.dev>";
  if (!apiKey || !toEmail) return NextResponse.json({ error: "Resend no está configurado. Revisa RESEND_API_KEY y CONTACT_TO_EMAIL." }, { status: 503 });
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ from: fromEmail, to: [toEmail], replyTo: body.contact.email, subject: `Nuevo mensaje de ${body.contact.name} · Diagnóstico Orden antes de IA`, html: renderEmail(body) });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
