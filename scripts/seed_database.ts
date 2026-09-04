/**
 * TOEIC Preparation Platform - Comprehensive Supabase Database Seeder
 * 
 * Functions:
 * 1. Generates `supabase/migrations/02_seed.sql` with all 7 Parts, Passages, and 333+ Questions.
 * 2. Seeds live Supabase database via Supabase JS Client when credentials are provided.
 * 
 * Usage:
 *   npx tsx scripts/seed_database.ts [--sql-only] [--live-only]
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { TOEIC_PARTS } from '../src/lib/parts-meta';
import { 
  PART1_PASSAGES, 
  PART2_QUESTIONS, 
  PART3_PASSAGES, 
  PART4_PASSAGES, 
  PART5_QUESTIONS, 
  PART6_PASSAGES, 
  PART7_PASSAGES 
} from '../src/lib/data/mock-data';
import { Passage, Question } from '../src/lib/types';

console.log('====================================================');
console.log('   TOEIC Full-Stack Database Seeding Service        ');
console.log('====================================================\n');

const isSqlOnly = process.argv.includes('--sql-only');
const isLiveOnly = process.argv.includes('--live-only');

// Collect all passages and questions
const allPassages: Passage[] = [
  ...PART1_PASSAGES,
  ...PART3_PASSAGES,
  ...PART4_PASSAGES,
  ...PART6_PASSAGES,
  ...PART7_PASSAGES
];

const allQuestions: Question[] = [
  ...PART1_PASSAGES.flatMap(p => p.questions),
  ...PART2_QUESTIONS,
  ...PART3_PASSAGES.flatMap(p => p.questions),
  ...PART4_PASSAGES.flatMap(p => p.questions),
  ...PART5_QUESTIONS,
  ...PART6_PASSAGES.flatMap(p => p.questions),
  ...PART7_PASSAGES.flatMap(p => p.questions)
];

console.log(`[Dataset Statistics]`);
console.log(` - TOEIC Parts:     7 official parts`);
console.log(` - Total Passages:  ${allPassages.length} passages (Parts 1, 3, 4, 6, 7)`);
console.log(` - Total Questions: ${allQuestions.length} complete items with explanations`);
console.log('----------------------------------------------------\n');

// -----------------------------------------------------------------------------
// 1. Generate supabase/migrations/02_seed.sql
// -----------------------------------------------------------------------------
function generateSeedSql(): string {
  const lines: string[] = [
    '-- ==============================================================================',
    '-- TOEIC Preparation Platform - Database Seed Data',
    '-- Migration: 02_seed.sql',
    `-- Total Questions: ${allQuestions.length} across all 7 Parts`,
    '-- ==============================================================================\n',
    'BEGIN;\n',
    '-- 1. Insert 7 TOEIC Parts',
    'INSERT INTO public.parts (id, numero, nombre, nombre_en, seccion, descripcion, tiempo_sugerido_minutos, icono) VALUES'
  ];

  const partRows = TOEIC_PARTS.map(p => {
    const desc = p.description.replace(/'/g, "''");
    return `  (${p.id}, ${p.partNumber}, '${p.name}', '${p.nameEn}', '${p.section}', '${desc}', ${p.timeAdviceMinutes}, '${p.iconName}')`;
  });
  lines.push(partRows.join(',\n') + '\nON CONFLICT (numero) DO UPDATE SET\n  nombre = EXCLUDED.nombre,\n  descripcion = EXCLUDED.descripcion;\n');

  // Passages
  lines.push('-- 2. Insert Passages (Part 1, 3, 4, 6, 7)');
  lines.push('INSERT INTO public.passages (id, part_id, tipo, titulo, contenido_url, contenido_texto, segundo_texto, tercer_texto, transcript_oculto) VALUES');

  const escapeSql = (str?: string) => {
    if (!str) return 'NULL';
    return `'${str.replace(/'/g, "''")}'`;
  };

  const passageRows = allPassages.map(p => {
    return `  ('${p.id}', ${p.partNumber}, '${p.type}', ${escapeSql(p.title)}, ${escapeSql(p.contentUrl)}, ${escapeSql(p.textContent)}, ${escapeSql(p.secondTextContent)}, ${escapeSql(p.thirdTextContent)}, ${escapeSql(p.transcriptHidden)})`;
  });
  lines.push(passageRows.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET\n  titulo = EXCLUDED.titulo,\n  contenido_url = EXCLUDED.contenido_url,\n  contenido_texto = EXCLUDED.contenido_texto,\n  transcript_oculto = EXCLUDED.transcript_oculto;\n');

  // Questions in chunks to avoid single query limits
  lines.push('-- 3. Insert Questions (Parts 1 to 7)');
  const CHUNK_SIZE = 50;
  for (let i = 0; i < allQuestions.length; i += CHUNK_SIZE) {
    const chunk = allQuestions.slice(i, i + CHUNK_SIZE);
    lines.push('INSERT INTO public.questions (id, passage_id, part_id, numero_pregunta, enunciado, opciones, respuesta_correcta, explicacion, subtema, dificultad, audio_script) VALUES');
    
    const questionRows = chunk.map(q => {
      const passageIdVal = q.passageId ? `'${q.passageId}'` : 'NULL';
      const qNumVal = q.questionNumber ? q.questionNumber : 'NULL';
      const enunciadoEsc = escapeSql(q.questionText);
      const opcionesJson = escapeSql(JSON.stringify(q.options));
      const expEsc = escapeSql(q.explanation);
      const subEsc = escapeSql(q.subtheme);
      const scriptEsc = escapeSql(q.audioScript);

      return `  ('${q.id}', ${passageIdVal}, ${q.partNumber}, ${qNumVal}, ${enunciadoEsc}, ${opcionesJson}::jsonb, '${q.correctAnswer}', ${expEsc}, ${subEsc}, '${q.difficulty}', ${scriptEsc})`;
    });

    lines.push(questionRows.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET\n  enunciado = EXCLUDED.enunciado,\n  opciones = EXCLUDED.opciones,\n  respuesta_correcta = EXCLUDED.respuesta_correcta,\n  explicacion = EXCLUDED.explicacion;\n');
  }

  lines.push('COMMIT;\n');
  return lines.join('\n');
}

// -----------------------------------------------------------------------------
// 2. Direct Supabase Live Seeding
// -----------------------------------------------------------------------------
async function seedSupabaseLive() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
    console.log('[Notice] Supabase live credentials not configured in environment.');
    console.log(' -> NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required.');
    console.log(' -> Generated SQL migration file can be executed directly in Supabase SQL Editor!\n');
    return;
  }

  console.log(`[Supabase Live] Connecting to ${supabaseUrl}...`);
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. Seed Parts
  console.log(' -> Seeding 7 TOEIC Parts...');
  const { error: partErr } = await supabase.from('parts').upsert(
    TOEIC_PARTS.map(p => ({
      id: p.id,
      numero: p.partNumber,
      nombre: p.name,
      nombre_en: p.nameEn,
      seccion: p.section,
      descripcion: p.description,
      tiempo_sugerido_minutos: p.timeAdviceMinutes,
      icono: p.iconName
    })),
    { onConflict: 'numero' }
  );
  if (partErr) console.error('    Error in parts:', partErr.message);
  else console.log('    ✓ 7 Parts upserted successfully.');

  // 2. Seed Passages
  console.log(` -> Seeding ${allPassages.length} Passages...`);
  const { error: passErr } = await supabase.from('passages').upsert(
    allPassages.map(p => ({
      id: p.id,
      part_id: p.partNumber,
      tipo: p.type,
      titulo: p.title,
      contenido_url: p.contentUrl,
      contenido_texto: p.textContent,
      segundo_texto: p.secondTextContent,
      tercer_texto: p.thirdTextContent,
      transcript_oculto: p.transcriptHidden
    })),
    { onConflict: 'id' }
  );
  if (passErr) console.error('    Error in passages:', passErr.message);
  else console.log(`    ✓ ${allPassages.length} Passages upserted successfully.`);

  // 3. Seed Questions in chunks
  console.log(` -> Seeding ${allQuestions.length} Questions...`);
  const CHUNK_SIZE = 50;
  let insertedCount = 0;
  for (let i = 0; i < allQuestions.length; i += CHUNK_SIZE) {
    const chunk = allQuestions.slice(i, i + CHUNK_SIZE);
    const { error: qErr } = await supabase.from('questions').upsert(
      chunk.map(q => ({
        id: q.id,
        passage_id: q.passageId || null,
        part_id: q.partNumber,
        numero_pregunta: q.questionNumber || null,
        enunciado: q.questionText,
        opciones: q.options,
        respuesta_correcta: q.correctAnswer,
        explicacion: q.explanation,
        subtema: q.subtheme,
        dificultad: q.difficulty,
        audio_script: q.audioScript || null
      })),
      { onConflict: 'id' }
    );
    if (qErr) {
      console.error(`    Error in questions chunk ${i}:`, qErr.message);
    } else {
      insertedCount += chunk.length;
    }
  }
  console.log(`    ✓ ${insertedCount}/${allQuestions.length} Questions upserted successfully.`);
}

async function main() {
  if (!isLiveOnly) {
    console.log('[Step 1] Generating SQL migration: supabase/migrations/02_seed.sql...');
    const sqlContent = generateSeedSql();
    const outputPath = path.join(__dirname, '../supabase/migrations/02_seed.sql');
    fs.writeFileSync(outputPath, sqlContent, 'utf8');
    const stats = fs.statSync(outputPath);
    console.log(`✓ 02_seed.sql created successfully (${Math.round(stats.size / 1024)} KB, ${allQuestions.length} questions).\n`);
  }

  if (!isSqlOnly) {
    console.log('[Step 2] Executing live database seeding...');
    await seedSupabaseLive();
  }

  console.log('\n====================================================');
  console.log('   Seeding Process Completed Successfully!          ');
  console.log('====================================================');
}

main().catch(console.error);
