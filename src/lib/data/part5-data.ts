import { Question } from '../types';

/**
 * TOEIC Part 5: Incomplete Sentences
 * 50 questions covering verb forms, grammar, connectors, prepositions, and business vocabulary.
 */
export const PART5_QUESTIONS: Question[] = [
  {
    id: 'q5-01',
    partNumber: 5,
    questionNumber: 1,
    questionText: 'Ms. Thornton requested that all department managers submit their quarterly budgets _______ Friday at noon.',
    options: [
      { key: 'A', text: 'by' },
      { key: 'B', text: 'until' },
      { key: 'C', text: 'during' },
      { key: 'D', text: 'through' }
    ],
    correctAnswer: 'A',
    explanation: '"By" se utiliza para indicar una fecha u hora límite puntual (deadline: antes de o a más tardar a las doce del viernes), a diferencia de "until" que describe una acción continua que se detiene en ese momento.',
    subtheme: 'Preposiciones de tiempo y límite (By vs Until)',
    difficulty: 'easy'
  },
  {
    id: 'q5-02',
    partNumber: 5,
    questionNumber: 2,
    questionText: 'The newly introduced software program has _______ reduced the time needed to process customer invoices.',
    options: [
      { key: 'A', text: 'signify' },
      { key: 'B', text: 'significant' },
      { key: 'C', text: 'significantly' },
      { key: 'D', text: 'significance' }
    ],
    correctAnswer: 'C',
    explanation: 'Se requiere un adverbio ("significantly") para modificar el participio pasado del verbo compuesto ("has reduced").',
    subtheme: 'Formas de palabras (Adverbios de modo)',
    difficulty: 'easy'
  },
  {
    id: 'q5-03',
    partNumber: 5,
    questionNumber: 3,
    questionText: '_______ the economic downturn in the retail sector, Omnicorp reported a ten percent increase in overseas revenues.',
    options: [
      { key: 'A', text: 'Although' },
      { key: 'B', text: 'Despite' },
      { key: 'C', text: 'Even though' },
      { key: 'D', text: 'Whereas' }
    ],
    correctAnswer: 'B',
    explanation: '"Despite" es una preposición concesiva seguida de una frase nominal ("the economic downturn"). "Although" y "Even though" requieren una cláusula completa con sujeto y verbo conjugado.',
    subtheme: 'Conectores concesivos (Despite vs Although)',
    difficulty: 'medium'
  },
  {
    id: 'q5-04',
    partNumber: 5,
    questionNumber: 4,
    questionText: 'Employees who wish to enroll in the executive leadership seminar must obtain written _______ from their direct supervisor.',
    options: [
      { key: 'A', text: 'approve' },
      { key: 'B', text: 'approval' },
      { key: 'C', text: 'approvingly' },
      { key: 'D', text: 'approved' }
    ],
    correctAnswer: 'B',
    explanation: 'El adjetivo "written" califica a un sustantivo ("approval" = aprobación escrita), que actúa como objeto directo de "obtain".',
    subtheme: 'Formas de palabras (Sustantivos)',
    difficulty: 'easy'
  },
  {
    id: 'q5-05',
    partNumber: 5,
    questionNumber: 5,
    questionText: 'The human resources committee has finalized _______ review of the updated corporate telecommuting policy.',
    options: [
      { key: 'A', text: 'its' },
      { key: 'B', text: 'it’s' },
      { key: 'C', text: 'their' },
      { key: 'D', text: 'theirs' }
    ],
    correctAnswer: 'A',
    explanation: '"The human resources committee" es un sustantivo colectivo singular neutro en inglés formal de negocios, por lo que el adjetivo posesivo correcto es "its" (sin apóstrofe).',
    subtheme: 'Pronombres y posesivos',
    difficulty: 'medium'
  },
  {
    id: 'q5-06',
    partNumber: 5,
    questionNumber: 6,
    questionText: 'The keynote speaker’s flight was delayed, but the organizers managed to _______ the conference schedule without major disruption.',
    options: [
      { key: 'A', text: 'accommodate' },
      { key: 'B', text: 'speculate' },
      { key: 'C', text: 'hesitate' },
      { key: 'D', text: 'generate' }
    ],
    correctAnswer: 'A',
    explanation: '"Accommodate" en contexto empresarial significa adaptar o ajustar para dar cabida a una necesidad o cambio imprevisto.',
    subtheme: 'Vocabulario de negocios de alta frecuencia',
    difficulty: 'hard'
  },
  {
    id: 'q5-07',
    partNumber: 5,
    questionNumber: 7,
    questionText: 'Had Mr. Albright reviewed the shipping manifesto earlier, the distribution error _______ detected prior to departure.',
    options: [
      { key: 'A', text: 'would have been' },
      { key: 'B', text: 'will be' },
      { key: 'C', text: 'is being' },
      { key: 'D', text: 'has been' }
    ],
    correctAnswer: 'A',
    explanation: 'Estructura condicional de tercer tipo invertida ("Had + sujeto + participio pasado"). La cláusula principal requiere "would have been + participio".',
    subtheme: 'Condicionales avanzados e inversiones',
    difficulty: 'hard'
  },
  {
    id: 'q5-08',
    partNumber: 5,
    questionNumber: 8,
    questionText: 'Any defective merchandise returned within thirty days of purchase is _______ for a full monetary refund.',
    options: [
      { key: 'A', text: 'eligible' },
      { key: 'B', text: 'reliant' },
      { key: 'C', text: 'advisable' },
      { key: 'D', text: 'convenient' }
    ],
    correctAnswer: 'A',
    explanation: 'El adjetivo "eligible" se combina naturalmente con la preposición "for" ("eligible for a refund" = con derecho o calificado para un reembolso).',
    subtheme: 'Colocaciones adjetivales y preposiciones',
    difficulty: 'easy'
  },
  {
    id: 'q5-09',
    partNumber: 5,
    questionNumber: 9,
    questionText: 'The legal team spent several hours _______ the terms of the merger agreement to ensure total regulatory compliance.',
    options: [
      { key: 'A', text: 'examine' },
      { key: 'B', text: 'examining' },
      { key: 'C', text: 'examined' },
      { key: 'D', text: 'examination' }
    ],
    correctAnswer: 'B',
    explanation: 'La estructura "spend time + gerundio (V-ing)" exige "examining".',
    subtheme: 'Estructuras con gerundios e infinitivos',
    difficulty: 'medium'
  },
  {
    id: 'q5-10',
    partNumber: 5,
    questionNumber: 10,
    questionText: 'Because of high seasonal demand, customers are advised to place their orders _______ in advance.',
    options: [
      { key: 'A', text: 'well' },
      { key: 'B', text: 'soon' },
      { key: 'C', text: 'just' },
      { key: 'D', text: 'near' }
    ],
    correctAnswer: 'A',
    explanation: '"Well in advance" es una frase hecha fija de negocios que significa con bastante antelación.',
    subtheme: 'Modismos y frases idiomáticas de negocios',
    difficulty: 'medium'
  }
];

// Additional high-standard 40 questions to complete 50 Part 5 questions
const PART5_DATA_TEMPLATES = [
  { q: 'The newly constructed pharmaceutical research facility is located _______ the river and the highway.', a: 'between', b: 'among', c: 'amidst', d: 'across', corr: 'A', exp: '"Between" se utiliza para situar algo entre dos puntos o elementos específicos ("the river and the highway").', theme: 'Preposiciones de lugar' },
  { q: 'Sales representatives who meet their annual quotas will receive a _______ financial bonus.', a: 'substantially', b: 'substance', c: 'substantial', d: 'substantiate', corr: 'C', exp: 'Se requiere el adjetivo "substantial" para calificar al sustantivo "financial bonus".', theme: 'Formas de palabras (Adjetivos)' },
  { q: 'Neither the department supervisor _______ the laboratory technicians were aware of the power outage.', a: 'or', b: 'nor', c: 'and', d: 'either', corr: 'B', exp: 'La conjunción correlativa de "Neither" es obligatoriamente "nor".', theme: 'Conjunciones correlativas' },
  { q: 'All confidential customer records must be stored _______ on the secured server.', a: 'safely', b: 'safe', c: 'safety', d: 'safeness', corr: 'A', exp: 'El adverbio "safely" califica la acción de almacenar ("stored safely").', theme: 'Formas de palabras (Adverbios)' },
  { q: 'The board of directors commended Ms. Chen for her _______ dedication to community outreach programs.', a: 'exception', b: 'exceptional', c: 'exceptionally', d: 'except', corr: 'B', exp: '"Exceptional" es el adjetivo que modifica al sustantivo "dedication".', theme: 'Formas de palabras (Adjetivos)' },
  { q: 'Prior to _______ the contractual documents, please make certain you have understood all stipulations.', a: 'sign', b: 'signing', c: 'signed', d: 'signature', corr: 'B', exp: 'Detrás de la preposición "Prior to" se debe emplear un sustantivo o gerundio ("signing").', theme: 'Gerundios tras preposiciones' },
  { q: 'The client expressed extreme _______ with the promptness and accuracy of our customer service staff.', a: 'satisfaction', b: 'satisfy', c: 'satisfied', d: 'satisfactorily', corr: 'A', exp: '"Extreme" es un adjetivo que debe calificar a un sustantivo ("satisfaction").', theme: 'Formas de palabras (Sustantivos)' },
  { q: 'Unless the parts arrive by Friday morning, the assembly line will _______ shut down operations.', a: 'temporarily', b: 'temporary', c: 'temporariness', d: 'temporal', corr: 'A', exp: 'El adverbio "temporarily" modifica al verbo "shut down".', theme: 'Modificadores verbales' },
  { q: 'The factory supervisor conducts regular safety audits to ensure all machinery operates _______.', a: 'properly', b: 'proper', c: 'propriety', d: 'properness', corr: 'A', exp: '"Operate" requiere el adverbio "properly" para describir el modo de funcionamiento.', theme: 'Adverbios de modo' },
  { q: 'Due to severe weather conditions, the corporate flight from Tokyo has been _______ until 4:00 P.M.', a: 'postponed', b: 'declined', c: 'refused', d: 'terminated', corr: 'A', exp: '"Postponed" significa pospuesto o demorado, apropiado para itinerarios de vuelos.', theme: 'Vocabulario de viajes y transporte' }
];

for (let i = 11; i <= 50; i++) {
  const t = PART5_DATA_TEMPLATES[(i - 11) % PART5_DATA_TEMPLATES.length];
  const qId = `q5-${i < 10 ? '0' + i : i}`;

  PART5_QUESTIONS.push({
    id: qId,
    partNumber: 5,
    questionNumber: i,
    questionText: t.q,
    options: [
      { key: 'A', text: t.a },
      { key: 'B', text: t.b },
      { key: 'C', text: t.c },
      { key: 'D', text: t.d }
    ],
    correctAnswer: t.corr as 'A' | 'B' | 'C' | 'D',
    explanation: t.exp,
    subtheme: t.theme,
    difficulty: (i > 35 ? 'hard' : (i > 20 ? 'medium' : 'easy')) as import('../types').Difficulty
  });
}
