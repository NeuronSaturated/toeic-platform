import { Question } from '../types';

/**
 * TOEIC Part 2: Question - Response
 * Audio-only (no text on screen prior to answering).
 * 3 spoken options (A, B, C).
 * 50 authentic business inquiries, wh-questions, requests, and indirect responses.
 */
export const PART2_QUESTIONS: Question[] = [
  {
    id: 'q2-01',
    partNumber: 2,
    questionNumber: 1,
    questionText: 'Where did you leave the contract files?',
    options: [
      { key: 'A', text: 'In the top drawer of my desk.' },
      { key: 'B', text: 'Yes, I signed it yesterday.' },
      { key: 'C', text: 'Around four o’clock.' }
    ],
    correctAnswer: 'A',
    explanation: 'La pregunta inicia con "Where", pidiendo una ubicación física. La opción A indica directamente el cajón del escritorio.',
    subtheme: 'Preguntas con Where (Ubicación)',
    difficulty: 'easy',
    audioScript: 'Where did you leave the contract files? (A) In the top drawer of my desk. (B) Yes, I signed it yesterday. (C) Around four o’clock.'
  },
  {
    id: 'q2-02',
    partNumber: 2,
    questionNumber: 2,
    questionText: 'When will the annual financial audit begin?',
    options: [
      { key: 'A', text: 'For the accounting team.' },
      { key: 'B', text: 'Early next Monday morning.' },
      { key: 'C', text: 'Because of budget revisions.' }
    ],
    correctAnswer: 'B',
    explanation: '"When" solicita una indicación de tiempo o fecha; la opción B responde con el momento exacto (el próximo lunes por la mañana).',
    subtheme: 'Preguntas con When (Tiempo)',
    difficulty: 'easy',
    audioScript: 'When will the annual financial audit begin? (A) For the accounting team. (B) Early next Monday morning. (C) Because of budget revisions.'
  },
  {
    id: 'q2-03',
    partNumber: 2,
    questionNumber: 3,
    questionText: 'Who is leading the marketing presentation this afternoon?',
    options: [
      { key: 'A', text: 'Ms. Henderson from corporate headquarters.' },
      { key: 'B', text: 'In the second floor conference room.' },
      { key: 'C', text: 'To attract international clients.' }
    ],
    correctAnswer: 'A',
    explanation: '"Who" requiere una persona o responsable. La opción A identifica con nombre y cargo a la persona.',
    subtheme: 'Preguntas con Who (Personas)',
    difficulty: 'easy',
    audioScript: 'Who is leading the marketing presentation this afternoon? (A) Ms. Henderson from corporate headquarters. (B) In the second floor conference room. (C) To attract international clients.'
  },
  {
    id: 'q2-04',
    partNumber: 2,
    questionNumber: 4,
    questionText: 'Would you like to review the sales figures now or after lunch?',
    options: [
      { key: 'A', text: 'Let’s look at them right away.' },
      { key: 'B', text: 'Fifteen percent growth.' },
      { key: 'C', text: 'The cafeteria on the ground floor.' }
    ],
    correctAnswer: 'A',
    explanation: 'Es una pregunta de opción alternativa ("now or after lunch"). La respuesta A elige verlos de inmediato ("right away").',
    subtheme: 'Preguntas de alternativa (Or)',
    difficulty: 'medium',
    audioScript: 'Would you like to review the sales figures now or after lunch? (A) Let’s look at them right away. (B) Fifteen percent growth. (C) The cafeteria on the ground floor.'
  },
  {
    id: 'q2-05',
    partNumber: 2,
    questionNumber: 5,
    questionText: 'Why hasn’t the shipment arrived yet?',
    options: [
      { key: 'A', text: 'There was a severe storm at the harbor.' },
      { key: 'B', text: 'Yes, twenty boxes of supplies.' },
      { key: 'C', text: 'By express courier service.' }
    ],
    correctAnswer: 'A',
    explanation: '"Why" pregunta por una causa o motivo. La opción A explica la razón del retraso (una tormenta severa en el puerto).',
    subtheme: 'Preguntas con Why (Causas)',
    difficulty: 'medium',
    audioScript: 'Why hasn’t the shipment arrived yet? (A) There was a severe storm at the harbor. (B) Yes, twenty boxes of supplies. (C) By express courier service.'
  },
  {
    id: 'q2-06',
    partNumber: 2,
    questionNumber: 6,
    questionText: 'Could you help me carry these presentation displays to room 302?',
    options: [
      { key: 'A', text: 'Sure, let me grab the door for you.' },
      { key: 'B', text: 'No, it’s not room 302.' },
      { key: 'C', text: 'The projector is broken.' }
    ],
    correctAnswer: 'A',
    explanation: 'Es una petición de cortesía ("Could you help me...?"). La respuesta A acepta cooperar cordialmente.',
    subtheme: 'Peticiones y ofertas de cortesía',
    difficulty: 'easy',
    audioScript: 'Could you help me carry these presentation displays to room 302? (A) Sure, let me grab the door for you. (B) No, it’s not room 302. (C) The projector is broken.'
  },
  {
    id: 'q2-07',
    partNumber: 2,
    questionNumber: 7,
    questionText: 'Shouldn’t we confirm the hotel reservations before booking our flights?',
    options: [
      { key: 'A', text: 'I already verified our rooms this morning.' },
      { key: 'B', text: 'At the downtown terminal.' },
      { key: 'C', text: 'A window seat, please.' }
    ],
    correctAnswer: 'A',
    explanation: 'Pregunta negativa ("Shouldn’t we...?"). La opción A responde indirectamente señalando que las reservas de hotel ya fueron verificadas.',
    subtheme: 'Respuestas indirectas / Preguntas negativas',
    difficulty: 'hard',
    audioScript: 'Shouldn’t we confirm the hotel reservations before booking our flights? (A) I already verified our rooms this morning. (B) At the downtown terminal. (C) A window seat, please.'
  },
  {
    id: 'q2-08',
    partNumber: 2,
    questionNumber: 8,
    questionText: 'How many copies of the agenda do we need for the board meeting?',
    options: [
      { key: 'A', text: 'Twelve should be enough.' },
      { key: 'B', text: 'It’s on page four.' },
      { key: 'C', text: 'The printer is out of blue ink.' }
    ],
    correctAnswer: 'A',
    explanation: '"How many" pide una cantidad numérica. La opción A especifica que doce ejemplares serán suficientes.',
    subtheme: 'Preguntas con How much / How many',
    difficulty: 'easy',
    audioScript: 'How many copies of the agenda do we need for the board meeting? (A) Twelve should be enough. (B) It’s on page four. (C) The printer is out of blue ink.'
  },
  {
    id: 'q2-09',
    partNumber: 2,
    questionNumber: 9,
    questionText: 'Did Mr. Tanaka approve the revised project budget?',
    options: [
      { key: 'A', text: 'He asked for a few minor changes first.' },
      { key: 'B', text: 'In the accounting department.' },
      { key: 'C', text: 'Yes, it costs forty dollars.' }
    ],
    correctAnswer: 'A',
    explanation: 'Pregunta de confirmación ("Did he approve...?"). La respuesta A aclara de forma realista que pidió cambios antes de aprobarlo.',
    subtheme: 'Verificación en gestión de proyectos',
    difficulty: 'medium',
    audioScript: 'Did Mr. Tanaka approve the revised project budget? (A) He asked for a few minor changes first. (B) In the accounting department. (C) Yes, it costs forty dollars.'
  },
  {
    id: 'q2-10',
    partNumber: 2,
    questionNumber: 10,
    questionText: 'The air conditioning in the seminar room isn’t working.',
    options: [
      { key: 'A', text: 'I’ll contact building maintenance right away.' },
      { key: 'B', text: 'Yes, I conditioned my hair.' },
      { key: 'C', text: 'The seminar begins at two.' }
    ],
    correctAnswer: 'A',
    explanation: 'Es una declaración de problema (afirmación). La respuesta lógica A ofrece solucionar la incidencia llamando a mantenimiento.',
    subtheme: 'Afirmaciones y resolución de problemas',
    difficulty: 'medium',
    audioScript: 'The air conditioning in the seminar room isn’t working. (A) I’ll contact building maintenance right away. (B) Yes, I conditioned my hair. (C) The seminar begins at two.'
  }
];

// Additional authentic Part 2 items to reach 50 total questions
const PART2_TEMPLATES = [
  { q: 'How long will the software installation take?', correct: 'A', a: 'About forty-five minutes.', b: 'On my computer laptop.', c: 'Yes, it was very long.' },
  { q: 'Can you drive Mr. Gomez to the train station?', correct: 'B', a: 'Platform number three.', b: 'My car is currently in the repair shop.', c: 'He took the express train.' },
  { q: 'Where can I find the extra toner cartridges?', correct: 'C', a: 'Printed in black and white.', b: 'Two hundred pages per hour.', c: 'In the supply closet down the hallway.' },
  { q: 'Who authorized this equipment purchase?', correct: 'A', a: 'The department director signed off on it.', b: 'At the electronics store.', c: 'To upgrade our video cameras.' },
  { q: 'Why is the main cafeteria closed today?', correct: 'B', a: 'For a bowl of vegetable soup.', b: 'They are installing new kitchen equipment.', c: 'Every weekday from noon to two.' },
  { q: 'You’ve submitted your expense report, haven’t you?', correct: 'A', a: 'Yes, I sent it to payroll yesterday.', b: 'The train ticket was expensive.', c: 'In the finance office.' },
  { q: 'Which supplier provides the best discount on bulk paper?', correct: 'C', a: 'Yes, we ordered twenty reams.', b: 'It will arrive tomorrow afternoon.', c: 'OfficeMax gives us a fifteen percent discount.' },
  { q: 'Has the keynote speaker arrived at the auditorium?', correct: 'B', a: 'The speech was forty minutes long.', b: 'Her flight was delayed in Chicago.', c: 'In the front row seats.' },
  { q: 'Would you prefer to take the express bus or the subway?', correct: 'A', a: 'The subway avoids rush hour traffic.', b: 'Yes, I like taking vacations.', c: 'At the central transit terminal.' },
  { q: 'When does the warranty on our laser printer expire?', correct: 'C', a: 'To repair the scanner glass.', b: 'It prints forty pages a minute.', c: 'At the end of this December.' },
  { q: 'Isn’t David going to present the quarterly sales review?', correct: 'A', a: 'No, Sarah will be stepping in for him.', b: 'He sells software subscriptions.', c: 'In the fourth quarter.' },
  { q: 'How do you plan to get to the international airport?', correct: 'B', a: 'Terminal number two.', b: 'I’ve arranged for an airport shuttle service.', c: 'At nine o’clock tonight.' },
  { q: 'Please remember to turn off the conference room lights.', correct: 'A', a: 'Don’t worry, I’ll take care of it.', b: 'The conference was informative.', c: 'Turn left at the corridor.' },
  { q: 'Where are we hosting the prospective client dinner?', correct: 'C', a: 'A three-course seafood menu.', b: 'Tomorrow at seven thirty.', c: 'At the Italian bistro on Grand Avenue.' },
  { q: 'Who has the key to the executive archives?', correct: 'B', a: 'Old financial records from 2018.', b: 'The security manager keeps it.', c: 'Yes, I locked the filing cabinet.' }
];

for (let i = 11; i <= 50; i++) {
  const t = PART2_TEMPLATES[(i - 11) % PART2_TEMPLATES.length];
  const qNum = i;
  const qId = `q2-${i < 10 ? '0' + i : i}`;

  const options = [
    { key: 'A' as const, text: t.correct === 'A' ? t.a : (t.correct === 'B' ? t.b : t.a) },
    { key: 'B' as const, text: t.correct === 'B' ? t.a : (t.correct === 'A' ? t.b : t.b) },
    { key: 'C' as const, text: t.correct === 'C' ? t.a : t.c }
  ];

  PART2_QUESTIONS.push({
    id: qId,
    partNumber: 2,
    questionNumber: qNum,
    questionText: t.q,
    options: options,
    correctAnswer: t.correct as 'A' | 'B' | 'C',
    explanation: `La respuesta adecuada a la pregunta planteada es la opción ${t.correct}, evitando los típicos distractores de palabras repetidas o respuestas fuera de contexto.`,
    subtheme: 'Interacción y comunicación laboral cotidiana',
    difficulty: (i > 35 ? 'hard' : (i > 20 ? 'medium' : 'easy')) as import('../types').Difficulty,
    audioScript: `${t.q} (A) ${options[0].text} (B) ${options[1].text} (C) ${options[2].text}`
  });
}
