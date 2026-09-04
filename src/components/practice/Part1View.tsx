'use client';

import React, { useState } from 'react';
import { Question, Passage } from '@/lib/types';
import { AudioPlayer } from '@/components/audio-player';
import { CheckCircle2, XCircle, HelpCircle, BookmarkPlus, ArrowRight } from 'lucide-react';
import { useTOEICStore } from '@/lib/store';

interface Part1ViewProps {
  passage: Passage;
  question: Question;
  onNext: () => void;
  isLast: boolean;
}

export const Part1View: React.FC<Part1ViewProps> = ({
  passage,
  question,
  onNext,
  isLast
}) => {
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const { recordAnswer, addToReviewBank } = useTOEICStore();

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (hasAnswered) return;
    setSelectedKey(key);
    setHasAnswered(true);
    const isCorrect = key === question.correctAnswer;
    recordAnswer(question, key, isCorrect);
  };

  const handleBookmark = () => {
    addToReviewBank(question, passage);
    alert('Pregunta añadida al Banco de Errores para repaso.');
  };

  const isCorrect = selectedKey === question.correctAnswer;

  return (
    <div className="space-y-6">
      {/* Top Media: Image & Audio Player */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Photograph */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md relative group">
          {passage.contentUrl ? (
            <img
              src={passage.contentUrl}
              alt={passage.title || 'TOEIC Part 1 Photograph'}
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-80 flex items-center justify-center text-slate-400">
              Imagen de fotografía
            </div>
          )}
          <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-semibold">
            Parte 1 • Fotografía #{question.questionNumber}
          </div>
        </div>

        {/* Audio Player & Instructions */}
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 p-4 rounded-2xl text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
            <strong className="block font-semibold mb-1">Instrucciones de Parte 1:</strong>
            Escucha el audio con atención. Las 4 opciones habladas (A, B, C, D) describen la imagen. Elige la que refleje con mayor precisión lo que ves.
          </div>

          <AudioPlayer
            audioScript={question.audioScript}
            transcriptHidden={passage.transcriptHidden}
            autoPlay={true}
          />

          {/* Answer Option Buttons (A, B, C, D) */}
          <div className="space-y-2.5 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Selecciona tu respuesta:
            </span>
            {question.options.map((option) => {
              const isThisSelected = selectedKey === option.key;
              const isThisCorrect = option.key === question.correctAnswer;

              let btnStyle = 'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200';
              if (hasAnswered) {
                if (isThisCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-2 ring-emerald-500/20';
                } else if (isThisSelected && !isThisCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20';
                } else {
                  btnStyle = 'opacity-60 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
                }
              }

              return (
                <button
                  key={option.key}
                  onClick={() => handleSelectOption(option.key)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all active:scale-99 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-sm">
                      {option.key}
                    </span>
                    <span className="text-sm">{option.text}</span>
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
      </div>

      {/* Immediate Feedback Card & Explanation */}
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
                  {isCorrect ? '¡Excelente! Respuesta Correcta' : `Respuesta Incorrecta (Clave: Opción ${question.correctAnswer})`}
                </h4>
                <p className="text-sm mt-1 leading-relaxed opacity-95 text-slate-700 dark:text-slate-300">
                  {question.explanation}
                </p>
                <div className="mt-2 text-xs font-semibold text-slate-500">
                  Subtema: {question.subtheme} • Dificultad: {question.difficulty}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleBookmark}
                className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600"
                title="Guardar en Banco de Errores"
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
