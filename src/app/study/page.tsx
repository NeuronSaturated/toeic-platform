'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Lightbulb, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  ArrowRight,
  Clock,
  Sparkles,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { GRAMMAR_RULES, VOCABULARY_TOPICS, EXAM_STRATEGIES, GrammarRule, VocabularyTopic, ExamStrategy } from '@/lib/study-data';
import { audioEngine } from '@/lib/audio-synth';

export default function StudyGuidePage() {
  const [activeTab, setActiveTab] = useState<'grammar' | 'vocabulary' | 'strategies'>('grammar');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  const handlePlayAudio = (text: string) => {
    setPlayingWord(text);
    audioEngine.play(undefined, text).then(() => {
      setPlayingWord(null);
    });
  };

  // Filter grammar rules
  const filteredGrammar = GRAMMAR_RULES.filter(rule => 
    rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.explanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter vocabulary
  const filteredVocabulary = VOCABULARY_TOPICS.map(topic => ({
    ...topic,
    terms: topic.terms.filter(term => 
      term.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.meaningEs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.collocations.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(topic => topic.terms.length > 0 || topic.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Filter strategies
  const filteredStrategies = EXAM_STRATEGIES.filter(strategy => 
    strategy.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    strategy.goldenRule.toLowerCase().includes(searchQuery.toLowerCase()) ||
    strategy.commonTraps.some(trap => trap.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500 max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-8 sm:p-10 shadow-xl shadow-blue-500/10">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100">
            <GraduationCap className="w-4 h-4" />
            <span>Centro de Estudio & Reglas Oficiales</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Aprende la Gramática, Vocabulario y Trampas del TOEIC®
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            No solo practiques ejercicios: domina las reglas que definen las respuestas correctas, 
            las colocaciones comerciales indispensables y los métodos para no caer en las trampas del examen.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative z-10 mt-6 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar regla gramatical, palabra de vocabulario, conector o parte..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium shadow-lg border-0 focus:ring-4 focus:ring-blue-300 transition-all outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full sm:w-fit overflow-x-auto">
        <button
          onClick={() => setActiveTab('grammar')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'grammar'
              ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Reglas Gramaticales ({GRAMMAR_RULES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vocabulary')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'vocabulary'
              ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Vocabulario de Negocios</span>
        </button>

        <button
          onClick={() => setActiveTab('strategies')}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeTab === 'strategies'
              ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Estrategias & Trampas ({EXAM_STRATEGIES.length})</span>
        </button>
      </div>

      {/* TAB 1: GRAMMAR RULES */}
      {activeTab === 'grammar' && (
        <div className="space-y-6">
          {filteredGrammar.map((rule) => (
            <div 
              key={rule.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {rule.titleEn}
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {rule.title}
                  </h2>
                </div>
                <div className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold w-fit">
                  Evaluado en Partes 5 y 6
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {rule.explanation}
              </p>

              {/* Key Formula */}
              {rule.keyFormula && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 font-sans block mb-1">Estructura Clave:</span>
                  {rule.keyFormula}
                </div>
              )}

              {/* Examples (Correct vs Incorrect) */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Ejemplos Contextualizados TOEIC:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rule.examples.map((ex, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs"
                    >
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{ex.correct}</span>
                        </div>
                        <button
                          onClick={() => handlePlayAudio(ex.correct)}
                          className="p-1 rounded-md text-slate-400 hover:text-blue-600 transition-colors"
                          title="Escuchar pronunciación"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${playingWord === ex.correct ? 'text-blue-600 animate-pulse' : ''}`} />
                        </button>
                      </div>

                      {ex.incorrect && (
                        <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span className="line-through">{ex.incorrect}</span>
                        </div>
                      )}

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/50 dark:border-slate-800/50 leading-relaxed">
                        {ex.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOEIC Secret Tip */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">Tip Clave para el Examen:</strong>
                  <span>{rule.toeicTip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: BUSINESS VOCABULARY */}
      {activeTab === 'vocabulary' && (
        <div className="space-y-8">
          {filteredVocabulary.map((topic) => (
            <div 
              key={topic.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {topic.titleEn}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {topic.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {topic.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topic.terms.map((term, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900 dark:text-white">
                          {term.word}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {term.partOfSpeech}
                        </span>
                      </div>
                      <button
                        onClick={() => handlePlayAudio(term.word)}
                        className="p-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-500 hover:text-blue-600 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
                        title="Escuchar palabra"
                      >
                        <Volume2 className={`w-4 h-4 ${playingWord === term.word ? 'text-blue-600 animate-pulse' : ''}`} />
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                      💡 {term.meaningEs}
                    </p>

                    {/* Collocations */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Colocaciones habituales:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {term.collocations.map((col, cIdx) => (
                          <span 
                            key={cIdx}
                            className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-[11px] font-medium border border-indigo-100 dark:border-indigo-900/40"
                          >
                            {col}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Example Sentence */}
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 text-xs text-slate-600 dark:text-slate-300 italic flex items-center justify-between gap-2">
                      <span>&ldquo;{term.example}&rdquo;</span>
                      <button
                        onClick={() => handlePlayAudio(term.example)}
                        className="p-1 text-slate-400 hover:text-blue-600 shrink-0"
                        title="Escuchar oración completa"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: EXAM STRATEGIES & TRAPS */}
      {activeTab === 'strategies' && (
        <div className="space-y-6">
          {filteredStrategies.map((strat) => (
            <div 
              key={strat.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {strat.section === 'listening' ? 'Sección de Listening' : 'Sección de Reading'}
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Parte {strat.partNumber}: {strat.partName}
                  </h2>
                </div>

                <Link
                  href={`/practice/${strat.partNumber}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all w-fit"
                >
                  <span>Practicar Parte {strat.partNumber}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Golden Rule */}
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">Regla de Oro:</strong>
                  <span className="text-sm font-semibold text-blue-950 dark:text-blue-100">{strat.goldenRule}</span>
                </div>
              </div>

              {/* Common Traps */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <span>Trampas Frecuentes de los Creadores del Examen:</span>
                </span>
                <ul className="space-y-2">
                  {strat.commonTraps.map((trap, tIdx) => (
                    <li 
                      key={tIdx}
                      className="p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by Step Tactics */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Táctica Paso a Paso:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {strat.tactics.map((tactic, tIdx) => (
                    <div 
                      key={tIdx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
                    >
                      <span className="font-bold text-blue-600 dark:text-blue-400 block">
                        {tactic.step}
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {tactic.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Management */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-4 h-4 text-slate-400" />
                <span><strong>Gestión del Tiempo:</strong> {strat.timeManagement}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
