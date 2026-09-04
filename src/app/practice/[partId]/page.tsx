'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { getPartInfo } from '@/lib/parts-meta';
import { getPassagesByPart, getQuestionsByPart } from '@/lib/data/mock-data';
import { PartNumber } from '@/lib/types';
import { Part1View } from '@/components/practice/Part1View';
import { Part2View } from '@/components/practice/Part2View';
import { Part3And4View } from '@/components/practice/Part3And4View';
import { Part5View } from '@/components/practice/Part5View';
import { Part6View } from '@/components/practice/Part6View';
import { Part7View } from '@/components/practice/Part7View';

export default function PracticeSessionPage() {
  const params = useParams();
  const router = useRouter();

  const partNum = parseInt(params.partId as string, 10) as PartNumber;
  const partInfo = getPartInfo(partNum);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!partInfo || isNaN(partNum) || partNum < 1 || partNum > 7) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Parte no encontrada</h2>
        <p className="text-slate-500">La sección solicitada no existe en el examen TOEIC.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </Link>
      </div>
    );
  }

  // Load items based on whether part is passage-based (1, 3, 4, 6, 7) or independent question-based (2, 5)
  const isPassageBased = [1, 3, 4, 6, 7].includes(partNum);
  const passages = isPassageBased ? getPassagesByPart(partNum) : [];
  const individualQuestions = !isPassageBased ? getQuestionsByPart(partNum) : [];

  const totalItems = isPassageBased ? passages.length : individualQuestions.length;
  const isLast = currentIndex >= totalItems - 1;

  const handleNext = () => {
    if (isLast) {
      setIsCompleted(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // Completion screen
  if (isCompleted) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl animate-in zoom-in-95">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            ¡Sesión de Práctica Finalizada!
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Parte {partNum}: {partInfo.name}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Has completado todos los ejercicios de esta ronda de entrenamiento. Tus estadísticas y respuestas se han actualizado automáticamente.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={handleRestart}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir Parte {partNum}</span>
          </button>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
          >
            <Award className="w-4 h-4" />
            <span>Ver Mi Progreso</span>
          </Link>
        </div>
      </div>
    );
  }

  const currentPassage = passages[currentIndex];
  const currentQuestion = individualQuestions[currentIndex];

  return (
    <div className="space-y-6">
      {/* Session Navigation Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Volver a la selección de partes"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-base">
                Parte {partNum}: {partInfo.name}
              </span>
              <span className="text-xs text-slate-400">({partInfo.nameEn})</span>
            </div>
            <span className="text-xs text-slate-500">
              {isPassageBased ? 'Pasaje' : 'Pregunta'} {currentIndex + 1} de {totalItems}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="hidden sm:flex items-center gap-3 w-48">
          <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.round(((currentIndex + 1) / totalItems) * 100)}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            {Math.round(((currentIndex + 1) / totalItems) * 100)}%
          </span>
        </div>
      </div>

      {/* Dynamic View by Part */}
      {partNum === 1 && currentPassage && (
        <Part1View
          passage={currentPassage}
          question={currentPassage.questions[0]}
          onNext={handleNext}
          isLast={isLast}
        />
      )}

      {partNum === 2 && currentQuestion && (
        <Part2View
          question={currentQuestion}
          onNext={handleNext}
          isLast={isLast}
        />
      )}

      {(partNum === 3 || partNum === 4) && currentPassage && (
        <Part3And4View
          passage={currentPassage}
          onNext={handleNext}
          isLast={isLast}
        />
      )}

      {partNum === 5 && currentQuestion && (
        <Part5View
          question={currentQuestion}
          onNext={handleNext}
          isLast={isLast}
        />
      )}

      {partNum === 6 && currentPassage && (
        <Part6View
          passage={currentPassage}
          onNext={handleNext}
          isLast={isLast}
        />
      )}

      {partNum === 7 && currentPassage && (
        <Part7View
          passage={currentPassage}
          onNext={handleNext}
          isLast={isLast}
        />
      )}
    </div>
  );
}
