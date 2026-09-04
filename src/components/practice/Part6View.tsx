'use client';

import React, { useState } from 'react';
import { Passage, Question } from '@/lib/types';
import { CheckCircle2, XCircle, ArrowRight, BookmarkPlus, FileText } from 'lucide-react';
import { useTOEICStore } from '@/lib/store';

interface Part6ViewProps {
  passage: Passage;
  onNext: () => void;
  isLast: boolean;
}

export const Part6View: React.FC<Part6ViewProps> = ({
  passage,
  onNext,
  isLast
}) => {
  const questions = passage.questions;
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [activeBlankIndex, setActiveBlankIndex] = useState<number>(0);
  const { recordAnswer, addToReviewBank } = useTOEICStore();

  const handleSelect = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (hasSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionKey }));
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    questions.forEach(q => {
      const selected = selectedAnswers[q.id];
      if (selected) {
        const isCorrect = selected === q.correctAnswer;
        recordAnswer(q, selected, isCorrect);
      }
    });
  };

  const handleBookmark = (q: Question) => {
    addToReviewBank(q, passage);
    alert('Pregunta añadida al Banco de Errores.');
  };

  const allAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);

  // Render passage text with interactive blanks [1], [2], [3], [4]
  const renderInteractiveText = (text?: string) => {
    if (!text) return null;
    const parts = text.split(/(\[\d\])/g);

    return parts.map((part, index) => {
      const match = part.match(/\[(\d)\]/);
      if (match) {
        const blankNum = parseInt(match[1], 10);
        const qIndex = blankNum - 1;
        const q = questions[qIndex];
        const selected = q ? selectedAnswers[q.id] : null;
        const isCorrect = q && selected === q.correctAnswer;

        let badgeStyle = 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700';
        if (hasSubmitted && q) {
          badgeStyle = isCorrect
            ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border-emerald-400'
            : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border-rose-400';
        } else if (activeBlankIndex === qIndex) {
          badgeStyle = 'bg-blue-600 text-white border-blue-700 shadow-sm';
        }

        return (
          <button
            key={index}
            type="button"
            onClick={() => setActiveBlankIndex(qIndex)}
            className={`inline-flex items-center gap-1 mx-1 px-2.5 py-0.5 rounded-lg border text-xs font-bold transition-all ${badgeStyle}`}
          >
            <span>[{blankNum}]</span>
            {selected ? (
              <span>({selected})</span>
            ) : (
              <span className="font-normal underline">espacio</span>
            )}
          </button>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Document Passage */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-slate-800">
            <FileText className="w-4 h-4" />
            <span>Parte 6 • Texto Empresarial Completado</span>
          </div>

          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            {passage.title}
          </h3>

          <div className="text-sm text-slate-700 dark:text-slate-300 leading-loose whitespace-pre-line font-serif">
            {renderInteractiveText(passage.textContent)}
          </div>
        </div>

        {/* Right Side: Questions for Blanks [1] to [4] */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Opciones por Espacio en Blanco (1 a 4):
          </span>

          {questions.map((q, idx) => {
            const selected = selectedAnswers[q.id];
            const isCorrect = selected === q.correctAnswer;
            const isActive = activeBlankIndex === idx;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isActive
                    ? 'border-blue-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 opacity-90'
                }`}
                onClick={() => setActiveBlankIndex(idx)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-blue-600 dark:text-blue-400">
                    Espacio [{idx + 1}] • Pregunta #{q.questionNumber}
                  </span>
                  {hasSubmitted && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmark(q);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-blue-600"
                    >
                      <BookmarkPlus className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* 4 Choices */}
                <div className="space-y-1.5">
                  {q.options.map((opt) => {
                    const isThisSelected = selected === opt.key;
                    const isThisCorrect = opt.key === q.correctAnswer;

                    let optStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 text-slate-700 dark:text-slate-300';
                    if (hasSubmitted) {
                      if (isThisCorrect) {
                        optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                      } else if (isThisSelected && !isThisCorrect) {
                        optStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                      } else {
                        optStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
                      }
                    } else if (isThisSelected) {
                      optStyle = 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-medium';
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(q.id, opt.key);
                        }}
                        disabled={hasSubmitted}
                        className={`w-full p-2 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${optStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-800 font-bold flex items-center justify-center text-[11px] text-slate-600 dark:text-slate-400">
                            {opt.key}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {hasSubmitted && isThisCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {hasSubmitted && isThisSelected && !isThisCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {hasSubmitted && (
                  <div className="mt-2.5 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                    <strong className="block text-slate-900 dark:text-white">Explicación:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end gap-3 pt-2">
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all ${
              allAnswered
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            {allAnswered ? 'Revisar los 4 Espacios' : 'Completa los 4 espacios para revisar'}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 active:scale-95"
          >
            <span>{isLast ? 'Finalizar Práctica' : 'Siguiente Texto'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
