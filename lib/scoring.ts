import type { DiagnosisBlock, DiagnosisResult, ResultLevel, UserAnswer } from "@/types/diagnosis";

export function calculateRawScore(answers: UserAnswer[]): number {
  return answers.reduce((total, answer) => total + answer.score, 0);
}

export function calculateFinalScore(answers: UserAnswer[], maxScore: number): number {
  if (maxScore <= 0) return 0;
  return Math.round((calculateRawScore(answers) / maxScore) * 100);
}

export function getResultLevel(score: number): ResultLevel {
  if (score <= 25) return "caos_operativo";
  if (score <= 50) return "base_minima";
  if (score <= 75) return "negocio_preparado";
  return "listo_para_escalar";
}

export function getWeakestBlock(answers: UserAnswer[]): DiagnosisBlock {
  const blocks: Partial<Record<DiagnosisBlock, { score: number; count: number }>> = {};
  answers.forEach((answer) => {
    const current = blocks[answer.block] ?? { score: 0, count: 0 };
    blocks[answer.block] = { score: current.score + answer.score, count: current.count + 1 };
  });
  const averages = Object.entries(blocks).map(([block, data]) => ({ block: block as DiagnosisBlock, average: data.score / data.count }));
  averages.sort((a, b) => a.average - b.average);
  return averages[0]?.block ?? "clientes";
}

export function calculateDiagnosisResult(answers: UserAnswer[], maxScore: number): DiagnosisResult {
  const rawScore = calculateRawScore(answers);
  const finalScore = calculateFinalScore(answers, maxScore);
  return { rawScore, finalScore, level: getResultLevel(finalScore), weakestBlock: getWeakestBlock(answers) };
}
