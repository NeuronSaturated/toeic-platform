'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ExamAttempt, Question, Passage } from '@/lib/types';
import { Award, Headphones, BookOpen, Clock, RotateCcw, AlertCircle, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScoreReportProps {
  report: ExamAttempt;
  questions: { question: Question; passage?: Passage }[];
  onRetry: () => void;
}

export const ScoreReport: React.FC<ScoreReportProps> = ({
  report,
  questions,
  onRetry
}) => {
  useEffect(() => {
    // Fire celebratory confetti if score is solid
    if ((report.totalScore || 0) >= 600) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Ignore in environments without canvas
      }
    }
  }, [report.totalScore]);

  const totalScore = report.totalScore || 10;
  const listeningScore = report.scoreListening || 5;
  const readingScore = report.scoreReading || 5;
  const accuracy = Math.round((report.correctCount / report.totalQuestions) * 100);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 rounded-3xl p-8 sm:p-10 text-white shadow-xl text-center space-y-6 relative overflow-hidden">
        <div className="relative z-10 max-w-xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-blue-100">
            <Award className="w-4 h-4" />
            <span>Resultado Oficial de Simulacro</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Puntaje Total Proyectado
          </h2>

          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-6xl sm:text-7xl font-black tracking-tight">
              {totalScore}
            </span>
            <span className="text-xl text-blue-200 font-semibold self-end mb-2">
              / 990 pts
            </span>
          </div>

          <p className="text-sm text-blue-100 font-medium">
            Calibrado bajo la escala oficial de percentiles ETS (Listening 5-495 + Reading 5-495)
          </p>
        </div>

        {/* Section Score Breakdown */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-4">
          {/* Listening Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/40 text-white">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-xs uppercase text-blue-200 font-bold">Listening</span>
                <span className="text-xs text-blue-100">Partes 1 a 4</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black">{listeningScore}</span>
              <span className="text-xs text-blue-200"> / 495</span>
            </div>
          </div>

          {/* Reading Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/40 text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block text-xs uppercase text-blue-200 font-bold">Reading</span>
                <span className="text-xs text-blue-100">Partes 5 a 7</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black">{readingScore}</span>
              <span className="text-xs text-blue-200"> / 495</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm text-center">
          <span className="text-xs text-slate-500 uppercase font-semibold">Tasa de Aciertos</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {accuracy}%
          </div>
          <span className="text-xs text-slate-400">
            {report.correctCount} correctas de {report.totalQuestions}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm text-center">
          <span className="text-xs text-slate-500 uppercase font-semibold">Tiempo Empleado</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {formatSeconds(report.timeSpentSeconds)}
          </div>
          <span className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-0.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Ritmo del simulacro</span>
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm text-center">
          <span className="text-xs text-slate-500 uppercase font-semibold">Nivel MCER Estimado</span>
          <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
            {totalScore >= 785 ? 'B2 / C1' : totalScore >= 550 ? 'B1' : 'A2'}
          </div>
          <span className="text-xs text-slate-400">
            {totalScore >= 785 ? 'Profesional Avanzado' : 'Competencia Intermedia'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Hacer Otro Simulacro</span>
        </button>

        <Link
          href="/review-bank"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all"
        >
          <AlertCircle className="w-4 h-4" />
          <span>Repasar Preguntas Falladas</span>
        </Link>

        <Link
          href="/dashboard"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
        >
          <span>Ver Mi Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Question-by-Question Detailed Review */}
      <div className="space-y-4 pt-6">
        <h3 className="font-bold text-xl text-slate-900 dark:text-white">
          Revisión Detallada Pregunta por Pregunta
        </h3>

        <div className="space-y-4">
          {report.answers.map((ans, idx) => {
            const item = questions[idx];
            if (!item) return null;
            const q = item.question;
            const isCorrect = ans.isCorrect;

            return (
              <div
                key={ans.questionId}
                className={`p-5 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    : 'border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                          #{idx + 1} (Parte {q.partNumber})
                        </span>
                        <span className="text-xs text-slate-400">• {q.subtheme}</span>
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                        {q.questionText}
                      </h4>
                    </div>
                  </div>

                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isCorrect ? 'Correcta' : 'Fallada'}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {q.options.map(opt => (
                    <div
                      key={opt.key}
                      className={`p-2 rounded-lg border ${
                        opt.key === q.correctAnswer
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 font-bold text-emerald-900 dark:text-emerald-200'
                          : opt.key === ans.userAnswer && !isCorrect
                          ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 line-through'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="font-bold mr-1">({opt.key})</span>
                      <span>{opt.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                  <strong className="block text-slate-900 dark:text-white mb-0.5">Explicación:</strong>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
