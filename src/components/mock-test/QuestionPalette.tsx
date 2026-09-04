'use client';

import React from 'react';
import { Bookmark, Check } from 'lucide-react';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  flagged: Record<string, boolean>;
  questionIds: string[];
  onSelectQuestion: (index: number) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  totalQuestions,
  currentIndex,
  answers,
  flagged,
  questionIds,
  onSelectQuestion
}) => {
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
          Navegación de Preguntas
        </h4>
        <span className="text-xs text-slate-500 font-medium">
          {answeredCount} / {totalQuestions} respondidas
        </span>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-blue-600 inline-block" />
          <span>Respondida</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-400 inline-block" />
          <span>Marcada</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700 inline-block" />
          <span>Pendiente</span>
        </div>
      </div>

      {/* Number Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const qId = questionIds[idx];
          const isAnswered = qId && answers[qId] !== undefined;
          const isFlagged = qId && flagged[qId];
          const isCurrent = currentIndex === idx;

          let btnClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200';
          if (isAnswered) {
            btnClass = 'bg-blue-600 text-white font-bold';
          }
          if (isFlagged) {
            btnClass = 'bg-amber-400 text-slate-900 font-bold ring-2 ring-amber-500/50';
          }
          if (isCurrent) {
            btnClass += ' ring-2 ring-offset-2 ring-blue-500';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              className={`h-9 rounded-lg text-xs font-semibold flex items-center justify-center relative transition-all ${btnClass}`}
            >
              <span>{idx + 1}</span>
              {isFlagged && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
