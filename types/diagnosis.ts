export type DiagnosisBlock = "clientes" | "ventas" | "oferta_inventario" | "finanzas" | "procesos" | "preparacion_ia";
export type ResultLevel = "caos_operativo" | "base_minima" | "negocio_preparado" | "listo_para_escalar";
export type BusinessSize = "solo" | "2_5" | "6_10" | "11_30" | "mas_30";
export type BusinessType = "marca_personal" | "servicio_profesional" | "ecommerce" | "negocio_fisico" | "educacion_formacion" | "consultoria" | "agencia_estudio_creativo" | "otro";
export type AiGoal = "ahorrar_tiempo" | "automatizar_tareas" | "mejorar_ventas" | "crear_contenido" | "atender_clientes" | "analizar_informacion" | "ordenar_procesos" | "no_lo_tengo_claro";
export type AnswerScore = 0 | 1 | 2 | 3 | 4;
export interface AnswerOption { label: string; score: AnswerScore }
export interface Question { id: string; block: DiagnosisBlock; question: string; options: AnswerOption[] }
export interface UserAnswer { questionId: string; block: DiagnosisBlock; answerLabel: string; score: number }
export interface DiagnosisResult { rawScore: number; finalScore: number; level: ResultLevel; weakestBlock: DiagnosisBlock }
export interface LeadPayload { name: string; email: string; businessType: BusinessType; businessSize: BusinessSize; instagram?: string; whatsapp?: string; aiGoal?: AiGoal }
export interface TrackingPayload { utmSource?: string; utmMedium?: string; utmCampaign?: string; referrerUrl?: string }
