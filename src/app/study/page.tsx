'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  GraduationCap, 
  Search, 
  CheckCircle2, 
  Volume2, 
  ArrowRight,
  Clock,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  Lightbulb,
  Layers,
  Filter,
  VolumeX,
  Award,
  Check
} from 'lucide-react';
import { 
  GRAMMAR_RULES, 
  VOCABULARY_TOPICS, 
  HOMOPHONES_LIST, 
  EXAM_STRATEGIES,
  GrammarRule,
  VocabularyTopic,
  HomophoneItem,
  ExamStrategy
} from '@/lib/study-data';
import { TOEIC_VERBS, VerbItem } from '@/lib/verbs-data';
import { audioEngine } from '@/lib/audio-synth';

export default function StudyGuidePage() {
  const [activeTab, setActiveTab] = useState<'grammar' | 'vocabulary' | 'verbs' | 'strategies'>('grammar');
  const [vocabSubTab, setVocabSubTab] = useState<'general' | 'homophones'>('general');
  const [verbsFilter, setVerbsFilter] = useState<'all' | 'irregular' | 'regular'>('all');
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

  // Filter general vocabulary
  const filteredVocabulary = VOCABULARY_TOPICS.map(topic => ({
    ...topic,
    terms: topic.terms.filter(term => 
      term.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.meaningEs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.collocations.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(topic => topic.terms.length > 0 || topic.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Filter homophones
  const filteredHomophones = HOMOPHONES_LIST.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.pairs.some(p => p.word.toLowerCase().includes(searchQuery.toLowerCase()) || p.meaningEs.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter verbs
  const filteredVerbs = TOEIC_VERBS.filter(verb => {
    const matchesSearch = 
      verb.infinitive.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verb.pastSimple.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verb.pastParticiple.toLowerCase().includes(searchQuery.toLowerCase()) ||
      verb.spanish.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (verbsFilter === 'irregular') return verb.type === 'irregular';
    if (verbsFilter === 'regular') return verb.type === 'regular';
    return true;
  });

  // Filter strategies
  const filteredStrategies = EXAM_STRATEGIES.filter(strategy => 
    strategy.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    strategy.goldenRule.toLowerCase().includes(searchQuery.toLowerCase()) ||
    strategy.commonTraps.some(trap => trap.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500 pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-8 sm:p-12 shadow-xl shadow-blue-500/10">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100">
            <GraduationCap className="w-4 h-4" />
            <span>Guía de Estudio Oficial • Estilo EF English Live</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Guía Gramatical, Vocabulario y Tabla de Verbos
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-2xl">
            Estructuras comparativas claras, términos de alta frecuencia, palabras homófonas que son trampas en el audio y más de 100 verbos regulares e irregulares para dominar el TOEIC®.
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
              placeholder="Buscar regla gramatical, verbo, homófono o parte..."
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
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('grammar')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'grammar'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Reglas Gramaticales ({GRAMMAR_RULES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vocabulary')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'vocabulary'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Vocabulario & Homófonos</span>
        </button>

        <button
          onClick={() => setActiveTab('verbs')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'verbs'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Tabla de Verbos ({TOEIC_VERBS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('strategies')}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'strategies'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          <span>Estrategias & Trampas ({EXAM_STRATEGIES.length})</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 1. REGLAS GRAMATICALES (ESTILO EF ENGLISH LIVE)           */}
      {/* ========================================================= */}
      {activeTab === 'grammar' && (
        <div className="space-y-10">
          {filteredGrammar.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No se encontraron reglas que coincidan con "{searchQuery}".
            </div>
          ) : (
            filteredGrammar.map((rule) => (
              <div 
                key={rule.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-6 hover:shadow-md transition-shadow"
              >
                {/* Rule Title & Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {rule.titleEn}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {rule.title}
                    </h2>
                  </div>
                  <span className="self-start sm:self-auto text-xs px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-900/50">
                    Evaluado en Partes 5 y 6
                  </span>
                </div>

                {/* Explanation text */}
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {rule.explanation}
                </p>

                {/* EF-Style Comparative Table */}
                {rule.comparisonTable && (
                  <div className="bg-slate-50/80 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-4 sm:p-6 space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Compara lo siguiente:</span>
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold bg-slate-100/70 dark:bg-slate-800/70">
                            <th className="py-3 px-4 rounded-tl-xl">{rule.comparisonTable.headerA}</th>
                            <th className="py-3 px-4">{rule.comparisonTable.headerB}</th>
                            <th className="py-3 px-4 rounded-tr-xl hidden sm:table-cell text-xs uppercase text-slate-500">Distinción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {rule.comparisonTable.rows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white dark:hover:bg-slate-800/40 transition-colors">
                              <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                                {row.colA}
                              </td>
                              <td className="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">
                                {row.colB}
                              </td>
                              <td className="py-3 px-4 text-xs text-slate-500 hidden sm:table-cell italic">
                                {row.note}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* EF-Style Attitude / Subtle Nuance Explanation */}
                {rule.attitudeExplanation && (
                  <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
                    <strong className="block font-semibold mb-1 text-amber-900 dark:text-amber-100">
                      💡 Diferencia en cuanto a la actitud vs factor temporal:
                    </strong>
                    {rule.attitudeExplanation}
                  </div>
                )}

                {/* Key Formula */}
                {rule.keyFormula && (
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500 uppercase tracking-wide block mb-1">Estructura Clave:</span>
                    {rule.keyFormula}
                  </div>
                )}

                {/* Practical Examples */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Ejemplos Contextualizados TOEIC:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rule.examples.map((ex, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              {ex.correct}
                            </p>
                          </div>
                          <button
                            onClick={() => handlePlayAudio(ex.correct)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-slate-700 shrink-0"
                            title="Escuchar pronunciación"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {ex.incorrect && (
                          <div className="flex items-start gap-2 text-xs text-rose-500 line-through pl-6">
                            <span>{ex.incorrect}</span>
                          </div>
                        )}

                        <p className="text-xs text-slate-500 dark:text-slate-400 pl-6 pt-1 border-t border-slate-100 dark:border-slate-800">
                          {ex.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Golden TOEIC Tip */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                      Tip Clave para el Examen:
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                      {rule.toeicTip}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. VOCABULARIO GENERAL & HOMÓFONOS (CONFUSING WORDS)      */}
      {/* ========================================================= */}
      {activeTab === 'vocabulary' && (
        <div className="space-y-6">
          {/* Subtabs for Vocab */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setVocabSubTab('general')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                vocabSubTab === 'general'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Vocabulario General de Alta Frecuencia
            </button>
            <button
              onClick={() => setVocabSubTab('homophones')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                vocabSubTab === 'homophones'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Palabras Homófonas & Confusing Words ({HOMOPHONES_LIST.length})
            </button>
          </div>

          {vocabSubTab === 'general' ? (
            <div className="space-y-8">
              {filteredVocabulary.map((topic) => (
                <div 
                  key={topic.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
                >
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {topic.titleEn}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {topic.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topic.terms.map((term, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                              {term.word}
                            </h4>
                            <span className="text-[11px] font-mono text-slate-400">
                              {term.partOfSpeech}
                            </span>
                          </div>
                          <button
                            onClick={() => handlePlayAudio(term.word)}
                            className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-slate-700"
                            title="Escuchar"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {term.phonetic && (
                          <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                            {term.phonetic}
                          </div>
                        )}

                        <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          {term.meaningEs}
                        </div>

                        {term.collocations.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {term.collocations.map((c, cIdx) => (
                              <span key={cIdx} className="text-[10px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-medium">
                                {c}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-1 border-t border-slate-100 dark:border-slate-800">
                          "{term.example}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Homophones view
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHomophones.map((hom) => (
                <div 
                  key={hom.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white">
                        {hom.title}
                      </h4>
                      <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
                        Pronunciación: {hom.phonetic}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40">
                      Trampa Auditiva
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {hom.explanation}
                  </p>

                  <div className="space-y-2">
                    {hom.pairs.map((p, pIdx) => (
                      <div key={pIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {p.word} <span className="text-[11px] font-normal text-slate-400">({p.partOfSpeech})</span>
                          </span>
                          <button
                            onClick={() => handlePlayAudio(p.word)}
                            className="p-1 rounded text-slate-400 hover:text-blue-600"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {p.meaningEs}
                        </div>
                        <div className="text-xs text-slate-500 italic">
                          "{p.example}"
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200">
                    <strong>⚠️ Cómo la usa el TOEIC:</strong> {hom.trapWarning}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. TABLA DE VERBOS (REGULARES E IRREGULARES 100+)         */}
      {/* ========================================================= */}
      {activeTab === 'verbs' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Tabla de Verbos Clave para el TOEIC®
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Aprende el infinitivo, pasado simple y participio pasado con significado y pronunciación integrada.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVerbsFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  verbsFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Todos ({TOEIC_VERBS.length})
              </button>
              <button
                onClick={() => setVerbsFilter('irregular')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  verbsFilter === 'irregular'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Irregulares ({TOEIC_VERBS.filter(v => v.type === 'irregular').length})
              </button>
              <button
                onClick={() => setVerbsFilter('regular')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  verbsFilter === 'regular'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Regulares ({TOEIC_VERBS.filter(v => v.type === 'regular').length})
              </button>
            </div>
          </div>

          {/* Verbs Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold bg-slate-50 dark:bg-slate-850">
                  <th className="py-3 px-4 rounded-tl-xl">Infinitive (Base)</th>
                  <th className="py-3 px-4">Past Simple</th>
                  <th className="py-3 px-4">Past Participle</th>
                  <th className="py-3 px-4">Significado (Español)</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4 rounded-tr-xl hidden lg:table-cell">Ejemplo Contextual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredVerbs.map((verb, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <button
                        onClick={() => handlePlayAudio(verb.infinitive)}
                        className="p-1 rounded text-slate-400 hover:text-blue-600 shrink-0"
                        title="Pronunciar verbo"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span>{verb.infinitive}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                      {verb.pastSimple}
                    </td>
                    <td className="py-3 px-4 font-medium text-blue-600 dark:text-blue-400">
                      {verb.pastParticiple}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      {verb.spanish}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        verb.type === 'irregular'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {verb.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500 italic hidden lg:table-cell max-w-xs truncate" title={verb.example}>
                      "{verb.example}"
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. ESTRATEGIAS OFICIALES & TRAMPAS DE EXAMEN              */}
      {/* ========================================================= */}
      {activeTab === 'strategies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStrategies.map((strategy) => (
            <div 
              key={strategy.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {strategy.section === 'listening' ? '🎧 Sección Listening' : '📖 Sección Reading'}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Parte {strategy.partNumber}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {strategy.partName}
              </h3>

              {/* Golden Rule Badge */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-300 dark:border-amber-700/50 space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Regla de Oro Indispensable
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                  {strategy.goldenRule}
                </p>
              </div>

              {/* Traps */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  Trampas Comunes de ETS:
                </span>
                <div className="space-y-1.5">
                  {strategy.commonTraps.map((trap, tIdx) => (
                    <div key={tIdx} className="p-2.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{trap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tactics Steps */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Táctica de Resolución Paso a Paso:
                </span>
                <div className="space-y-2">
                  {strategy.tactics.map((tactic, tacIdx) => (
                    <div key={tacIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {tacIdx + 1}
                      </span>
                      <div>
                        <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                          {tactic.step}
                        </strong>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          {tactic.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time management */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 text-xs text-blue-900 dark:text-blue-200 border border-blue-100 dark:border-blue-900/40">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Gestión de Tiempo:</strong> {strategy.timeManagement}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
