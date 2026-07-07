# Diagnóstico Orden antes de IA

Landing interactiva de Vena Digital para evaluar si un negocio está listo para implementar inteligencia artificial o si primero necesita ordenar datos, procesos e información operativa.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Resend
- Vercel

La primera versión funciona con reglas, preguntas predefinidas, puntajes y recomendaciones configurables. No usa OpenAI API.

El resultado se muestra inmediatamente al terminar el diagnóstico. El formulario de contacto es opcional y aparece después del resultado.

## Correr localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`. Si el puerto 3000 está ocupado, Next.js usará otro puerto disponible.

## Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_publishable_key
RESEND_API_KEY=tu_api_key_de_resend
CONTACT_TO_EMAIL=correo_destino
RESEND_FROM_EMAIL=Vena Digital <onboarding@resend.dev>
```

Para producción, configura estas mismas variables en Vercel. No subas `.env.local` al repositorio.

## Configurar Supabase

1. Crea o abre el proyecto en Supabase.
2. Abre SQL Editor.
3. Ejecuta `supabase/migrations/001_create_diagnosis_leads.sql`.

El SQL crea `public.diagnosis_leads`, activa RLS y permite inserts anónimos sin exponer lectura pública.

## Configurar Resend

- `RESEND_API_KEY` se usa solo en el servidor.
- `CONTACT_TO_EMAIL` es el correo que recibirá las solicitudes de acompañamiento.
- `RESEND_FROM_EMAIL` debe usar un dominio verificado en Resend para producción. Durante pruebas puedes usar `Vena Digital <onboarding@resend.dev>` si tu cuenta lo permite.

## Desplegar en Vercel

1. Importa este repositorio en Vercel.
2. Confirma framework `Next.js`.
3. Agrega las variables de entorno anteriores.
4. Deploy.
5. Prueba: hero, diagnóstico, resultado inmediato y formulario opcional de acompañamiento.

## Calidad

```bash
npm run lint
npm run build
```
