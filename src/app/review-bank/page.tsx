'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  ArrowRight, 
  Play, 
  BookOpen, 
  Filter,
  Check
} from 'lucide-react';
import { useTOEICStore } from '@/lib/store';
import { PartNumber, ReviewItem } from '@/lib/types';

export default function ReviewBankPage() {
  const { reviewBank, recordReviewAttempt, clearMasteredReviewItems } = useTOEICStore();
  const [selectedPartFilter, setSelectedPartFilter] = useState<number | 'all'>('all');
  const [drillModeActive, setDrillModeActive] = useState(false);
  const [drillIndex, setDrillIndex] = useState(0);
  const [drillAnswered, setDrillAnswered] = useState(false);
  const [drillSelectedKey, setDrillSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);

  const reviewItemsList = Object.values(reviewBank).sort((a, b) => {
    // Unmastered first, then highest missed count
    if (a.isMastered !== b.isMastered) return a.isMastered ? 1 : -1;
    return b.missedCount - a.missedCount;
  });

  const filteredItems = reviewItemsList.filter(item => {
    if (selectedPartFilter === 'all') return true;
    return item.question.partNumber === selectedPartFilter;
  });

  const pendingItems = reviewItemsList.filter(i => !i.isMastered);
  const masteredCount = reviewItemsList.filter(i => i.isMastered).length;

  // Handle drill answer
  const handleDrillAnswer = (key: 'A' | 'B' | 'C' | 'D', item: ReviewItem) => {
    if (drillAnswered) return;
    setDrillSelectedKey(key);
    setDrillAnswered(true);
    const isCorrect = key === item.question.correctAnswer;
    recordReviewAttempt(item.questionId, isCorrect);
  };

  const handleNextDrill = () => {
    setDrillAnswered(false);
    setDrillSelectedKey(null);
    if (drillIndex >= pendingItems.length - 1) {
      setDrillModeActive(false);
      setDrillIndex(0);
    } else {
      setDrillIndex(prev => prev + 1);
    }
  };

  // 1. Drill Mode Interactive View
  if (drillModeActive && pendingItems.length > 0) {
    const activeItem = pendingItems[drillIndex];
    if (!activeItem) {
      setDrillModeActive(false);
      return null;
    }

    const q = activeItem.question;
    const isCorrect = drillSelectedKey === q.correctAnswer;

    return (
      <div className="max-w-2xl mx-auto space-y-6 py-6 animate-in fade-in-50">
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase">
              Entrenamiento de Errores ({drillIndex + 1} de {pendingItems.length})
            </span>
          </div>
          <button
            onClick={() => setDrillModeActive(false)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            Salir del entrenamiento
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-3">
            <span>Parte {q.partNumber} • {q.subtheme}</span>
            <span className="text-rose-500 font-medium">Fallada {activeItem.missedCount} veces</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {q.questionText}
          </h3>

          <div className="space-y-2.5">
            {q.options.map((opt) => {
              const isThisSelected = drillSelectedKey === opt.key;
              const isThisCorrect = opt.key === q.correctAnswer;

              let style = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-400';
              if (drillAnswered) {
                if (isThisCorrect) {
                  style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isThisSelected && !isThisCorrect) {
                  style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                } else {
                  style = 'opacity-50 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={opt.key}
                  onClick={() => handleDrillAnswer(opt.key, activeItem)}
                  disabled={drillAnswered}
                  className={`w-full p-3.5 rounded-xl border text-left text-sm flex items-center justify-between transition-all ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 font-bold flex items-center justify-center text-xs">
                      {opt.key}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {drillAnswered && isThisCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {drillAnswered && (
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                <strong className="block text-slate-900 dark:text-white mb-1">Explicación:</strong>
                {q.explanation}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextDrill}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-sm active:scale-95"
                >
                  <span>{drillIndex >= pendingItems.length - 1 ? 'Finalizar Entrenamiento' : 'Siguiente'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. Default Review Bank Dashboard & List View
  return (
    <div className="space-y-8 animate-in fade-in-50">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 dark:border-amber-900/50 p-6 sm:p-8 rounded-3xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Repetición Espaciada / Error Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Banco de Errores y Repaso
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
            Los ítems que fallas en modo práctica o simulacro se guardan aquí. Responde correctamente dos veces seguidas para marcarlos como dominados.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {pendingItems.length > 0 && (
            <button
              onClick={() => {
                setDrillIndex(0);
                setDrillAnswered(false);
                setDrillSelectedKey(null);
                setDrillModeActive(true);
              }}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Entrenar Errores ({pendingItems.length})</span>
            </button>
          )}

          {masteredCount > 0 && (
            <button
              onClick={clearMasteredReviewItems}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Eliminar preguntas dominadas"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs by Part */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedPartFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            selectedPartFilter === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
          }`}
        >
          Todas ({reviewItemsList.length})
        </button>
        {[1, 2, 3, 4, 5, 6, 7].map((num) => {
          const count = reviewItemsList.filter(i => i.question.partNumber === num).length;
          return (
            <button
              key={num}
              onClick={() => setSelectedPartFilter(num)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPartFilter === num
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
              }`}
            >
              Parte {num} ({count})
            </button>
          );
        })}
      </div>

      {/* Review List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            ¡Tu Banco de Errores está limpio!
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No tienes preguntas falladas en este filtro. Continúa practicando o realiza un simulacro oficial para poner a prueba tus conocimientos.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            <span>Ir a Práctica por Partes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const q = item.question;
            return (
              <div
                key={item.questionId}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      Parte {q.partNumber} • {q.subtheme}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-semibold text-[11px] ${
                      item.isMastered
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                    }`}>
                      {item.isMastered ? 'Dominada' : `Fallada ${item.missedCount}x`}
                    </span>
                  </div>

                  <h4 className="font-medium text-sm text-slate-900 dark:text-white line-clamp-3">
                    {q.questionText}
                  </h4>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl leading-relaxed">
                    <strong className="block text-slate-900 dark:text-white mb-0.5">Clave ({q.correctAnswer}):</strong>
                    {q.explanation}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Aciertos seguidos: {item.correctInARow}/2</span>
                    <span className="capitalize">Nivel: {q.difficulty}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
