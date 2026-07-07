import { blockLabels, blockRecommendations, resultLevels } from "@/data/results";
import type { DiagnosisResult } from "@/types/diagnosis";

type ResultCardProps = { result: DiagnosisResult };

export function ResultCard({ result }: ResultCardProps) {
  const level = resultLevels[result.level];
  const blockRecommendation = blockRecommendations[result.weakestBlock];
  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[28px] bg-[#0A2142] p-6 text-white shadow-[0_24px_80px_rgba(10,33,66,0.18)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#F5C935]">Tu resultado</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{level.title}</h2>
          <div className="mt-8 flex items-end gap-3"><span className="text-6xl font-semibold">{result.finalScore}</span><span className="pb-2 text-lg text-white/70">/ 100</span></div>
          <p className="mt-2 text-sm text-white/60">Puntaje bruto: {result.rawScore} de 48</p>
        </article>
        <article className="rounded-[28px] border border-[#0A2142]/10 bg-white p-6 shadow-[0_24px_80px_rgba(10,33,66,0.10)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#FF6B5E]">Diagnóstico</p>
          <p className="mt-4 leading-7 text-[#0A2142]/78">{level.diagnosis}</p>
          <div className="mt-6 rounded-2xl bg-[#FAF7EF] p-5"><h3 className="text-lg font-semibold text-[#0A2142]">Riesgo principal</h3><p className="mt-3 leading-7 text-[#0A2142]/78">{level.risk}</p></div>
        </article>
      </div>
      <article className="mt-5 rounded-[28px] border border-[#0A2142]/10 bg-white p-6 shadow-[0_24px_80px_rgba(10,33,66,0.08)] sm:p-8">
        <h3 className="text-2xl font-semibold text-[#0A2142]">Recomendaciones prácticas</h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">{level.recommendations.map((recommendation) => <li key={recommendation} className="rounded-2xl border border-[#0A2142]/10 bg-[#FAF7EF] px-4 py-3 text-[#0A2142]/78">{recommendation}</li>)}</ul>
      </article>
      <article className="mt-5 rounded-[28px] border border-[#F5C935]/55 bg-[#F5C935]/18 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0A2142]/65">Área más débil: {blockLabels[result.weakestBlock]}</p>
        <h3 className="mt-3 text-2xl font-semibold text-[#0A2142]">{blockRecommendation.title}</h3>
        <p className="mt-3 max-w-3xl leading-7 text-[#0A2142]/78">{blockRecommendation.message}</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">{blockRecommendation.fields.map((field) => <li key={field} className="rounded-full bg-white px-4 py-2 text-sm">{field}</li>)}</ul>
      </article>
    </section>
  );
}
