# 🎓 TOEIC Mastery - Plataforma Web Full-Stack de Preparación TOEIC

Plataforma interactiva de alto rendimiento para la preparación del examen oficial **TOEIC® (Listening & Reading)**, desarrollada con una arquitectura moderna Full-Stack basada en **Next.js (App Router)**, **React 19**, **Tailwind CSS**, **Supabase (PostgreSQL + RLS + Storage)** y un motor de audio TTS de alta fidelidad.

Diseñada superando ampliamente los estándares de sitios tradicionales (como *esl-lounge*), ofreciendo una interfaz pulida, microinteracciones fluidas, banco de errores inteligente, análisis predictivo de puntaje (escala oficial 10 - 990) y más de **330+ ejercicios originales** distribuidos en las 7 partes del examen.

---

## 🚀 Características Principales

- **Fidelidad Estructural a las 7 Partes del TOEIC Oficial:**
  - **Parte 1 (Fotografías):** Visualización de imágenes reales en alta definición + opciones de audio con transcripción diferida.
  - **Parte 2 (Pregunta - Respuesta):** Experiencia de audio puro sin texto en pantalla previo a la respuesta, con 3 opciones habladas.
  - **Parte 3 (Conversaciones):** Diálogos empresariales de 2-3 interlocutores vinculados a 3 preguntas por conversación.
  - **Parte 4 (Charlas Breves):** Monólogos y anuncios profesionales con 3 preguntas por charla.
  - **Parte 5 (Oraciones Incompletas):** Ejercicios léxicos y gramaticales con distractores contextuales.
  - **Parte 6 (Texto Completado):** Pasajes de correspondencia corporativa con 4 espacios en blanco en línea.
  - **Parte 7 (Comprensión de Lectura):** Textos simples, dobles y triples con desplazamiento independiente y preguntas asociadas.

- **Doble Modo de Estudio:**
  - **Práctica Libre por Parte:** Aprendizaje formativo con retroalimentación inmediata, explicaciones pedagógicas detalladas (1-2 frases concisas) y revelación de transcripción auditiva.
  - **Modo Simulacro (Mock Test):** Examen cronometrado en condiciones reales con temporizador visual, paleta de navegación por preguntas, marcado de dudas (flagging), bloqueo de trampas auditivas y cálculo de puntaje estandarizado TOEIC (Listening 5-495, Reading 5-495, Total 10-990).

- **Dashboard Analítico & Métricas:**
  - Proyección de puntaje oficial estimada.
  - Gráficos interactivos de precisión por sección y por subtema gramatical/léxico (con Recharts).
  - Contador de racha de estudio diaria (*streak*).

- **Banco de Repaso Inteligente (Review Bank):**
  - Registro automático de cada pregunta fallada.
  - Modo *Drill* de repaso enfocado exclusivamente en debilidades.
  - Desclasificación automática tras rachas de acierto consecutivo.

- **Motor de Audio Híbrido:**
  - **Web Speech Synthesis Engine integrado:** Síntesis de voz instantánea con acentos en inglés (US/UK/AU) sin costo de APIs y con latencia cero.
  - **Pipeline TTS para Producción:** Scripts automatizados para sintetizar audios de estudio y subirlos a **Supabase Storage** (`toeic-media`).

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
|---|---|---|
| **Frontend** | Next.js 16 (App Router) + React 19 + TypeScript | Renderizado híbrido (SSR/SSG), rutas dinámicas y rendimiento óptimo |
| **Estilos & UI** | Tailwind CSS v4 + Framer Motion + Lucide Icons | Diseño moderno, modo oscuro/claro y microanimaciones suaves |
| **Estado Global** | Zustand con Middleware de Persistencia Local | Gestión de sesión de examen, temporizadores y métricas persistentes |
| **Gráficos** | Recharts | Visualización estadística de desempeño |
| **Base de Datos & Auth** | Supabase (PostgreSQL 15+) | Esquema relacional optimizado, RLS (Row Level Security) y Storage |
| **Despliegue** | Vercel | Integración continua y despliegue global en el edge |

---

## 📁 Estructura del Proyecto

```text
├── public/
│   └── audio/
│       └── listening/       # Manifiesto y archivos de audio generados
├── scripts/
│   ├── seed_database.ts     # Generador SQL y seeder directo para Supabase
│   └── generate_audio.ts    # Pipeline de síntesis TTS y subida a Supabase Storage
├── src/
│   ├── app/
│   │   ├── dashboard/       # Dashboard analítico de rendimiento
│   │   ├── mock-test/       # Modo simulacro de examen con temporizador
│   │   ├── practice/
│   │   │   └── [partId]/    # Módulos de práctica con vistas por parte
│   │   ├── review-bank/     # Banco de errores y repaso
│   │   ├── globals.css      # Tokens globales de diseño y utilidades
│   │   ├── layout.tsx       # Layout raíz con navegación y pie de página
│   │   └── page.tsx         # Página principal con selector de partes y progreso
│   ├── components/
│   │   ├── audio-player.tsx # Reproductor de audio con velocidades (0.75x-1.25x)
│   │   ├── dashboard/       # Tarjetas de puntaje y gráficos Recharts
│   │   ├── mock-test/       # Paleta de preguntas, temporizador y reporte
│   │   ├── practice/        # Vistas especializadas (Part1View a Part7View)
│   │   └── part-card.tsx    # Tarjetas interactivas de las 7 partes
│   └── lib/
│       ├── audio-synth.ts   # Motor de síntesis de voz en tiempo real
│       ├── data/            # Banco de 333+ ejercicios originales (Partes 1-7)
│       ├── parts-meta.ts    # Metadatos, tiempos e instrucciones oficiales
│       ├── store.ts         # Estado reactivo Zustand con persistencia
│       ├── toeic-scoring.ts # Algoritmo de puntuación estandarizada TOEIC (10-990)
│       └── types.ts         # Definiciones e interfaces de TypeScript
└── supabase/
    └── migrations/
        ├── 01_schema.sql    # Esquema relacional DDL (tablas, RLS, storage)
        └── 02_seed.sql      # Script de inserción de las 7 partes y 333+ preguntas
```

---

## 💻 Instalación y Ejecución Local

### 1. Requisitos Previos
- **Node.js** v20 o superior.
- **npm** o gestor compatible.
- Cuenta gratuita en [Supabase](https://supabase.com) (opcional si se desea persistencia en la nube).

### 2. Clonar e Instalar Dependencias
```bash
git clone https://github.com/NeuronSaturated/toeic-platform.git
cd toeic-platform
npm install
```

### 3. Variables de Entorno (Opcional para Supabase)
Crea un archivo `.env.local` en la raíz del proyecto:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key # Solo para scripts de seed y audio
```
> *Nota:* Si no configuras Supabase, la aplicación funcionará al 100% de manera inmediata utilizando el banco de 333+ ejercicios precargados en memoria y persistiendo el progreso en `localStorage`.

### 4. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🗄️ Base de Datos Supabase & Seeding

La plataforma incluye dos opciones para poblar la base de datos con los **333+ ejercicios**:

### Opción A: Mediante Supabase SQL Editor (Recomendada y más rápida)
1. Inicia sesión en tu panel de Supabase y ve a **SQL Editor**.
2. Copia y ejecuta el archivo [`supabase/migrations/01_schema.sql`](supabase/migrations/01_schema.sql).
3. Luego, copia y ejecuta [`supabase/migrations/02_seed.sql`](supabase/migrations/02_seed.sql).
¡Listo! Todas las tablas, índices, políticas RLS, el bucket `toeic-media` y las 333+ preguntas quedarán creadas e insertadas.

### Opción B: Mediante Script TypeScript
```bash
# Exportar o actualizar el archivo SQL:
npm run seed:sql

# O sembrar directamente a la nube de Supabase (requiere .env.local):
npm run seed:db
```

---

## 🎙️ Generación de Audio TTS

Para generar archivos MP3 de listening o subirlos a Supabase Storage:
```bash
# Prueba simulada de 5 audios:
npx tsx scripts/generate_audio.ts --limit=5

# Generar solo audios de la Parte 1:
npx tsx scripts/generate_audio.ts --part=1

# Generar y subir automáticamente a Supabase Storage (requiere credenciales):
npx tsx scripts/generate_audio.ts --upload
```

---

## 📦 Control de Versiones (GitHub)

Para publicar el proyecto en tu cuenta de GitHub (`NeuronSaturated`):

```bash
# 1. Verificar estado de git
git status

# 2. Agregar todos los archivos
git add .

# 3. Crear el commit inicial
git commit -m "feat: complete TOEIC platform implementation with 333+ exercises, Supabase schema, audio engine, and test suite"

# 4. Asegurar que la rama sea main
git branch -M main

# 5. Conectar con tu repositorio en GitHub
git remote add origin https://github.com/NeuronSaturated/toeic-platform.git

# 6. Subir los cambios a GitHub
git push -u origin main
```

---

## 🌐 Despliegue en Vercel

1. Entra a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub (`NeuronSaturated`).
2. Haz clic en **"Add New..."** → **"Project"**.
3. Selecciona el repositorio `toeic-platform`.
4. En **Environment Variables**, añade:
   - `NEXT_PUBLIC_SUPABASE_URL` (URL de tu proyecto en Supabase).
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Clave pública anónima de Supabase).
5. Haz clic en **Deploy**.
Vercel compilará la aplicación y la publicará en cuestión de segundos con soporte global de CDN y HTTPS automático.

---

## 📄 Licencia
Este proyecto es de código abierto bajo la licencia MIT. Contenido original creado específicamente para preparación TOEIC®.
