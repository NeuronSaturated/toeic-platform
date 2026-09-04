'use client';

import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { UserStats, PartNumber } from '@/lib/types';
import { TOEIC_PARTS } from '@/lib/parts-meta';

interface AnalyticsChartsProps {
  stats: UserStats;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ stats }) => {
  // Format data for parts bar chart
  const partsData = TOEIC_PARTS.map((part) => {
    const partStats = stats.accuracyByPart[part.partNumber] || { total: 0, correct: 0 };
    const accuracy = partStats.total > 0
      ? Math.round((partStats.correct / partStats.total) * 100)
      : 0;

    return {
      name: `P${part.partNumber}`,
      fullName: `Parte ${part.partNumber}: ${part.name}`,
      accuracy,
      practiced: partStats.total,
      section: part.section
    };
  });

  // Format data for subthemes
  const subthemesList = Object.entries(stats.accuracyBySubtheme)
    .map(([sub, val]) => ({
      subtheme: sub.length > 22 ? sub.substring(0, 20) + '...' : sub,
      accuracy: val.total > 0 ? Math.round((val.correct / val.total) * 100) : 0,
      total: val.total
    }))
    .slice(0, 6);

  const defaultSubthemes = [
    { subtheme: 'Tiempos verbales', accuracy: 82, total: 24 },
    { subtheme: 'Preposiciones', accuracy: 75, total: 18 },
    { subtheme: 'Vocabulario comercial', accuracy: 88, total: 32 },
    { subtheme: 'Inferencias de audio', accuracy: 68, total: 15 },
    { subtheme: 'Lectura de emails', accuracy: 90, total: 20 },
    { subtheme: 'Voz pasiva', accuracy: 79, total: 14 }
  ];

  const displaySubthemes = subthemesList.length >= 3 ? subthemesList : defaultSubthemes;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Accuracy by TOEIC Part */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">
              Precisión por Parte (1 a 7)
            </h4>
            <span className="text-xs text-slate-500">Porcentaje de aciertos en cada sección</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block" />
              <span className="text-slate-600 dark:text-slate-400">Listening</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" />
              <span className="text-slate-600 dark:text-slate-400">Reading</span>
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={partsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white text-xs p-3 rounded-xl shadow-xl border border-slate-800">
                        <strong className="block font-bold">{data.fullName}</strong>
                        <div className="mt-1 text-slate-300">
                          Precisión: <span className="font-bold text-white">{data.accuracy}%</span>
                        </div>
                        <div className="text-slate-400">
                          Ejercicios resueltos: {data.practiced}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                {partsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.section === 'listening' ? '#2563eb' : '#10b981'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subtheme & Grammar Strengths */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">
            Competencias Gramaticales y Temáticas
          </h4>
          <span className="text-xs text-slate-500">Desglose de habilidades clave evaluadas en TOEIC</span>
        </div>

        <div className="space-y-3.5 pt-2">
          {displaySubthemes.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">{item.subtheme}</span>
                <span className={item.accuracy >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>
                  {item.accuracy}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.accuracy >= 75 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.max(10, item.accuracy)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
