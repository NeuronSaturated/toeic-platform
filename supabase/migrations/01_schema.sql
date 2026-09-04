-- ==============================================================================
-- TOEIC Preparation Platform - Supabase PostgreSQL Schema
-- Migration: 01_schema.sql
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL DEFAULT 'Estudiante TOEIC',
    nivel_actual TEXT DEFAULT 'Básico',
    puntaje_meta INTEGER DEFAULT 800,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Parts Table (7 Official TOEIC Parts)
CREATE TABLE IF NOT EXISTS public.parts (
    id SERIAL PRIMARY KEY,
    numero INTEGER NOT NULL UNIQUE CHECK (numero BETWEEN 1 AND 7),
    nombre TEXT NOT NULL,
    nombre_en TEXT NOT NULL,
    seccion TEXT NOT NULL CHECK (seccion IN ('listening', 'reading')),
    descripcion TEXT,
    tiempo_sugerido_minutos INTEGER DEFAULT 15,
    icono TEXT DEFAULT 'BookOpen'
);

-- 3. Passages Table (Group containers for Audios, Texts, Double/Triple Passages)
CREATE TABLE IF NOT EXISTS public.passages (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    part_id INTEGER NOT NULL REFERENCES public.parts(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL CHECK (tipo IN ('image', 'audio', 'text', 'image_and_audio', 'double_passage', 'triple_passage')),
    titulo TEXT,
    contenido_url TEXT, -- URL to Supabase Storage MP3 or Image
    contenido_texto TEXT, -- Main text for reading or dialogue summary
    segundo_texto TEXT, -- For double passages
    tercer_texto TEXT, -- For triple passages
    transcript_oculto TEXT, -- Hidden audio transcript revealed during review
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    passage_id TEXT REFERENCES public.passages(id) ON DELETE CASCADE,
    part_id INTEGER NOT NULL REFERENCES public.parts(id) ON DELETE CASCADE,
    numero_pregunta INTEGER,
    enunciado TEXT NOT NULL,
    opciones JSONB NOT NULL, -- Array of objects: [{"key": "A", "text": "..."}, ...]
    respuesta_correcta CHAR(1) NOT NULL CHECK (respuesta_correcta IN ('A', 'B', 'C', 'D')),
    explicacion TEXT NOT NULL,
    subtema TEXT NOT NULL, -- e.g. 'Tiempos verbales', 'Preposiciones', 'Vocabulario comercial'
    dificultad TEXT NOT NULL CHECK (dificultad IN ('easy', 'medium', 'hard')),
    audio_script TEXT, -- Spoken audio line for Parts 1 & 2
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Exam / Practice Attempts
CREATE TABLE IF NOT EXISTS public.attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('practica', 'simulacro')),
    part_id INTEGER REFERENCES public.parts(id) ON DELETE SET NULL, -- NULL if full mock test
    total_preguntas INTEGER NOT NULL DEFAULT 0,
    aciertos INTEGER NOT NULL DEFAULT 0,
    puntaje_listening INTEGER, -- Scaled 5 - 495
    puntaje_reading INTEGER,   -- Scaled 5 - 495
    puntaje_total INTEGER,     -- Scaled 10 - 990
    tiempo_segundos INTEGER NOT NULL DEFAULT 0,
    iniciado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    finalizado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Attempt Answers Detail
CREATE TABLE IF NOT EXISTS public.attempt_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES public.attempts(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    respuesta_usuario CHAR(1) NOT NULL CHECK (respuesta_usuario IN ('A', 'B', 'C', 'D')),
    es_correcta BOOLEAN NOT NULL,
    tiempo_respuesta_segundos INTEGER DEFAULT 0
);

-- 7. User Aggregate Stats
CREATE TABLE IF NOT EXISTS public.user_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    part_id INTEGER NOT NULL REFERENCES public.parts(id) ON DELETE CASCADE,
    subtema TEXT NOT NULL,
    total_intentadas INTEGER NOT NULL DEFAULT 0,
    total_acertadas INTEGER NOT NULL DEFAULT 0,
    porcentaje_acierto NUMERIC(5,2) GENERATED ALWAYS AS (
        CASE WHEN total_intentadas > 0 THEN ROUND((total_acertadas::numeric / total_intentadas::numeric) * 100, 2) ELSE 0 END
    ) STORED,
    ultima_practica TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, part_id, subtema)
);

-- 8. Review Bank / Error Vault (Preguntas falladas para repaso)
CREATE TABLE IF NOT EXISTS public.review_bank (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    veces_fallada INTEGER NOT NULL DEFAULT 1,
    aciertos_consecutivos INTEGER NOT NULL DEFAULT 0,
    dominado BOOLEAN NOT NULL DEFAULT false,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, question_id)
);

-- ==============================================================================
-- Performance Indexes
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_passages_part_id ON public.passages(part_id);
CREATE INDEX IF NOT EXISTS idx_questions_part_id ON public.questions(part_id);
CREATE INDEX IF NOT EXISTS idx_questions_passage_id ON public.questions(passage_id);
CREATE INDEX IF NOT EXISTS idx_questions_subtema ON public.questions(subtema);
CREATE INDEX IF NOT EXISTS idx_attempts_user_id ON public.attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempt_answers_attempt_id ON public.attempt_answers(attempt_id);
CREATE INDEX IF NOT EXISTS idx_review_bank_user_id ON public.review_bank(user_id);

-- ==============================================================================
-- Row Level Security (RLS) Configuration
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_bank ENABLE ROW LEVEL SECURITY;

-- Parts, Passages & Questions are public to read for anyone (even unauthenticated)
CREATE POLICY "Public parts read" ON public.parts FOR SELECT USING (true);
CREATE POLICY "Public passages read" ON public.passages FOR SELECT USING (true);
CREATE POLICY "Public questions read" ON public.questions FOR SELECT USING (true);

-- User Profiles: Users can read and update their own profile
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Attempts: Users can read and record their own attempts
CREATE POLICY "Users can read own attempts" ON public.attempts FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert own attempts" ON public.attempts FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Attempt Answers: Read/Insert permitted for associated attempts
CREATE POLICY "Users can read own answers" ON public.attempt_answers FOR SELECT USING (true);
CREATE POLICY "Users can insert own answers" ON public.attempt_answers FOR INSERT WITH CHECK (true);

-- Review Bank: Personal to each user
CREATE POLICY "Users can manage own review bank" ON public.review_bank FOR ALL USING (auth.uid() = user_id);

-- User Stats: Personal to each user
CREATE POLICY "Users can manage own stats" ON public.user_stats FOR ALL USING (auth.uid() = user_id);

-- ==============================================================================
-- Storage Bucket for TOEIC MP3 Audios and Images
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('toeic-media', 'toeic-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access for toeic-media"
ON storage.objects FOR SELECT
USING (bucket_id = 'toeic-media');
