'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Camera, 
  HelpCircle, 
  Users, 
  Radio, 
  FileEdit, 
  FileText, 
  BookOpen, 
  Clock, 
  ArrowRight,
  Headphones,
  CheckCircle2
} from 'lucide-react';
import { PartInfo } from '@/lib/types';
import { useTOEICStore } from '@/lib/store';
import { TOTAL_EXERCISE_COUNTS } from '@/lib/data/mock-data';

const ICON_MAP: Record<string, React.ElementType> = {
  Camera,
  HelpCircle,
  Users,
  Radio,
  FileEdit,
  FileText,
  BookOpen
};

interface PartCardProps {
  part: PartInfo;
}

export const PartCard: React.FC<PartCardProps> = ({ part }) => {
  const { stats } = useTOEICStore();
  const IconComponent = ICON_MAP[part.iconName] || BookOpen;

  const partStats = stats.accuracyByPart[part.partNumber] || { total: 0, correct: 0 };
  const totalAvailable = TOTAL_EXERCISE_COUNTS[part.partNumber] || 40;
  const accuracyPercentage = partStats.total > 0
    ? Math.round((partStats.correct / partStats.total) * 100)
    : 0;

  const progressPercentage = Math.min(100, Math.round((partStats.total / totalAvailable) * 100));

  const isListening = part.section === 'listening';

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-blue-400 dark:hover:border-blue-500">
      <div>
        {/* Header Tag and Section */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isListening 
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900' 
              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
          }`}>
            {isListening ? <Headphones className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
            <span>{isListening ? 'Listening' : 'Reading'}</span>
          </span>

          <span className="text-xs font-semibold text-slate-400">
            Parte {part.partNumber}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${part.color} text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {part.name}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {part.nameEn}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          {part.description}
        </p>
      </div>

      {/* Stats, Progress and Action */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        {/* Exercises Available & Exam Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
            <span>{totalAvailable} ejercicios disponibles</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>~{part.timeAdviceMinutes} min</span>
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-600 dark:text-slate-400">
              Progreso: {partStats.total}/{totalAvailable}
            </span>
            <span className={`font-bold ${accuracyPercentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}>
              {partStats.total > 0 ? `${accuracyPercentage}% aciertos` : 'Sin practicar'}
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${isListening ? 'bg-blue-600' : 'bg-emerald-600'}`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Practice Button */}
        <Link
          href={`/practice/${part.partNumber}`}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
        >
          <span>Practicar Parte {part.partNumber}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
