'use client';

import React, { useState } from 'react';
import { Passage, Question } from '@/lib/types';
import { CheckCircle2, XCircle, ArrowRight, BookmarkPlus, BookOpen, Layers } from 'lucide-react';
import { useTOEICStore } from '@/lib/store';

interface Part7ViewProps {
  passage: Passage;
  onNext: () => void;
  isLast: boolean;
}

export const Part7View: React.FC<Part7ViewProps> = ({
  passage,
  onNext,
  isLast
}) => {
  const questions = passage.questions;
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'text1' | 'text2' | 'text3'>('text1');
  const { recordAnswer, addToReviewBank } = useTOEICStore();

  const isMultiPassage = passage.type === 'double_passage' || passage.type === 'triple_passage';

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
      {/* Split-Screen Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reading Passage(s) with independent scroll */}
        <div className="lg:col-span-6 xl:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 lg:sticky lg:top-20 max-h-[80vh] overflow-y-auto pr-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Parte 7 • {isMultiPassage ? 'Pasaje Múltiple' : 'Pasaje Individual'}</span>
            </div>

            {isMultiPassage && (
              <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <Layers className="w-3 h-3" />
                <span>Textos cruzados</span>
              </span>
            )}
          </div>

          <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
            {passage.title}
          </h3>

          {/* If Multi-Passage, show tabs to switch or render sequentially */}
          {isMultiPassage && (
            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('text1')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'text1'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Documento 1
              </button>
              {passage.secondTextContent && (
                <button
                  type="button"
                  onClick={() => setActiveTab('text2')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'text2'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Documento 2
                </button>
              )}
            </div>
          )}

          {/* Main Reading Text */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif whitespace-pre-line">
            {isMultiPassage ? (
              activeTab === 'text1' ? passage.textContent : passage.secondTextContent
            ) : (
              passage.textContent
            )}
          </div>
        </div>

        {/* Right Column: Questions */}
        <div className="lg:col-span-6 xl:col-span-5 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Preguntas asociadas ({questions.length}):
          </span>

          {questions.map((q, idx) => {
            const selected = selectedAnswers[q.id];
            const isCorrect = selected === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    <span className="text-blue-600 dark:text-blue-400 mr-1.5">#{idx + 1}.</span>
                    {q.questionText}
                  </h4>

                  {hasSubmitted && (
                    <button
                      onClick={() => handleBookmark(q)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600"
                      title="Guardar en Centro de Repaso"
                    >
                      <BookmarkPlus className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* 4 Choices */}
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isThisSelected = selected === opt.key;
                    const isThisCorrect = opt.key === q.correctAnswer;

                    let optStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-400';
                    if (hasSubmitted) {
                      if (isThisCorrect) {
                        optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500';
                      } else if (isThisSelected && !isThisCorrect) {
                        optStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500';
                      } else {
                        optStyle = 'opacity-50 border-slate-200 dark:border-slate-800';
                      }
                    } else if (isThisSelected) {
                      optStyle = 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-medium ring-1 ring-blue-600';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelect(q.id, opt.key)}
                        disabled={hasSubmitted}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${optStyle}`}
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

                {/* Explanation */}
                {hasSubmitted && (
                  <div className="mt-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                    <strong className="block text-slate-900 dark:text-white mb-0.5">Explicación:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
            {allAnswered ? 'Revisar Preguntas del Pasaje' : 'Responde todas las preguntas para revisar'}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 active:scale-95"
          >
            <span>{isLast ? 'Finalizar Práctica' : 'Siguiente Pasaje de Lectura'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
