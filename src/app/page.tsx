'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Clock, 
  AlertCircle, 
  Award, 
  Headphones, 
  BookOpen, 
  ArrowRight,
  Flame,
  CheckCircle,
  BarChart2,
  GraduationCap
} from 'lucide-react';
import { TOEIC_PARTS } from '@/lib/parts-meta';
import { PartCard } from '@/components/part-card';
import { useTOEICStore } from '@/lib/store';

export default function HomePage() {
  const [filterSection, setFilterSection] = useState<'all' | 'listening' | 'reading'>('all');
  const { stats, reviewBank } = useTOEICStore();

  const filteredParts = TOEIC_PARTS.filter(p => {
    if (filterSection === 'listening') return p.section === 'listening';
    if (filterSection === 'reading') return p.section === 'reading';
    return true;
  });

  const missedCount = Object.values(reviewBank).filter(i => !i.isMastered).length;

  return (
    <div className="space-y-12 animate-in fade-in-50 duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-white/10">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-blue-100">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Banco Masivo de +330 Ejercicios Originales</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Domina el Examen TOEIC® con Precisión y Confianza
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl">
            Práctica adaptativa para las 7 partes oficiales del examen. Audios con acentos reales, modo simulacro cronometrado, banco de errores inteligente y estimación de puntaje oficial (10 - 990).
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/mock-test"
              className="px-6 py-3.5 rounded-2xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-sm flex items-center gap-2 shadow-lg shadow-black/20 hover:scale-102 active:scale-98 transition-all"
            >
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Iniciar Simulacro Oficial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/study"
              className="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-sm flex items-center gap-2 hover:scale-102 active:scale-98 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-cyan-300" />
              <span>Estudiar Guía</span>
            </Link>

            <Link
              href="/review-bank"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-sm flex items-center gap-2 hover:scale-102 active:scale-98 transition-all"
            >
              <AlertCircle className="w-4 h-4 text-amber-300" />
              <span>Banco de Errores ({missedCount})</span>
            </Link>
          </div>
        </div>

        {/* Floating Stat Highlights */}
        <div className="mt-8 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">330+</div>
            <div className="text-xs text-blue-200">Preguntas originales</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">7 Partes</div>
            <div className="text-xs text-blue-200">Mecánicas oficiales</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {stats.estimatedTotalScore} pts
            </div>
            <div className="text-xs text-blue-200">Puntaje proyectado</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 flex items-center justify-center sm:justify-start gap-1">
              <Flame className="w-5 h-5 fill-amber-300" />
              <span>{stats.studyStreakDays} días</span>
            </div>
            <div className="text-xs text-blue-200">Racha de estudio</div>
          </div>
        </div>
      </section>

      {/* Parts Explorer Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Práctica por Sección y Parte
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Selecciona una de las 7 partes oficiales para entrenar a tu propio ritmo con retroalimentación inmediata.
            </p>
          </div>

          {/* Section Filter Pills */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 border border-slate-300/50 dark:border-slate-700/50 text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setFilterSection('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterSection === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Todas (7)
            </button>
            <button
              onClick={() => setFilterSection('listening')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                filterSection === 'listening'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Listening (1-4)</span>
            </button>
            <button
              onClick={() => setFilterSection('reading')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                filterSection === 'reading'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Reading (5-7)</span>
            </button>
          </div>
        </div>

        {/* 7 Part Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </div>
      </section>

      {/* Features Value Prop Banner */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Calibración Oficial 10-990
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Algoritmo de puntuación estandarizado que calcula tu proyección real en Listening (5-495) y Reading (5-495).
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Repetición Espaciada
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Toda pregunta fallada se traslada a tu Banco de Errores para reentrenar hasta que la domines dos veces seguidas.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
              Analítica de Habilidades
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Gráficos interactivos de precisión por subtemas: tiempos verbales, preposiciones, vocabulario y comprensión auditiva.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
