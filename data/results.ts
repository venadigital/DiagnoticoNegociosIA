import type { DiagnosisBlock, ResultLevel } from "@/types/diagnosis";

export const blockLabels: Record<DiagnosisBlock, string> = {
  clientes: "Clientes",
  ventas: "Ventas",
  oferta_inventario: "Productos, servicios o inventario",
  finanzas: "Finanzas",
  procesos: "Procesos",
  preparacion_ia: "Preparación para IA",
};

export const resultLevels: Record<ResultLevel, { min: number; max: number; title: string; diagnosis: string; risk: string; recommendations: string[]; cta: string; ctaText: string }> = {
  caos_operativo: {
    min: 0,
    max: 25,
    title: "Tu negocio todavía no está listo para implementar IA estratégicamente.",
    diagnosis: "Tu información está demasiado dispersa, incompleta o desactualizada. Puedes usar IA para tareas puntuales, pero antes de automatizar procesos o tomar decisiones con IA necesitas ordenar la información básica.",
    risk: "Intentar automatizar procesos desordenados y terminar con más confusión, más errores y más dependencia de herramientas que no entienden realmente tu operación.",
    recommendations: ["Crea una base simple de clientes.", "Registra tus ventas semanalmente.", "Organiza tus productos o servicios en una sola tabla.", "Separa ingresos, costos y gastos.", "Documenta las tareas que repites todos los días.", "No empieces por automatizar. Empieza por ordenar."],
    cta: "Descargar plantilla Orden antes de IA",
    ctaText: "Empieza con una plantilla simple para organizar clientes, ventas, oferta, finanzas y tareas repetitivas.",
  },
  base_minima: {
    min: 26,
    max: 50,
    title: "Tu negocio tiene información útil, pero todavía no está lista para trabajar bien con IA.",
    diagnosis: "Ya tienes algunos datos importantes, pero probablemente están repartidos en varias herramientas, archivos o conversaciones. Esto te permite operar, pero dificulta usar IA de forma estratégica.",
    risk: "Conectar IA a datos incompletos y obtener respuestas poco confiables. La herramienta puede sonar inteligente, pero si la información de base está desordenada, las recomendaciones también serán débiles.",
    recommendations: ["Elige un solo lugar para centralizar la información.", "Define qué datos son obligatorios para cada cliente, venta o producto.", "Actualiza la información al menos una vez por semana.", "Identifica los procesos más repetitivos.", "Empieza con automatizaciones simples, no con sistemas complejos.", "Usa IA para organizar, resumir y limpiar información antes de automatizar."],
    cta: "Ver guía para construir mi primera base de datos",
    ctaText: "Aprende cómo construir una base simple para que tu negocio empiece a tener contexto real para usar IA.",
  },
  negocio_preparado: {
    min: 51,
    max: 75,
    title: "Tu negocio ya tiene una buena base para empezar a implementar IA.",
    diagnosis: "Tu negocio tiene información organizada en varias áreas importantes. Todavía puede haber oportunidades de mejora, pero ya tienes una base suficiente para empezar a usar IA de manera más útil.",
    risk: "Implementar herramientas sin una estrategia clara. Tener datos no significa que cualquier automatización tenga sentido. La clave es conectar la IA con decisiones concretas del negocio.",
    recommendations: ["Define tres casos de uso concretos para IA.", "Prioriza procesos repetitivos de alto impacto.", "Conecta IA con datos limpios y actualizados.", "Crea indicadores simples para medir resultados.", "Documenta los flujos antes de automatizarlos.", "Evalúa herramientas según necesidad, no según moda."],
    cta: "Ver casos de uso de IA para mi negocio",
    ctaText: "Descubre qué procesos podrías empezar a mejorar con IA según el estado actual de tu negocio.",
  },
  listo_para_escalar: {
    min: 76,
    max: 100,
    title: "Tu negocio está listo para implementar IA de manera estratégica.",
    diagnosis: "Tienes una base sólida de información. Tus datos están organizados, actualizados y conectados con decisiones relevantes. Esto te permite pasar de usar IA como herramienta aislada a usarla como parte real de la operación del negocio.",
    risk: "Implementar demasiadas cosas al mismo tiempo sin priorizar impacto. El riesgo ya no es el desorden, sino la falta de foco.",
    recommendations: ["Diseña un mapa de procesos automatizables.", "Prioriza automatizaciones por impacto y facilidad.", "Crea asistentes internos alimentados con información del negocio.", "Conecta bases de datos, CRM y herramientas operativas.", "Mide ahorro de tiempo, reducción de errores y mejora en decisiones.", "Considera una asesoría para estructurar la implementación."],
    cta: "Agendar asesoría para implementar IA",
    ctaText: "Diseña una hoja de ruta para implementar IA en tu negocio sin improvisar herramientas ni automatizar procesos sin sentido.",
  },
};

export const blockRecommendations: Record<DiagnosisBlock, { title: string; message: string; fields: string[] }> = {
  clientes: { title: "Tu primera prioridad debería ser organizar la información de tus clientes.", message: "Sin una base clara de clientes, la IA no puede ayudarte bien con seguimiento, personalización, ventas o fidelización.", fields: ["Nombre", "Contacto", "Canal de origen", "Fecha de primer contacto", "Producto o servicio de interés", "Estado del cliente", "Última interacción", "Próximo paso", "Observaciones"] },
  ventas: { title: "Tu negocio necesita mejorar el registro de ventas.", message: "Sin datos de ventas, la IA no puede ayudarte a entender qué funciona, qué no y dónde estás perdiendo oportunidades.", fields: ["Fecha", "Cliente", "Producto o servicio", "Valor", "Canal de venta", "Método de pago", "Estado de pago", "Observaciones"] },
  oferta_inventario: { title: "Necesitas ordenar mejor lo que vendes.", message: "La IA no puede ayudarte a recomendar, analizar o automatizar si no entiende bien tu oferta.", fields: ["Nombre del producto o servicio", "Categoría", "Precio", "Costo", "Margen estimado", "Disponibilidad", "Descripción", "Preguntas frecuentes"] },
  finanzas: { title: "Tu prioridad debería ser ordenar ingresos, costos y gastos.", message: "Sin claridad financiera, la IA puede ayudarte a redactar textos, pero no a tomar mejores decisiones de negocio.", fields: ["Ingresos", "Costos directos", "Gastos fijos", "Gastos variables", "Utilidad aproximada", "Flujo de caja", "Fecha de actualización"] },
  procesos: { title: "Tu negocio depende demasiado de tareas manuales o conocimiento en la cabeza de una persona.", message: "Antes de automatizar, necesitas documentar cómo funcionan las cosas. La IA no puede mejorar un proceso que nadie ha definido.", fields: ["Qué se hace", "Quién lo hace", "Cuándo se hace", "Qué herramienta se usa", "Qué información entra", "Qué resultado debe salir", "Qué errores se repiten"] },
  preparacion_ia: { title: "Tienes que definir mejor para qué quieres usar IA.", message: "La herramienta no es la estrategia. Antes de pagar otra aplicación, necesitas claridad sobre los casos de uso reales.", fields: ["Un caso de uso para ahorrar tiempo", "Un caso de uso para vender mejor", "Un caso de uso para tomar mejores decisiones"] },
};
