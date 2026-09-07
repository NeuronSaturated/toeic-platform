'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  ArrowRight, 
  Play, 
  BookOpen, 
  Filter,
  Check,
  PieChart as PieChartIcon,
  HelpCircle,
  Award,
  Volume2
} from 'lucide-react';
import { useTOEICStore } from '@/lib/store';
import { PartNumber, ReviewItem } from '@/lib/types';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { audioEngine } from '@/lib/audio-synth';

const COLORS = [
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#EC4899', // Pink
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#8B5CF6', // Purple
  '#06B6D4'  // Cyan
];

export default function ReviewCenterPage() {
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
  const totalCount = reviewItemsList.length;
  const masteryRate = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

  // Distribution by Part
  const partDistribution = [1, 2, 3, 4, 5, 6, 7].map(partNum => {
    const count = pendingItems.filter(i => i.question.partNumber === partNum).length;
    return {
      name: `Parte ${partNum}`,
      value: count,
      partNum
    };
  }).filter(p => p.value > 0);

  // Distribution by Subtheme
  const subthemeMap: Record<string, number> = {};
  pendingItems.forEach(i => {
    const sub = i.question.subtheme || 'General';
    subthemeMap[sub] = (subthemeMap[sub] || 0) + 1;
  });
  const subthemeDistribution = Object.entries(subthemeMap).map(([name, value]) => ({
    name,
    value
  })).sort((a, b) => b.value - a.value).slice(0, 5);

  // Find most critical part
  const mostCriticalPart = partDistribution.slice().sort((a, b) => b.value - a.value)[0];

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

  // 1. Interactive Drill Mode
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
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Entrenamiento de Repaso ({drillIndex + 1} de {pendingItems.length})
            </span>
          </div>
          <button
            onClick={() => setDrillModeActive(false)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            Salir del repaso
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-3">
            <span>Parte {q.partNumber} • {q.subtheme}</span>
            <span className="text-rose-500 font-semibold">Fallada {activeItem.missedCount} veces</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
            {q.questionText}
          </h3>

          {/* Spoken audio button if listening question */}
          {q.audioScript && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl">
              <button
                onClick={() => audioEngine.play(undefined, q.audioScript)}
                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                title="Escuchar audio de la pregunta"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <span className="text-xs text-blue-900 dark:text-blue-200">
                Audio disponible para esta pregunta
              </span>
            </div>
          )}

          <div className="space-y-2.5">
            {q.options.map((opt) => {
              const isThisSelected = drillSelectedKey === opt.key;
              const isThisCorrect = opt.key === q.correctAnswer;

              let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-blue-500';
              if (drillAnswered) {
                if (isThisCorrect) {
                  style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold';
                } else if (isThisSelected && !isThisCorrect) {
                  style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200';
                } else {
                  style = 'opacity-50 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={opt.key}
                  disabled={drillAnswered}
                  onClick={() => handleDrillAnswer(opt.key, activeItem)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center text-xs">
                      {opt.key}
                    </span>
                    <span className="text-sm">{opt.text}</span>
                  </div>
                  {drillAnswered && isThisCorrect && (
                    <Check className="w-5 h-5 text-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>

          {drillAnswered && (
            <div className={`p-4 rounded-2xl border text-sm space-y-2 animate-in fade-in-50 ${
              isCorrect 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-900 dark:text-emerald-200' 
                : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="font-bold flex items-center gap-2">
                {isCorrect ? '¡Acertaste! Racha de aciertos: +1' : `Fallaste. Respuesta correcta: Opción ${q.correctAnswer}`}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {q.explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextDrill}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                >
                  <span>{drillIndex >= pendingItems.length - 1 ? 'Terminar Repaso' : 'Siguiente'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. Main Dashboard of Review Center
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repetición Espaciada Inteligente</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Centro de Repaso
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Revisa, entrena y domina las preguntas que necesitas reforzar antes del examen oficial.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {pendingItems.length > 0 && (
            <button
              onClick={() => {
                setDrillIndex(0);
                setDrillAnswered(false);
                setDrillSelectedKey(null);
                setDrillModeActive(true);
              }}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Entrenar Pendientes ({pendingItems.length})</span>
            </button>
          )}

          {masteredCount > 0 && (
            <button
              onClick={clearMasteredReviewItems}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:border-rose-300 transition-colors"
              title="Limpiar preguntas dominadas"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Pendientes de Repaso
          </span>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
            {pendingItems.length}
          </div>
          <span className="text-[11px] text-slate-400">Preguntas activas</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Ya Dominadas
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {masteredCount}
          </div>
          <span className="text-[11px] text-slate-400">2+ aciertos consecutivos</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Tasa de Superación
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
            {masteryRate}%
          </div>
          <span className="text-[11px] text-slate-400">Del total registrado</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Enfoque Prioritario
          </span>
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 truncate">
            {mostCriticalPart ? mostCriticalPart.name : 'Ninguna'}
          </div>
          <span className="text-[11px] text-slate-400">Mayor necesidad de repaso</span>
        </div>
      </div>

      {/* METRIC CHARTS PANEL (Pie Chart de distribución de errores) */}
      {pendingItems.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Distribución por Parte del Examen */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4 text-blue-600" />
                  <span>Distribución de Errores por Parte</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Proporción de preguntas a reforzar según la sección del examen.
                </p>
              </div>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={partDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {partDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      backgroundColor: '#0f172a', 
                      borderColor: '#334155', 
                      color: '#ffffff',
                      fontSize: '12px'
                    }} 
                    formatter={(val) => [`${val} preguntas`, 'Pendientes']}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    formatter={(val) => <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Temáticas / Subtemas más falladas */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Temáticas con Mayor Necesidad de Práctica</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Subtemas donde se concentran los fallos para priorizar tu estudio.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {subthemeDistribution.length === 0 ? (
                <p className="text-xs text-slate-400">Sin datos de subtemas aún.</p>
              ) : (
                subthemeDistribution.map((sub, idx) => {
                  const percentage = Math.round((sub.value / pendingItems.length) * 100);
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {sub.name}
                        </span>
                        <span className="text-slate-500 font-mono">
                          {sub.value} err. ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: COLORS[idx % COLORS.length]
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs by Part */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedPartFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            selectedPartFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          Todas las Partes ({reviewItemsList.length})
        </button>
        {[1, 2, 3, 4, 5, 6, 7].map(num => {
          const count = reviewItemsList.filter(i => i.question.partNumber === num).length;
          if (count === 0) return null;
          return (
            <button
              key={num}
              onClick={() => setSelectedPartFilter(num)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedPartFilter === num
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Parte {num} ({count})
            </button>
          );
        })}
      </div>

      {/* Questions List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            ¡Tu Centro de Repaso está limpio!
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            No tienes preguntas pendientes de repasar en esta sección. Continúa realizando prácticas o simulacros para registrar cualquier punto a reforzar.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explorar Prácticas</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const q = item.question;
            return (
              <div
                key={item.questionId}
                className={`p-6 rounded-3xl border transition-all ${
                  item.isMastered
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                        Parte {q.partNumber}
                      </span>
                      <span className="text-xs text-slate-400">
                        • {q.subtheme}
                      </span>
                      {item.isMastered ? (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Dominada
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">
                          Fallada {item.missedCount} {item.missedCount === 1 ? 'vez' : 'veces'}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-base text-slate-900 dark:text-white leading-relaxed">
                      {q.questionText}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {q.options.map(opt => (
                        <div
                          key={opt.key}
                          className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                            opt.key === q.correctAnswer
                              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold'
                              : 'border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold">({opt.key})</span>
                            <span>{opt.text}</span>
                          </div>
                          {opt.key === q.correctAnswer && (
                            <span className="text-[10px] text-emerald-600 font-bold">Respuesta Oficial</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 mt-2">
                      <strong>Explicación:</strong> {q.explanation}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-slate-400 block">
                      Último intento
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {new Date(item.lastAttemptedAt).toLocaleDateString()}
                    </span>
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
