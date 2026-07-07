"use client";

import { useMemo, useState } from "react";
import { questions } from "@/data/questions";
import type { UserAnswer } from "@/types/diagnosis";
import { ProgressBar } from "./ProgressBar";

type DiagnosisFormProps = { onComplete: (answers: UserAnswer[]) => void };

export function DiagnosisForm({ onComplete }: DiagnosisFormProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const currentQuestion = questions[step];
  const selectedAnswer = answers[currentQuestion.id];
  const isLastQuestion = step === questions.length - 1;
  const orderedAnswers = useMemo(() => questions.map((question) => answers[question.id]).filter((answer): answer is UserAnswer => Boolean(answer)), [answers]);

  function selectOption(answerLabel: string, score: number) {
    setAnswers((current) => ({ ...current, [currentQuestion.id]: { questionId: currentQuestion.id, block: currentQuestion.block, answerLabel, score } }));
  }

  function goNext() {
    if (!selectedAnswer) return;
    if (isLastQuestion) return onComplete(orderedAnswers);
    setStep((current) => current + 1);
  }

  return (
    <section id="diagnostico" className="mx-auto w-full max-w-3xl rounded-[28px] border border-[#0A2142]/10 bg-white p-5 shadow-[0_24px_80px_rgba(10,33,66,0.10)] sm:p-8">
      <ProgressBar current={step + 1} total={questions.length} />
      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#FF6B5E]">Pregunta {step + 1}</p>
        <h2 className="text-2xl font-semibold leading-tight text-[#0A2142] sm:text-3xl">{currentQuestion.question}</h2>
      </div>
      <div className="mt-8 grid gap-3">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedAnswer?.answerLabel === option.label;
          return (
            <button key={option.label} type="button" onClick={() => selectOption(option.label, option.score)} className={`rounded-2xl border p-4 text-left text-base font-medium transition focus:outline-none focus:ring-4 focus:ring-[#F5C935]/40 ${isSelected ? "border-[#FF6B5E] bg-[#FF6B5E]/10 text-[#0A2142]" : "border-[#0A2142]/12 bg-[#FAF7EF] text-[#0A2142]/78 hover:border-[#FF6B5E]/60"}`}>
              <span className="block text-sm font-semibold text-[#0A2142]/45">{option.score} puntos</span>
              <span className="mt-1 block">{option.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="rounded-full px-5 py-3 text-sm font-semibold text-[#0A2142] transition hover:bg-[#0A2142]/5 disabled:cursor-not-allowed disabled:opacity-40">Anterior</button>
        <button type="button" onClick={goNext} disabled={!selectedAnswer} className="rounded-full bg-[#FF6B5E] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(255,107,94,0.35)] transition hover:-translate-y-0.5 hover:bg-[#e85d51] disabled:cursor-not-allowed disabled:opacity-50">{isLastQuestion ? "Ver resultado" : "Siguiente"}</button>
      </div>
    </section>
  );
}
