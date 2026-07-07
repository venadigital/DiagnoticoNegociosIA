import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase";
import type { DiagnosisResult, LeadPayload, TrackingPayload, UserAnswer } from "@/types/diagnosis";

type LeadRequestBody = { lead?: Partial<LeadPayload>; answers?: UserAnswer[]; result?: DiagnosisResult; ctaShown?: string; tracking?: TrackingPayload };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LeadRequestBody | null;
  if (!body?.lead?.name || !body.lead.email || !body.lead.businessType || !body.lead.businessSize) return NextResponse.json({ error: "Faltan datos obligatorios del lead." }, { status: 400 });
  if (!Array.isArray(body.answers) || !body.result || typeof body.result.rawScore !== "number" || typeof body.result.finalScore !== "number" || !body.result.level || !body.result.weakestBlock) return NextResponse.json({ error: "Faltan datos del diagnóstico." }, { status: 400 });
  const supabase = createSupabaseClient();
  if (!supabase) return NextResponse.json({ error: "Supabase no está configurado. Revisa NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY." }, { status: 503 });
  const { error } = await supabase.from("diagnosis_leads").insert({ name: body.lead.name, email: body.lead.email, instagram: body.lead.instagram || null, whatsapp: body.lead.whatsapp || null, business_type: body.lead.businessType, business_size: body.lead.businessSize, ai_goal: body.lead.aiGoal || null, answers: body.answers, raw_score: body.result.rawScore, final_score: body.result.finalScore, result_level: body.result.level, weakest_block: body.result.weakestBlock, cta_shown: body.ctaShown || null, utm_source: body.tracking?.utmSource || null, utm_medium: body.tracking?.utmMedium || null, utm_campaign: body.tracking?.utmCampaign || null, referrer_url: body.tracking?.referrerUrl || null });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
