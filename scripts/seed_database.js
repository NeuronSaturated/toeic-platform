/**
 * Direct Supabase Database Seeder
 * 
 * Usage:
 *   node scripts/seed_database.js
 * 
 * Requirements:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

const { createClient } = require('@supabase/supabase-js');

console.log('=== TOEIC Supabase Database Seeding Utility ===\n');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('[Notice] Supabase environment variables not found.');
  console.log('To seed directly to cloud Supabase:');
  console.log('  1. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your .env.local file');
  console.log('  2. Run: node scripts/seed_database.js\n');
  console.log('Alternatively, you can run the SQL schema migration in Supabase SQL Editor:');
  console.log('  -> supabase/migrations/01_schema.sql\n');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('[1/2] Seeding 7 TOEIC Parts metadata...');
  const parts = [
    { numero: 1, nombre: 'Fotografías', nombre_en: 'Photographs', seccion: 'listening', descripcion: 'Descripción de imágenes con 4 opciones de audio.', tiempo_sugerido_minutos: 5, icono: 'Camera' },
    { numero: 2, nombre: 'Pregunta - Respuesta', nombre_en: 'Question - Response', seccion: 'listening', descripcion: 'Audio puro con 3 opciones habladas sin texto en pantalla.', tiempo_sugerido_minutos: 10, icono: 'MessageSquareQuestion' },
    { numero: 3, nombre: 'Conversaciones', nombre_en: 'Conversations', seccion: 'listening', descripcion: 'Diálogos de 2-3 hablantes con 3 preguntas por audio.', tiempo_sugerido_minutos: 15, icono: 'Users' },
    { numero: 4, nombre: 'Charlas Breves', nombre_en: 'Short Talks', seccion: 'listening', descripcion: 'Monólogos profesionales con 3 preguntas por charla.', tiempo_sugerido_minutos: 15, icono: 'Radio' },
    { numero: 5, nombre: 'Oraciones Incompletas', nombre_en: 'Incomplete Sentences', seccion: 'reading', descripcion: 'Completar oraciones con opciones gramaticales y léxicas.', tiempo_sugerido_minutos: 15, icono: 'FileEdit' },
    { numero: 6, nombre: 'Texto Completado', nombre_en: 'Text Completion', seccion: 'reading', descripcion: 'Documentos empresariales con 4 espacios en blanco.', tiempo_sugerido_minutos: 12, icono: 'FileText' },
    { numero: 7, nombre: 'Comprensión de Lectura', nombre_en: 'Reading Comprehension', seccion: 'reading', descripcion: 'Pasajes individuales, dobles y triples con preguntas vinculadas.', tiempo_sugerido_minutos: 48, icono: 'BookOpen' }
  ];

  const { error: partErr } = await supabase.from('parts').upsert(parts, { onConflict: 'numero' });
  if (partErr) {
    console.error('Error seeding parts:', partErr.message);
  } else {
    console.log('✓ 7 TOEIC parts inserted/updated successfully.');
  }

  console.log('\n[2/2] Ready! The frontend automatically uses the internal 330+ exercise dataset.');
}

seed().catch(console.error);
