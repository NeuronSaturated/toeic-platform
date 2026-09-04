# Prompt Maestro: Plataforma de Práctica TOEIC Full-Stack

Actúa como un desarrollador Full-Stack Senior y experto en UI/UX. Tu objetivo es construir una plataforma web moderna de preparación para el examen TOEIC, inspirada estructuralmente en esl-lounge.com/student/toeic.php pero muy superior en diseño, cantidad de ejercicios y experiencia de usuario.

**Importante sobre el contenido:** esl-lounge.com solo se usa como referencia de *formato y estructura* del examen. Ningún texto, pregunta, opción o explicación debe copiarse literalmente de esa web ni de ninguna otra fuente con derechos de autor. Todo el banco de ejercicios debe ser contenido original, generado específicamente para este proyecto.

---

## 1. Stack Tecnológico

* **Frontend:** Next.js (App Router) + React + Tailwind CSS, desplegado en **Vercel**.
* **Backend:** Server Actions / Route Handlers de Next.js conectados directo a Supabase (evita un backend Express/FastAPI separado salvo que necesites lógica pesada de generación de audio en servidor; en ese caso, API en Node/FastAPI desplegada en Render).
* **Base de Datos y Autenticación:** **Supabase** (PostgreSQL + Supabase Auth + Supabase Storage para los MP3).
* **Estado y datos:** TanStack Query (SWR también sirve) para cache de queries; Zustand o Context API para estado de sesión de examen (temporizador, respuestas en curso).
* **Gráficos del dashboard:** Recharts.
* **Animaciones/microinteracciones:** Framer Motion (transiciones suaves entre preguntas, feedback de acierto/error).

---

## 2. Estructura del Examen y Lógica por Sección

El TOEIC real tiene 7 partes con mecánicas distintas. La plataforma debe reflejarlas fielmente, no tratarlas todas como "multiple choice genérico":

### Listening
| Parte | Nombre | Mecánica |
|---|---|---|
| 1 | Fotografías | Se muestra 1 imagen + se reproduce audio con 4 frases. El usuario elige la frase que mejor describe la imagen. |
| 2 | Pregunta-Respuesta | Solo audio (sin texto en pantalla). Se oye una pregunta/afirmación y 3 posibles respuestas habladas. |
| 3 | Conversaciones | Audio de un diálogo entre 2-3 personas. Genera 3 preguntas por audio. Algunas incluyen un gráfico/tabla en pantalla. |
| 4 | Charlas breves | Audio de un monólogo (anuncio, mensaje de voz, reporte). Genera 3 preguntas por audio. |

### Reading
| Parte | Nombre | Mecánica |
|---|---|---|
| 5 | Oraciones incompletas | Frase con un espacio en blanco, 4 opciones. |
| 6 | Texto completado | Texto corto (email, carta, aviso) con 4 espacios en blanco, cada uno con sus propias 4 opciones. |
| 7 | Comprensión de lectura | Pasajes simples, dobles o triples (artículos, mensajes de texto, formularios). Cada pasaje genera varias preguntas asociadas. |

**Implicación de diseño de datos:** a diferencia de Parte 1, 2 y 5 (una pregunta = un ítem independiente), las Partes 3, 4, 6 y 7 son **grupos**: un audio o texto base vinculado a *varias* preguntas. El esquema de base de datos debe modelar esto (ver sección 6), no forzar todo a una tabla plana de "pregunta-respuesta".

---

## 3. Generación de Contenido (el reto real)

### 3.1 Banco de ejercicios
* Objetivo: **superar ampliamente** el volumen de esl-lounge (que ofrece un puñado de ejercicios por parte). Meta sugerida: **mínimo 40-50 ítems por parte** (280-350+ ejercicios en total), generados con ayuda de IA siguiendo el formato oficial de cada parte, con dificultad variada (básico/intermedio/avanzado).
* Cada ejercicio debe incluir: enunciado o pasaje, alternativas, clave correcta, categoría (parte + subtema gramatical/vocabulario), nivel de dificultad, y una **explicación breve y directa** (1-2 frases) de por qué la opción correcta es correcta.
* El contenido se entrega mediante script de seed (`seed.sql` o script en TypeScript/Python que inserta vía Supabase client) — no hardcodeado en el frontend.

### 3.2 Audio para Listening (Partes 1-4)
Este es el punto que el prompt original daba por sentado y que hay que resolver explícitamente, porque no existe audio real de TOEIC disponible legalmente para reutilizar:
* Generar el audio mediante **Text-to-Speech**: opciones viables son la API de ElevenLabs, Google Cloud TTS o Amazon Polly (voces más naturales, con distintos acentos EN-US/EN-UK para variedad, como en el examen real) o, para una versión MVP sin costo, la Web Speech API del navegador como fallback.
* Flujo sugerido: script genera el guion de audio → llama a la API de TTS → guarda el MP3 resultante en **Supabase Storage** → guarda la URL pública en la tabla correspondiente.
* Documentar este script como parte de los entregables (sección 8).

---

## 4. Requisitos de UI/UX

* **Paleta de colores:** fondos claros (blanco / gris perla `#F9FAFB`), acentos en azul zafiro o verde menta para estados de acierto, rojo suave (no agresivo) para error.
* **Tipografía:** sans-serif moderna (Inter), alto contraste, amplio espacio en blanco, sin saturación visual.
* **Navegación:** pantalla principal por tarjetas — una por cada una de las 7 partes, mostrando ícono representativo, progreso (%) y número de ejercicios disponibles/completados.
* **Reproductor de audio:** controles simples (play/pausa, velocidad 0.75x-1.25x), sin permitir adelantar en Modo Simulacro (como el examen real), pero sí libre en modo práctica.
* **Feedback inmediato en modo práctica:** animación sutil de acierto/error (Framer Motion) + explicación breve visible al instante.
* **Estados de carga:** skeleton loaders en vez de spinners genéricos.
* **Mobile-first:** estrictamente responsivo; especial cuidado en que los pasajes largos de Parte 7 sean cómodos de leer en pantallas pequeñas (tipografía escalable, scroll independiente del bloque de preguntas).
* **Modo oscuro** (opcional pero recomendado): toggle persistente por usuario.

---

## 5. Funcionalidades Críticas

* **Práctica libre por parte:** el usuario elige una de las 7 partes y practica a su ritmo, con feedback y explicación inmediatos.
* **Dashboard analítico:** gráficos de % de acierto por parte y por subtema (ej. tiempos verbales, vocabulario de negocios), evolución en el tiempo, racha de días de estudio.
* **Banco de errores / repaso:** los ítems fallados se guardan en una lista de "Para repasar"; opción de practicar solo esos.
* **Modo Simulacro (Mock Test):** examen cronometrado que simula condiciones reales (temporizador visible, sin explicaciones hasta el final), con resumen de puntaje y revisión detallada al terminar.
* **Persistencia de sesión:** Supabase Auth; historial de intentos, respuestas y puntajes vinculados al perfil.

---

## 6. Esquema de Base de Datos (Supabase) — sugerido

```
profiles            (id, user_id, nombre, nivel, creado_en)
parts               (id, numero [1-7], nombre, seccion [listening/reading])
passages            (id, part_id, tipo [imagen/audio/texto], contenido_url o texto, transcript_oculto)
questions           (id, passage_id (nullable si es ítem independiente), part_id, pregunta, opciones[jsonb], respuesta_correcta, explicacion, subtema, dificultad)
attempts            (id, user_id, tipo [practica/simulacro], iniciado_en, finalizado_en, puntaje)
attempt_answers     (id, attempt_id, question_id, respuesta_usuario, es_correcta, tiempo_respuesta)
user_stats          (user_id, part_id, subtema, porcentaje_acierto, ultima_practica)
```
Esto permite que una sola imagen o audio (`passages`) alimente 1 pregunta (Partes 1, 2, 5) o varias (Partes 3, 4, 6, 7).

---

## 7. Control de Versiones y Despliegue

* Comandos de terminal exactos para: `git init`, primer commit, creación del repo remoto y `git push` a GitHub.
* Guía paso a paso de configuración en Vercel: vincular el repositorio, variables de entorno (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, y la clave de la API de TTS si corresponde, marcada como server-only).

---

## 8. Entregables Esperados

1. Estructura completa de archivos del proyecto (Next.js + Supabase).
2. Script(s) de seed: generación del banco de ejercicios (mínimo ~300 ítems distribuidos en las 7 partes) + script de generación de audio TTS con subida a Supabase Storage.
3. Código fuente de los componentes clave: Dashboard, Selector de partes, Módulo de práctica (por parte, respetando la mecánica de cada una), Modo Simulacro con temporizador, Reproductor de audio, Banco de repaso de errores.
4. Guía textual paso a paso: instalación local, ejecución, commit/push a GitHub, despliegue en Vercel.
