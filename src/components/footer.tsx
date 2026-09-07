import React from 'react';
import Link from 'next/link';
import { Sparkles, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 transition-colors mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                TOEIC Master
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm">
              Plataforma integral de preparación para el examen TOEIC® con las 7 partes oficiales, modo simulacro cronometrado, centro de repaso con repetición espaciada y analítica de desempeño.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Award className="w-4 h-4 text-blue-500" />
              <span>Escala oficial calibrada de 10 a 990 puntos (Listening & Reading)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Módulos de Estudio
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Práctica por Partes (1-7)</Link></li>
              <li><Link href="/study" className="hover:text-blue-600 transition-colors">Guía de Estudio & Verbos</Link></li>
              <li><Link href="/mock-test" className="hover:text-blue-600 transition-colors">Simulacro Oficial (Mock Test)</Link></li>
              <li><Link href="/review-bank" className="hover:text-blue-600 transition-colors">Centro de Repaso</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-600 transition-colors">Mi Progreso</Link></li>
            </ul>
          </div>

          {/* Integration & Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Repositorio & Despliegue
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="https://github.com/NeuronSaturated"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub @NeuronSaturated</span>
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Compatible con Supabase y optimizado para despliegue en Vercel.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-850 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TOEIC Master Platform. Todo el contenido generado y calibrado para fines de práctica académica.</p>
          <p className="mt-2 sm:mt-0">TOEIC® es una marca registrada de ETS. Este sitio no está afiliado ni respaldado por ETS.</p>
        </div>
      </div>
    </footer>
  );
};
