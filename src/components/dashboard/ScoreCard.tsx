'use client';

import React from 'react';
import { Award, Headphones, BookOpen, TrendingUp, Sparkles } from 'lucide-react';

interface ScoreCardProps {
  listeningScore: number;
  readingScore: number;
  totalScore: number;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  listeningScore,
  readingScore,
  totalScore
}) => {
  // Determine CEFR level
  let cefr = 'A1';
  let badgeColor = 'bg-slate-100 text-slate-800';
  let levelDesc = 'Principiante básico';

  if (totalScore >= 945) {
    cefr = 'C1+';
    badgeColor = 'bg-purple-100 text-purple-900 border-purple-300';
    levelDesc = 'Dominio operativo avanzado';
  } else if (totalScore >= 785) {
    cefr = 'B2';
    badgeColor = 'bg-blue-100 text-blue-900 border-blue-300';
    levelDesc = 'Usuario profesional funcional';
  } else if (totalScore >= 550) {
    cefr = 'B1';
    badgeColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
    levelDesc = 'Intermedio laboral';
  } else if (totalScore >= 225) {
    cefr = 'A2';
    badgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
    levelDesc = 'Elemental';
  }

  const scorePercentage = Math.round(((totalScore - 10) / 980) * 100);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnóstico de Puntaje TOEIC</span>
            </span>

            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${badgeColor}`}>
              Nivel {cefr}
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">
                {totalScore}
              </span>
              <span className="text-lg text-slate-400 font-medium">
                / 990 puntos
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium mt-1">
              {levelDesc} • Proyección estimada en tiempo real
            </p>
          </div>

          {/* Progress to target */}
          <div className="space-y-1.5 pt-1 max-w-md">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Escala oficial (10 - 990)</span>
              <span>{scorePercentage}% del puntaje máximo</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${scorePercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section Score Cards */}
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl space-y-1 min-w-[140px]">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase">
              <Headphones className="w-3.5 h-3.5" />
              <span>Listening</span>
            </div>
            <div className="text-2xl font-black text-white">
              {listeningScore}
            </div>
            <span className="text-[11px] text-slate-400">Escala 5 - 495</span>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl space-y-1 min-w-[140px]">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Reading</span>
            </div>
            <div className="text-2xl font-black text-white">
              {readingScore}
            </div>
            <span className="text-[11px] text-slate-400">Escala 5 - 495</span>
          </div>
        </div>
      </div>
    </div>
  );
};
