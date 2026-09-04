'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  RotateCcw, 
  AlertTriangle,
  Play,
  Volume2
} from 'lucide-react';
import { useTOEICStore } from '@/lib/store';
import { generateMockTestSet } from '@/lib/data/mock-data';
import { QuestionPalette } from '@/components/mock-test/QuestionPalette';
import { ScoreReport } from '@/components/mock-test/ScoreReport';
import { AudioPlayer } from '@/components/audio-player';

export default function MockTestPage() {
  const {
    mockTestActive,
    mockTestMode,
    mockTestTimeRemaining,
    mockTestAnswers,
    mockTestFlagged,
    mockTestCurrentIndex,
    mockTestCompleted,
    mockTestReport,
    startMockTest,
    setMockTestAnswer,
    toggleMockTestFlag,
    setMockTestCurrentIndex,
    tickMockTestTimer,
    finishMockTest,
    resetMockTest
  } = useTOEICStore();

  const [selectedExamType, setSelectedExamType] = useState<'quick' | 'full'>('quick');

  // Generate question set based on active mode
  const testItems = useMemo(() => {
    const set = generateMockTestSet(mockTestMode);
    return [...set.listeningQuestions, ...set.readingQuestions];
  }, [mockTestMode]);

  // Global Timer Tick Interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (mockTestActive && !mockTestCompleted) {
      interval = setInterval(() => {
        tickMockTestTimer();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mockTestActive, mockTestCompleted, tickMockTestTimer]);

  // Auto-finish when time reaches zero
  useEffect(() => {
    if (mockTestActive && mockTestTimeRemaining <= 0 && !mockTestCompleted) {
      finishMockTest(testItems);
    }
  }, [mockTestActive, mockTestTimeRemaining, mockTestCompleted, finishMockTest, testItems]);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // 1. Show Completed Score Report
  if (mockTestCompleted && mockTestReport) {
    return (
      <ScoreReport
        report={mockTestReport}
        questions={testItems}
        onRetry={resetMockTest}
      />
    );
  }

  // 2. Pre-Test Setup Screen
  if (!mockTestActive) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 py-6 animate-in fade-in-50">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
            <Clock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Simulador Oficial TOEIC®
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Experimenta el ritmo y la exigencia de un examen real cronometrado. Sin explicaciones intermedias y con cálculo oficial de puntaje (10 - 990).
          </p>
        </div>

        {/* Mode Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setSelectedExamType('quick')}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedExamType === 'quick'
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20 shadow-md'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
            }`}
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-bold mb-3">
              Recomendado para hoy
            </span>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Simulacro Rápido
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
              ~28 preguntas distribuidas en las 7 partes oficiales. Ideal para una sesión de 30 minutos.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>⏱️ 30 Minutos</span>
              <span>📝 ~28 Preguntas</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedExamType('full')}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedExamType === 'full'
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20 shadow-md'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
            }`}
          >
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-bold mb-3">
              Prueba Extensa
            </span>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Simulacro Completo
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
              100 preguntas (50 Listening + 50 Reading) con cronómetro estricto de 2 horas.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>⏱️ 120 Minutos</span>
              <span>📝 100 Preguntas</span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => startMockTest(selectedExamType)}
          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>Comenzar Examen Cronometrado</span>
        </button>
      </div>
    );
  }

  // 3. Active Exam Session
  const currentItem = testItems[mockTestCurrentIndex];
  if (!currentItem) return null;

  const currentQ = currentItem.question;
  const currentPassage = currentItem.passage;
  const isFlagged = Boolean(mockTestFlagged[currentQ.id]);
  const currentAnswer = mockTestAnswers[currentQ.id];

  const handleSelectAnswer = (key: 'A' | 'B' | 'C' | 'D') => {
    setMockTestAnswer(currentQ.id, key);
  };

  const handleFinishConfirm = () => {
    const unansweredCount = testItems.length - Object.keys(mockTestAnswers).length;
    if (unansweredCount > 0) {
      if (confirm(`Tienes ${unansweredCount} preguntas sin responder. ¿Deseas finalizar y calcular tu puntaje ahora?`)) {
        finishMockTest(testItems);
      }
    } else {
      finishMockTest(testItems);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Test Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
            <span>Pregunta {mockTestCurrentIndex + 1} de {testItems.length}</span>
            <span>• Parte {currentQ.partNumber}</span>
          </div>

          <button
            onClick={() => toggleMockTestFlag(currentQ.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
              isFlagged
                ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 text-amber-800 dark:text-amber-200'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isFlagged ? 'Marcada para revisar' : 'Marcar para revisar'}</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Real Countdown Timer */}
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-mono font-bold text-sm border ${
            mockTestTimeRemaining < 300
              ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300 animate-pulse'
              : 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-900 dark:text-blue-300'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTimer(mockTestTimeRemaining)}</span>
          </div>

          <button
            onClick={handleFinishConfirm}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all"
          >
            Finalizar Examen
          </button>
        </div>
      </div>

      {/* Main Grid: Question Content & Question Palette Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Question Display */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Media Context if available (Audio, Image, Reading Passage) */}
          {currentPassage && (
            <div className="space-y-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              {currentPassage.contentUrl && currentQ.partNumber === 1 && (
                <div className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={currentPassage.contentUrl}
                    alt="TOEIC Question Photography"
                    className="w-full h-64 object-cover object-center"
                  />
                </div>
              )}

              {/* Audio Player in Mock Mode */}
              {currentQ.partNumber <= 4 && (
                <AudioPlayer
                  audioScript={currentQ.audioScript || currentPassage.transcriptHidden}
                  isMockMode={true}
                  autoPlay={true}
                />
              )}

              {/* Reading Passage in Mock Mode */}
              {currentQ.partNumber >= 6 && currentPassage.textContent && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-serif max-h-72 overflow-y-auto whitespace-pre-line">
                  {currentPassage.textContent}
                  {currentPassage.secondTextContent && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                      {currentPassage.secondTextContent}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Part 2: Audio Only notice */}
          {currentQ.partNumber === 2 && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 text-xs flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <span>Escucha la pregunta y elige la mejor respuesta hablada (A, B o C).</span>
            </div>
          )}

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Pregunta #{mockTestCurrentIndex + 1}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.questionText}
            </h3>
          </div>

          {/* 4 (or 3) Option Buttons */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = currentAnswer === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSelectAnswer(opt.key)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between text-sm transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 font-bold ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {opt.key}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Previous / Next Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setMockTestCurrentIndex(Math.max(0, mockTestCurrentIndex - 1))}
              disabled={mockTestCurrentIndex === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={() => setMockTestCurrentIndex(Math.min(testItems.length - 1, mockTestCurrentIndex + 1))}
              disabled={mockTestCurrentIndex === testItems.length - 1}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 text-white text-sm font-semibold flex items-center gap-1 disabled:opacity-40"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Question Navigation Palette */}
        <div className="lg:col-span-4">
          <QuestionPalette
            totalQuestions={testItems.length}
            currentIndex={mockTestCurrentIndex}
            answers={mockTestAnswers}
            flagged={mockTestFlagged}
            questionIds={testItems.map(item => item.question.id)}
            onSelectQuestion={(idx) => setMockTestCurrentIndex(idx)}
          />
        </div>
      </div>
    </div>
  );
}
