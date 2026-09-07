'use client';

import React, { useState } from 'react';
import { Question } from '@/lib/types';
import { CheckCircle2, XCircle, ArrowRight, BookmarkPlus, Sparkles } from 'lucide-react';
import { useTOEICStore } from '@/lib/store';

interface Part5ViewProps {
  question: Question;
  onNext: () => void;
  isLast: boolean;
}

export const Part5View: React.FC<Part5ViewProps> = ({
  question,
  onNext,
  isLast
}) => {
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { recordAnswer, addToReviewBank } = useTOEICStore();

  const handleSelect = (key: 'A' | 'B' | 'C' | 'D') => {
    if (hasAnswered) return;
    setSelectedKey(key);
    setHasAnswered(true);
    const isCorrect = key === question.correctAnswer;
    recordAnswer(question, key, isCorrect);
  };

  const handleBookmark = () => {
    addToReviewBank(question);
    alert('Pregunta añadida al Centro de Repaso.');
  };

  const isCorrect = selectedKey === question.correctAnswer;

  // Render sentence with highlighted blank
  const parts = question.questionText.split('_______');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-4 border-b border-slate-100 dark:border-slate-800">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Parte 5 • Pregunta #{question.questionNumber}
          </span>
          <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-[11px] font-medium">
            {question.subtheme}
          </span>
        </div>

        {/* Sentence */}
        <div className="text-lg sm:text-xl text-slate-900 dark:text-white font-medium leading-relaxed">
          {parts[0]}
          <span className="inline-block px-3 py-1 mx-1 border-b-2 border-dashed border-blue-500 font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30 rounded">
            {hasAnswered ? question.options.find(o => o.key === question.correctAnswer)?.text : '_______'}
          </span>
          {parts[1]}
        </div>

        {/* 4 Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {question.options.map((opt) => {
            const isThisSelected = selectedKey === opt.key;
            const isThisCorrect = opt.key === question.correctAnswer;

            let style = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 text-slate-800 dark:text-slate-200';
            if (hasAnswered) {
              if (isThisCorrect) {
                style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20 font-bold';
              } else if (isThisSelected && !isThisCorrect) {
                style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20';
              } else {
                style = 'opacity-50 border-slate-200 dark:border-slate-800';
              }
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleSelect(opt.key)}
                disabled={hasAnswered}
                className={`p-4 rounded-xl border text-left flex items-center justify-between text-base transition-all active:scale-98 ${style}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold flex items-center justify-center text-xs text-slate-700 dark:text-slate-300">
                    {opt.key}
                  </span>
                  <span>{opt.text}</span>
                </div>

                {hasAnswered && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
                {hasAnswered && isThisSelected && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Immediate Feedback Card */}
      {hasAnswered && (
        <div className={`p-5 rounded-2xl border transition-all animate-in fade-in-50 duration-300 ${
          isCorrect
            ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-base">
                  {isCorrect ? '¡Correcto!' : `Incorrecto (Clave: Opción ${question.correctAnswer})`}
                </h4>
                <p className="text-sm mt-1 leading-relaxed opacity-95 text-slate-700 dark:text-slate-300">
                  {question.explanation}
                </p>
                <div className="mt-2 text-xs font-semibold text-slate-500">
                  Categoría: {question.subtheme} • Dificultad: {question.difficulty}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleBookmark}
                className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600"
                title="Guardar en Centro de Repaso"
              >
                <BookmarkPlus className="w-5 h-5" />
              </button>

              <button
                onClick={onNext}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95"
              >
                <span>{isLast ? 'Finalizar Práctica' : 'Siguiente'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
