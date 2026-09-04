'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Flame, 
  Award, 
  Target, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Clock,
  BookOpen,
  Headphones
} from 'lucide-react';
import { useTOEICStore } from '@/lib/store';
import { TOEIC_PARTS } from '@/lib/parts-meta';
import { ScoreCard } from '@/components/dashboard/ScoreCard';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';

export default function DashboardPage() {
  const { stats, reviewBank } = useTOEICStore();

  const totalAttempted = stats.totalPracticed;
  const overallAccuracy = totalAttempted > 0
    ? Math.round((stats.totalCorrect / totalAttempted) * 100)
    : 0;

  const missedCount = Object.values(reviewBank).filter(i => !i.isMastered).length;

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dashboard Analítico de Rendimiento
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Seguimiento de tu evolución, fortalezas por habilidad y proyección oficial de puntaje.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/mock-test"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Clock className="w-4 h-4" />
            <span>Hacer Simulacro</span>
          </Link>
        </div>
      </div>

      {/* 1. Official TOEIC Score Projection Card */}
      <ScoreCard
        listeningScore={stats.estimatedListeningScore}
        readingScore={stats.estimatedReadingScore}
        totalScore={stats.estimatedTotalScore}
      />

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Ejercicios Resueltos
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {totalAttempted}
          </div>
          <span className="text-[11px] text-slate-400">Total histórico</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Precisión Global
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
            {overallAccuracy}%
          </div>
          <span className="text-[11px] text-slate-400">{stats.totalCorrect} correctas</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Racha de Estudio
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center gap-1.5">
            <Flame className="w-6 h-6 fill-amber-500" />
            <span>{stats.studyStreakDays} días</span>
          </div>
          <span className="text-[11px] text-slate-400">Constancia diaria</span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Para Repasar
          </span>
          <div className="text-2xl sm:text-3xl font-black text-rose-500">
            {missedCount}
          </div>
          <Link href="/review-bank" className="text-[11px] text-blue-500 hover:underline flex items-center gap-1">
            <span>En Banco de Errores</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* 3. Recharts Analytics */}
      <AnalyticsCharts stats={stats} />

      {/* 4. Detailed Breakdown Table Across All 7 Parts */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Desglose Exhaustivo por Parte Oficial
            </h3>
            <span className="text-xs text-slate-500">Métricas detalladas para orientar tu plan de estudio</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase font-bold text-slate-400">
                <th className="pb-3 font-semibold">Parte</th>
                <th className="pb-3 font-semibold">Sección</th>
                <th className="pb-3 font-semibold">Intentadas</th>
                <th className="pb-3 font-semibold">Aciertos</th>
                <th className="pb-3 font-semibold">Tasa de Acierto</th>
                <th className="pb-3 font-semibold text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {TOEIC_PARTS.map((part) => {
                const partStats = stats.accuracyByPart[part.partNumber] || { total: 0, correct: 0 };
                const accuracy = partStats.total > 0
                  ? Math.round((partStats.correct / partStats.total) * 100)
                  : 0;

                const isListening = part.section === 'listening';

                return (
                  <tr key={part.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                        {part.partNumber}
                      </span>
                      <span>{part.name}</span>
                    </td>
                    <td className="py-3.5 text-xs">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold ${
                        isListening
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                          : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      }`}>
                        {isListening ? <Headphones className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                        <span className="capitalize">{part.section}</span>
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">{partStats.total}</td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300">{partStats.correct}</td>
                    <td className="py-3.5 font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${accuracy >= 75 ? 'bg-emerald-500' : accuracy >= 50 ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                            style={{ width: `${accuracy}%` }}
                          />
                        </div>
                        <span className={accuracy >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}>
                          {accuracy}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        href={`/practice/${part.partNumber}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Entrenar</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
