type ProgressBarProps = { current: number; total: number };

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div className="space-y-2" aria-label="Progreso del diagnóstico">
      <div className="flex items-center justify-between text-sm text-[#0A2142]/70">
        <span>Pregunta {current} de {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[#0A2142]/10">
        <div className="h-full rounded-full bg-[#FF6B5E] transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
