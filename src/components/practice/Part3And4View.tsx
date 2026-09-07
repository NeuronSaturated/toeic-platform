'use client';

import React, { useState } from 'react';
import { Passage, Question } from '@/lib/types';
import { AudioPlayer } from '@/components/audio-player';
import { CheckCircle2, XCircle, ArrowRight, BookmarkPlus, Users, Radio } from 'lucide-react';
import { useTOEICStore } from '@/lib/store';

interface Part3And4ViewProps {
  passage: Passage;
  onNext: () => void;
  isLast: boolean;
}

export const Part3And4View: React.FC<Part3And4ViewProps> = ({
  passage,
  onNext,
  isLast
}) => {
  const isPart3 = passage.partNumber === 3;
  const questions = passage.questions;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
    alert('Pregunta añadida al Centro de Repaso.');
  };

  const allAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="space-y-6">
      {/* Audio & Header Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl text-white ${isPart3 ? 'bg-sky-500' : 'bg-violet-500'}`}>
              {isPart3 ? <Users className="w-5 h-5" /> : <Radio className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                {passage.title || (isPart3 ? 'Conversación entre profesionales' : 'Charla breve')}
              </h3>
              <span className="text-xs text-slate-500">
                Parte {passage.partNumber} • 3 Preguntas asociadas a este audio
              </span>
            </div>
          </div>
        </div>

        {/* Audio Player */}
        <AudioPlayer
          audioScript={passage.transcriptHidden}
          transcriptHidden={passage.transcriptHidden}
          autoPlay={true}
        />
      </div>

      {/* 3 Linked Questions */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = selected === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">Q{idx + 1}.</span>
                  {q.questionText}
                </h4>

                {hasSubmitted && (
                  <button
                    onClick={() => handleBookmark(q)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title="Guardar en Centro de Repaso"
                  >
                    <BookmarkPlus className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt) => {
                  const isThisSelected = selected === opt.key;
                  const isThisCorrect = opt.key === q.correctAnswer;

                  let style = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-400';
                  if (hasSubmitted) {
                    if (isThisCorrect) {
                      style = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
                    } else if (isThisSelected && !isThisCorrect) {
                      style = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500';
                    } else {
                      style = 'opacity-50 border-slate-200 dark:border-slate-800';
                    }
                  } else if (isThisSelected) {
                    style = 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 ring-1 ring-blue-600';
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelect(q.id, opt.key)}
                      disabled={hasSubmitted}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between text-sm transition-all ${style}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-xs">
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </div>

                      {hasSubmitted && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {hasSubmitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submitting */}
              {hasSubmitted && (
                <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">
                    Explicación:
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex justify-end gap-3 pt-4">
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
            {allAnswered ? 'Revisar 3 Respuestas' : 'Responde las 3 preguntas para revisar'}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 active:scale-95"
          >
            <span>{isLast ? 'Finalizar Práctica' : 'Siguiente Grupo de Preguntas'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
