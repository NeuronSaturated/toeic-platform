'use client';

import React, { useState } from 'react';
import { Question } from '@/lib/types';
import { AudioPlayer } from '@/components/audio-player';
import { CheckCircle2, XCircle, Volume2, ArrowRight, BookmarkPlus } from 'lucide-react';
import { useTOEICStore } from '@/lib/store';

interface Part2ViewProps {
  question: Question;
  onNext: () => void;
  isLast: boolean;
}

export const Part2View: React.FC<Part2ViewProps> = ({
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
    addToReviewBank(question);
    alert('Pregunta añadida al Banco de Errores para repaso.');
  };

  const isCorrect = selectedKey === question.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Instructions Banner */}
      <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 p-4 rounded-2xl text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-3">
        <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <div>
          <strong className="block font-semibold">Regla Oficial TOEIC Parte 2:</strong>
          Solo audio. La pregunta y las tres respuestas (A, B, C) no aparecen escritas en tu pantalla hasta que respondes.
        </div>
      </div>

      {/* Audio Player Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-inner">
          <Volume2 className="w-8 h-8" />
        </div>
        <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
          Pregunta #{question.questionNumber}
        </h3>

        <div className="max-w-md mx-auto">
          <AudioPlayer
            audioScript={question.audioScript}
            transcriptHidden={question.audioScript}
            autoPlay={true}
          />
        </div>

        {/* Revealed Spoken Text ONLY after answering */}
        {hasAnswered ? (
          <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-left space-y-2 border border-slate-200 dark:border-slate-700 animate-in fade-in-50">
            <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block">
              Transcripción Revelada:
            </span>
            <p className="font-semibold text-slate-900 dark:text-white text-base">
              "{question.questionText}"
            </p>
            <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300 pt-1">
              {question.options.map(opt => (
                <div key={opt.key} className={`flex items-center gap-2 ${opt.key === question.correctAnswer ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
                  <span>({opt.key})</span>
                  <span>{opt.text}</span>
                  {opt.key === question.correctAnswer && <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">Correcta</span>}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-mono tracking-wide pt-2">
            [Texto oculto mientras escuchas • Presiona A, B o C para responder]
          </p>
        )}
      </div>

      {/* Answer Buttons (Large A, B, C) */}
      <div className="grid grid-cols-3 gap-4">
        {(['A', 'B', 'C'] as const).map((key) => {
          const isThisSelected = selectedKey === key;
          const isThisCorrect = key === question.correctAnswer;

          let btnClass = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-800 dark:text-slate-200 shadow-sm';
          if (hasAnswered) {
            if (isThisCorrect) {
              btnClass = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20 font-bold';
            } else if (isThisSelected && !isThisCorrect) {
              btnClass = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20';
            } else {
              btnClass = 'opacity-50 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800';
            }
          }

          return (
            <button
              key={key}
              onClick={() => handleSelectOption(key)}
              disabled={hasAnswered}
              className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${btnClass}`}
            >
              <span className="text-2xl font-black">{key}</span>
              <span className="text-xs font-semibold text-slate-400">Opción {key}</span>
            </button>
          );
        })}
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
                  {isCorrect ? '¡Correcto!' : `Incorrecto (Respuesta oficial: ${question.correctAnswer})`}
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
