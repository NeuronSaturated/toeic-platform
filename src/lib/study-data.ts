export interface ComparisonTableRow {
  colA: string;
  colB: string;
  note?: string;
}

export interface GrammarRule {
  id: string;
  title: string;
  titleEn: string;
  category: 'grammar';
  summary: string;
  explanation: string;
  attitudeExplanation?: string;
  comparisonTable?: {
    headerA: string;
    headerB: string;
    rows: ComparisonTableRow[];
  };
  keyFormula?: string;
  examples: {
    correct: string;
    incorrect?: string;
    explanation: string;
  }[];
  toeicTip: string;
}

export interface VocabularyTopic {
  id: string;
  title: string;
  titleEn: string;
  category: 'vocabulary';
  description: string;
  terms: {
    word: string;
    phonetic?: string;
    partOfSpeech: string;
    meaningEs: string;
    collocations: string[];
    example: string;
  }[];
}

export interface HomophoneItem {
  id: string;
  title: string;
  phonetic: string;
  explanation: string;
  trapWarning: string;
  pairs: {
    word: string;
    partOfSpeech: string;
    meaningEs: string;
    example: string;
  }[];
}

export interface ExamStrategy {
  id: string;
  partNumber: number;
  partName: string;
  section: 'listening' | 'reading';
  goldenRule: string;
  commonTraps: string[];
  tactics: {
    step: string;
    description: string;
  }[];
  timeManagement: string;
}

// ----------------------------------------------------------------------
// 1. REGLAS GRAMATICALES CON FORMATO COMPARATIVO ESTILO EF ENGLISH LIVE
// ----------------------------------------------------------------------
export const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'g-01',
    title: 'Present Perfect vs Simple Past',
    titleEn: 'Present Perfect vs. Simple Past',
    category: 'grammar',
    summary: 'Diferencia esencial entre acciones finalizadas en un momento cerrado del pasado y acciones con vigencia o relevancia presente.',
    explanation: 'Utilizamos el "present perfect" siempre que el tiempo en que se desarrolla la acción no es relevante, no se especifica o continúa en el presente. En cambio, empleamos el "simple past" siempre que se solicitan o especifican datos sobre el momento o el lugar exacto de la acción.',
    attitudeExplanation: 'También existe una diferencia en cuanto a la actitud, que suele ser más importante que el factor temporal. Con Simple Past preguntamos por actividades finalizadas de un ciclo concluido ("What did you do at the conference?"). Con Present Perfect preguntamos por los resultados acumulados o vigentes ("What have you achieved so far?").',
    comparisonTable: {
      headerA: 'Present Perfect (have/has + V-pp)',
      headerB: 'Simple Past (V-ed / irregular)',
      rows: [
        { colA: 'I have lived in London.', colB: 'I lived in London in 2019.', note: 'Sin tiempo específico vs año cerrado' },
        { colA: 'They have eaten Thai food.', colB: 'They ate Thai food last night.', note: 'Experiencia vs referencia temporal precisa' },
        { colA: 'Have you seen the new quarterly report?', colB: 'Where did you see that notice yesterday?', note: 'Resultado actual vs momento pasado' },
        { colA: 'We have been to three conventions.', colB: 'When did you go to the Paris seminar?', note: 'Frecuencia de vida vs fecha concreta' },
        { colA: 'Sales have increased recently.', colB: 'Sales increased by 10% last quarter.', note: 'Palabras clave: recently/since vs last/ago' }
      ]
    },
    keyFormula: 'Simple Past: Sujeto + V-ed / Irregular + tiempo específico | Present Perfect: Sujeto + have/has + V-pp + since / for / already / yet',
    examples: [
      {
        correct: 'Mr. Davis has recently approved the renovation plan for the lobby.',
        incorrect: 'Mr. Davis has approved the renovation plan yesterday.',
        explanation: '"Yesterday" fija un punto temporal cerrado e incompatible con Present Perfect; requiere Simple Past ("Mr. Davis approved the plan yesterday").'
      },
      {
        correct: 'Our branch opened two new client service desks last month.',
        incorrect: 'Our branch has opened two new client service desks last month.',
        explanation: 'La expresión temporal "last month" obliga al uso de Simple Past en las preguntas de Parte 5 y 6 del TOEIC.'
      }
    ],
    toeicTip: 'Regla del examen: Si en la oración ves "since [año/mes]", "for [duración]", "already" o "over the past few years", busca "have/has + participio". Si ves "ago", "last [periodo]" o "in [año pasado]", la respuesta correcta es Simple Past.'
  },
  {
    id: 'g-02',
    title: 'Voz Pasiva vs Voz Activa',
    titleEn: 'Passive Voice vs. Active Voice',
    category: 'grammar',
    summary: 'La estructura predilecta del inglés formal, avisos públicos, correos corporativos y reportes técnicos.',
    explanation: 'En la voz activa, el sujeto realiza la acción ("The technician repaired the server"). En la voz pasiva, el foco se traslada al receptor o al objeto afectado ("The server was repaired"). En el TOEIC, las cosas inanimadas (packages, invoices, letters, flights) son casi invariablemente sujetos pasivos.',
    attitudeExplanation: 'Se prefiere la voz pasiva cuando no es necesario mencionar quién ejecutó la acción, o cuando se desea mantener un tono impersonal, cortés y profesional en correspondencia oficial.',
    comparisonTable: {
      headerA: 'Voz Activa (Sujeto agente)',
      headerB: 'Voz Pasiva (to be + Past Participle)',
      rows: [
        { colA: 'The courier delivered the contract.', colB: 'The contract was delivered on time.', note: 'El contrato no se entrega solo; es entregado' },
        { colA: 'The manager will review all requests.', colB: 'All requests will be reviewed tomorrow.', note: 'Enfoque en el proceso de revisión' },
        { colA: 'Staff must wear identification badges.', colB: 'Badges must be worn at all times.', note: 'Aviso formal obligatorio' },
        { colA: 'The airline delayed the morning flight.', colB: 'The morning flight has been delayed.', note: 'Notificación de estado típica en aeropuertos' }
      ]
    },
    keyFormula: 'Sujeto Paciente + [am/is/are / was/were / has been / will be] + Past Participle (+ by agente opcional)',
    examples: [
      {
        correct: 'All reimbursement forms must be submitted to the accounts office by 5:00 PM.',
        incorrect: 'All reimbursement forms must submit to the accounts office by 5:00 PM.',
        explanation: 'Los formularios no se envían a sí mismos; son el objeto paciente de la acción ("must be submitted").'
      }
    ],
    toeicTip: 'Pregunta clave ante un espacio en blanco: ¿El sujeto puede realizar la acción por su cuenta? Si el sujeto es inanimado (report, payment, order, announcement), descarta opciones activas y elige la estructura pasiva con "be + participio".'
  },
  {
    id: 'g-03',
    title: 'Gerundio (-ing) vs Infinitivo (to + verbo)',
    titleEn: 'Gerunds (-ing) vs. Infinitives (to + verb)',
    category: 'grammar',
    summary: 'Identificación inmediata del patrón verbal correcto: verbos que exigen -ing, verbos que exigen infinitivo y la regla de oro de las preposiciones.',
    explanation: 'El inglés exige que después de ciertos verbos usemos obligatoriamente la forma en gerundio (-ing), mientras que otros demandan infinitivo con "to". Además, toda preposición en inglés (in, on, at, about, without, before, after, by) debe ir seguida de gerundio si le sigue una acción.',
    comparisonTable: {
      headerA: 'Verbos con Gerundio (-ing)',
      headerB: 'Verbos con Infinitivo (to + V)',
      rows: [
        { colA: 'consider / delay / postpone / suggest', colB: 'decide / plan / intend / agree', note: 'Acciones propuestas vs decisiones firmes' },
        { colA: 'appreciate / avoid / enjoy / recommend', colB: 'refuse / promise / afford / expect', note: 'Apreciaciones vs expectativas' },
        { colA: 'look forward to + V-ing', colB: 'hope to + V-infinitive', note: 'Atención con "to" como preposición' },
        { colA: 'by / before / after / without + V-ing', colB: 'in order to / so as to + V-infinitive', note: 'Preposiciones siempre rigen -ing' }
      ]
    },
    keyFormula: 'Verbo + V-ing | Verbo + to-V | Preposición + V-ing | look forward to + V-ing',
    examples: [
      {
        correct: 'The director suggested postponing the product rollout until next quarter.',
        incorrect: 'The director suggested to postpone the product rollout until next quarter.',
        explanation: 'El verbo "suggest" rige gerundio (-ing) de manera estricta en inglés formal.'
      },
      {
        correct: 'Before leaving the office, please turn off the air conditioning units.',
        incorrect: 'Before to leave the office, please turn off the air conditioning units.',
        explanation: 'La palabra "before" opera como preposición, exigiendo el gerundio "leaving".'
      }
    ],
    toeicTip: 'Trampa clásica del TOEIC: "look forward to", "be accustomed to" y "prior to". Aunque terminan con la palabra "to", en estos casos "to" es una PREPOSICIÓN, por lo que la opción correcta debe llevar terminación -ing (ej: "We look forward to hearing from you").'
  },
  {
    id: 'g-04',
    title: 'Condicionales de Examen: Primero, Segundo y Mixto',
    titleEn: 'First, Second and Inverted Conditionals',
    category: 'grammar',
    summary: 'Estructuras hipotéticas y la famosa inversión formal (Should you have any questions).',
    explanation: 'El primer condicional predice situaciones reales o probables de negocio (If + presente, will + verbo). El segundo describe hipótesis poco probables (If + pasado, would + verbo). En correspondencia formal del TOEIC, las oraciones con "if" suelen invertirse omitiendo el "if" y comenzando directamente con "Should" o "Had".',
    comparisonTable: {
      headerA: 'Condicional Estándar con "If"',
      headerB: 'Inversión Formal TOEIC (Sin "If")',
      rows: [
        { colA: 'If you need further assistance...', colB: 'Should you need further assistance...', note: 'Should + Sujeto + Verbo Base' },
        { colA: 'If Mr. Kim arrives early...', colB: 'Should Mr. Kim arrive early...', note: 'Verbo en forma base aun con tercera persona' },
        { colA: 'If we had received the invoice...', colB: 'Had we received the invoice...', note: 'Had + Sujeto + Participio' },
        { colA: 'If you have any questions, call us.', colB: 'Should you have any questions, please contact us.', note: 'Fórmula fija en emails de atención' }
      ]
    },
    keyFormula: 'Primer Condicional: If + Present Simple, will + V-base | Inversión Formal: Should + Sujeto + V-base',
    examples: [
      {
        correct: 'Should you require additional details, please contact our help desk.',
        incorrect: 'Should you requiring additional details, please contact our help desk.',
        explanation: 'La inversión con "Should" siempre exige infinitivo sin "to" (verbo en forma base: "require").'
      }
    ],
    toeicTip: 'Si una oración comienza con un espacio en blanco seguido de un sujeto y un verbo en infinitivo sin "if" (ej: "_____ you experience any technical delays, call our helpline"), la respuesta en el 99% de los casos es "Should".'
  },
  {
    id: 'g-05',
    title: 'Conectores de Causa, Contraste y Concesión',
    titleEn: 'Connectors & Transition Words',
    category: 'grammar',
    summary: 'Distinguir entre conjunciones subordinadas (con oración completa) y preposiciones (seguidas de sustantivo o frase nominal).',
    explanation: 'Una de las trampas más repetidas de Parte 5 consiste en poner opciones con significados equivalentes pero estructuras sintácticas incompatibles: conjunciones que van seguidas de Sujeto + Verbo (Although, Because, While) frente a preposiciones que van seguidas de Sustantivo o -ing (Despite, Because of, During).',
    comparisonTable: {
      headerA: 'Conjunción (Sujeto + Verbo)',
      headerB: 'Preposición (Sustantivo / Frase Nominal)',
      rows: [
        { colA: 'Although / Even though the rain was heavy...', colB: 'Despite / In spite of the heavy rain...', note: 'Contraste / Concesión' },
        { colA: 'Because / Since the budget was reduced...', colB: 'Because of / Due to the budget reduction...', note: 'Causa / Motivo' },
        { colA: 'While the team conducted the survey...', colB: 'During the annual customer survey...', note: 'Tiempo / Simultaneidad' },
        { colA: 'Unless the contract is signed...', colB: 'Without a signed contract...', note: 'Condición negativa' }
      ]
    },
    keyFormula: '[Although / Because / While] + [Sujeto + Verbo] vs [Despite / Due to / During] + [Sustantivo]',
    examples: [
      {
        correct: 'Despite the severe weather conditions, the morning flight landed safely.',
        incorrect: 'Although the severe weather conditions, the morning flight landed safely.',
        explanation: '"The severe weather conditions" es una frase nominal sin verbo conjugado; por lo tanto, "Although" es incorrecto y se debe usar la preposición "Despite".'
      }
    ],
    toeicTip: 'Técnica de 3 segundos: Mira qué hay después del espacio en blanco. Si hay [Sujeto + Verbo], elige "Although", "Because" o "While". Si solo hay un sustantivo o frase nominal sin verbo, elige "Despite", "Due to", "Owing to" o "During".'
  }
];

// ----------------------------------------------------------------------
// 2. VOCABULARIO GENERAL DE ALTA FRECUENCIA PARA EL TOEIC
// ----------------------------------------------------------------------
export const VOCABULARY_TOPICS: VocabularyTopic[] = [
  {
    id: 'v-01',
    title: 'Vida Cotidiana, Compras y Servicios',
    titleEn: 'Daily Life, Shopping & Public Services',
    category: 'vocabulary',
    description: 'Palabras cotidianas de alta recurrencia en anuncios de tiendas, avisos de transporte, restaurantes y servicios públicos.',
    terms: [
      {
        word: 'receipt',
        phonetic: '/rɪˈsiːt/ (la "p" es muda)',
        partOfSpeech: 'noun',
        meaningEs: 'recibo / comprobante de compra',
        collocations: ['original receipt', 'keep the receipt', 'issue a receipt'],
        example: 'Customers must present their original receipt to receive a full refund.'
      },
      {
        word: 'grocery',
        phonetic: '/ˈɡroʊsəri/',
        partOfSpeech: 'noun',
        meaningEs: 'alimentos / tienda de comestibles',
        collocations: ['grocery store', 'grocery shopping', 'grocery bag'],
        example: 'She picked up some fresh vegetables at the local grocery store.'
      },
      {
        word: 'complimentary',
        phonetic: '/ˌkɑːmplɪˈmentri/',
        partOfSpeech: 'adjective',
        meaningEs: 'gratuito / de cortesía (hotel o evento)',
        collocations: ['complimentary breakfast', 'complimentary shuttle', 'complimentary wifi'],
        example: 'Guests can enjoy a complimentary hot beverage in the hotel reception area.'
      },
      {
        word: 'refund',
        phonetic: '/ˈriːfʌnd/',
        partOfSpeech: 'noun / verb',
        meaningEs: 'reembolso / devolver el dinero',
        collocations: ['full refund', 'request a refund', 'non-refundable deposit'],
        example: 'Tickets canceled less than twenty-four hours in advance are non-refundable.'
      },
      {
        word: 'facility',
        phonetic: '/fəˈsɪləti/',
        partOfSpeech: 'noun',
        meaningEs: 'instalación / recinto / edificio',
        collocations: ['parking facility', 'sports facility', 'modern facility'],
        example: 'Our new fitness facility is open twenty-four hours a day for all residents.'
      },
      {
        word: 'appliance',
        phonetic: '/əˈplaɪəns/',
        partOfSpeech: 'noun',
        meaningEs: 'electrodoméstico / aparato del hogar',
        collocations: ['kitchen appliance', 'energy-saving appliance', 'household appliance'],
        example: 'The showroom features the latest energy-efficient kitchen appliances.'
      }
    ]
  },
  {
    id: 'v-02',
    title: 'Viajes, Transporte y Desplazamientos',
    titleEn: 'Travel, Commuting & Transportation',
    category: 'vocabulary',
    description: 'Términos que aparecen continuamente en anuncios de aeropuertos, estaciones de tren, indicaciones y hoteles.',
    terms: [
      {
        word: 'commute',
        phonetic: '/kəˈmjuːt/',
        partOfSpeech: 'noun / verb',
        meaningEs: 'viaje diario al trabajo / trasladarse',
        collocations: ['daily commute', 'morning commute', 'commute by train'],
        example: 'Many suburban residents commute to the city center by subway.'
      },
      {
        word: 'itinerary',
        phonetic: '/aɪˈtɪnəreri/',
        partOfSpeech: 'noun',
        meaningEs: 'itinerario / plan detallado de viaje',
        collocations: ['detailed itinerary', 'travel itinerary', 'flight itinerary'],
        example: 'Please check your travel itinerary carefully for connection flight times.'
      },
      {
        word: 'delay',
        phonetic: '/dɪˈleɪ/',
        partOfSpeech: 'noun / verb',
        meaningEs: 'retraso / demora / postergar',
        collocations: ['flight delay', 'experience delays', 'without delay'],
        example: 'Commuters experienced minor delays due to signal maintenance on Line 4.'
      },
      {
        word: 'board',
        phonetic: '/bɔːrd/',
        partOfSpeech: 'verb / noun',
        meaningEs: 'embarcar / abordar (tren, avión) o tabla',
        collocations: ['boarding pass', 'board the plane', 'boarding gate'],
        example: 'Passengers with small children are invited to board the aircraft first.'
      },
      {
        word: 'luggage / baggage',
        phonetic: '/ˈlʌɡɪdʒ/',
        partOfSpeech: 'noun (incontable)',
        meaningEs: 'equipaje (nunca lleva -s)',
        collocations: ['carry-on luggage', 'excess baggage', 'baggage claim area'],
        example: 'Carry-on luggage must fit inside the overhead storage compartment.'
      },
      {
        word: 'departure',
        phonetic: '/dɪˈpɑːrtʃər/',
        partOfSpeech: 'noun',
        meaningEs: 'salida / partida (de vuelos o trenes)',
        collocations: ['scheduled departure', 'departure lounge', 'departure time'],
        example: 'The estimated departure time has been pushed back by twenty minutes.'
      }
    ]
  },
  {
    id: 'v-03',
    title: 'Trabajo, Oficinas y Comunicación General',
    titleEn: 'General Workplace & Office Communications',
    category: 'vocabulary',
    description: 'Vocabulario básico y transversal para entender memorandos, correos, llamadas telefónicas y reuniones de equipo.',
    terms: [
      {
        word: 'appointment',
        phonetic: '/əˈpɔɪntmənt/',
        partOfSpeech: 'noun',
        meaningEs: 'cita / cita médica o profesional',
        collocations: ['schedule an appointment', 'confirm an appointment', 'doctor’s appointment'],
        example: 'Please arrive ten minutes before your scheduled appointment.'
      },
      {
        word: 'deadline',
        phonetic: '/ˈdedlaɪn/',
        partOfSpeech: 'noun',
        meaningEs: 'fecha límite / plazo de entrega',
        collocations: ['meet a deadline', 'tight deadline', 'extend the deadline'],
        example: 'The graphic design team worked extra hours to meet the project deadline.'
      },
      {
        word: 'agenda',
        phonetic: '/əˈdʒendə/',
        partOfSpeech: 'noun',
        meaningEs: 'orden del día / temario de la reunión',
        collocations: ['meeting agenda', 'item on the agenda', 'distribute the agenda'],
        example: 'The first item on today’s agenda is the employee wellness initiative.'
      },
      {
        word: 'colleague / coworker',
        phonetic: '/ˈkɑːliːɡ/',
        partOfSpeech: 'noun',
        meaningEs: 'compañero/a de trabajo',
        collocations: ['trusted colleague', 'senior colleague', 'work with colleagues'],
        example: 'A former colleague recommended this application for collaborative tasks.'
      },
      {
        word: 'inquiry',
        phonetic: '/ˈɪnkwəri/',
        partOfSpeech: 'noun',
        meaningEs: 'consulta / pregunta o solicitud de información',
        collocations: ['general inquiry', 'respond to inquiries', 'telephone inquiry'],
        example: 'Our customer support team handles over five hundred inquiries each day.'
      },
      {
        word: 'schedule',
        phonetic: '/ˈskedʒuːl/ (US) / /ˈʃedʒuːl/ (UK)',
        partOfSpeech: 'noun / verb',
        meaningEs: 'horario / cronograma / programar',
        collocations: ['ahead of schedule', 'behind schedule', 'on schedule'],
        example: 'The construction of the new community center is running ahead of schedule.'
      }
    ]
  }
];

// ----------------------------------------------------------------------
// 3. PALABRAS HOMÓFONAS Y CONFUSING WORDS (TRAMPAS AUDITIVAS)
// ----------------------------------------------------------------------
export const HOMOPHONES_LIST: HomophoneItem[] = [
  {
    id: 'hom-01',
    title: 'Hear vs Here',
    phonetic: '/hɪr/',
    explanation: 'Suenan exactamente igual. Los examinadores de las Partes 1 y 2 colocan "here" en la opción para confundir si escuchaste "hear".',
    trapWarning: 'En Parte 2, ante una pregunta como "Can you hear the speaker?", una respuesta trampa común suele ser: "Yes, I left it right here" (usando "here" de lugar en vez de "hear" de oír).',
    pairs: [
      {
        word: 'hear',
        partOfSpeech: 'verb',
        meaningEs: 'oír / percibir sonidos con los oídos',
        example: 'I could hardly hear the announcement over the loud station noise.'
      },
      {
        word: 'here',
        partOfSpeech: 'adverb',
        meaningEs: 'aquí / en este lugar',
        example: 'Please place your signature on the designated line right here.'
      }
    ]
  },
  {
    id: 'hom-02',
    title: 'Their vs There vs They\'re',
    phonetic: '/ðer/',
    explanation: 'Idéntica pronunciación con tres funciones gramaticales totalmente distintas. Muy evaluado en Parte 5.',
    trapWarning: 'Identifica la estructura: "Their" va antes de sustantivo (their coats), "There" indica lugar o existencia (there is/are), y "They\'re" es contracción de sujeto + verbo (they are).',
    pairs: [
      {
        word: 'their',
        partOfSpeech: 'possessive adjective',
        meaningEs: 'su / sus (de ellos/ellas)',
        example: 'All visitors must wear their identification badges at all times.'
      },
      {
        word: 'there',
        partOfSpeech: 'adverb / pronoun',
        meaningEs: 'allí / ahí / haber (existencia)',
        example: 'There are three open positions available in the logistics section.'
      },
      {
        word: "they're",
        partOfSpeech: 'contraction (they are)',
        meaningEs: 'ellos/ellas son o están',
        example: "They're currently evaluating several potential venue locations."
      }
    ]
  },
  {
    id: 'hom-03',
    title: 'Accept vs Except',
    phonetic: '/əkˈsept/ vs /ɪkˈsept/',
    explanation: 'Casi idéntica pronunciación en habla rápida. "Accept" es un verbo de recepción voluntaria; "Except" es una preposición de exclusión.',
    trapWarning: 'En correos electrónicos de Parte 6 y 7, "accept" suele referirse a invitaciones o pagos; "except" indica excepciones a horarios o políticas.',
    pairs: [
      {
        word: 'accept',
        partOfSpeech: 'verb',
        meaningEs: 'aceptar / recibir voluntariamente',
        example: 'The online store does not accept expired discount coupons.'
      },
      {
        word: 'except',
        partOfSpeech: 'preposition / conjunction',
        meaningEs: 'excepto / salvo / aparte de',
        example: 'The museum is open every day except Monday mornings.'
      }
    ]
  },
  {
    id: 'hom-04',
    title: 'Affect vs Effect',
    phonetic: '/əˈfekt/ vs /ɪˈfekt/',
    explanation: '"Affect" con A casi siempre es un VERBO (influir en algo). "Effect" con E casi siempre es un SUSTANTIVO (el resultado de un cambio).',
    trapWarning: 'Frase fija en el TOEIC: "take effect" (entrar en vigor). Ej: "The new transit policy will take effect next Monday". No uses "affect" en esa frase.',
    pairs: [
      {
        word: 'affect',
        partOfSpeech: 'verb',
        meaningEs: 'afectar / tener impacto sobre algo',
        example: 'Severe winter storms may affect delivery timetables this week.'
      },
      {
        word: 'effect',
        partOfSpeech: 'noun',
        meaningEs: 'efecto / consecuencia / resultado',
        example: 'The new training program had an immediate positive effect on productivity.'
      }
    ]
  },
  {
    id: 'hom-05',
    title: 'Weather vs Whether',
    phonetic: '/ˈweðər/',
    explanation: 'Pronunciación idéntica. "Weather" es el clima o estado del tiempo; "Whether" es una conjunción que introduce opciones o incertidumbre (si...).',
    trapWarning: 'Patrón de examen: "whether... or not" (si acaso... o no). Ej: "Let us know whether you can attend the banquet".',
    pairs: [
      {
        word: 'weather',
        partOfSpeech: 'noun',
        meaningEs: 'el clima / tiempo atmosférico',
        example: 'Due to inclement weather, the outdoor concert will be moved indoors.'
      },
      {
        word: 'whether',
        partOfSpeech: 'conjunction',
        meaningEs: 'si (condicional de elección)',
        example: 'We have not yet determined whether we will expand into the northern market.'
      }
    ]
  },
  {
    id: 'hom-06',
    title: 'Loose vs Lose',
    phonetic: '/luːs/ (sonido s) vs /luːz/ (sonido z)',
    explanation: '"Loose" es un adjetivo (suelto, flojo); "Lose" es un verbo (perder). Error gramatical extremadamente frecuente en el examen escrito.',
    trapWarning: 'La pronunciación de la s final las distingue: "loose" termina en s sorda, "lose" termina en z sonora vibrante.',
    pairs: [
      {
        word: 'loose',
        partOfSpeech: 'adjective',
        meaningEs: 'suelto / holgado / flojo (no apretado)',
        example: 'Wear comfortable, loose clothing during the safety workshop.'
      },
      {
        word: 'lose',
        partOfSpeech: 'verb',
        meaningEs: 'perder / extraviar',
        example: 'Be careful not to lose your room keycard during your stay.'
      }
    ]
  },
  {
    id: 'hom-07',
    title: 'Compliment vs Complement',
    phonetic: '/ˈkɑːmplɪmənt/',
    explanation: 'Misma pronunciación. "Compliment" (con i) es un halago o felicitación; "Complement" (con e) es algo que complementa o completa armoniosamente a otra cosa.',
    trapWarning: 'Recuerda: "Complimentary" (con i) también significa "gratuito / de cortesía" (complimentary breakfast).',
    pairs: [
      {
        word: 'compliment',
        partOfSpeech: 'noun / verb',
        meaningEs: 'cumplido / halago / elogiar',
        example: 'The client paid our staff a wonderful compliment on their speedy service.'
      },
      {
        word: 'complement',
        partOfSpeech: 'noun / verb',
        meaningEs: 'complemento / complementar armónicamente',
        example: 'The new mobile app perfectly complements our existing desktop platform.'
      }
    ]
  },
  {
    id: 'hom-08',
    title: 'Advice vs Advise',
    phonetic: '/ədˈvaɪs/ (s) vs /ədˈvaɪz/ (z)',
    explanation: '"Advice" es sustantivo incontable (un consejo / recomendaciones). "Advise" es el verbo (aconsejar / recomendar).',
    trapWarning: '¡"Advice" NUNCA lleva plural con s ("advices" no existe en inglés)! Si quieres decir varios consejos, se dice "pieces of advice".',
    pairs: [
      {
        word: 'advice',
        partOfSpeech: 'noun (incontable)',
        meaningEs: 'consejo / recomendación',
        example: 'She gave us valuable advice on how to improve our presentation.'
      },
      {
        word: 'advise',
        partOfSpeech: 'verb',
        meaningEs: 'aconsejar / asesorar',
        example: 'The travel specialist advised us to arrive at the airport three hours early.'
      }
    ]
  }
];

// ----------------------------------------------------------------------
// 4. ESTRATEGIAS OFICIALES Y TRAMPAS DEL EXAMEN (INFOGRAFÍA)
// ----------------------------------------------------------------------
export const EXAM_STRATEGIES: ExamStrategy[] = [
  {
    id: 's-01',
    partNumber: 1,
    partName: 'Parte 1: Fotografías (Photographs)',
    section: 'listening',
    goldenRule: 'Regla de Oro: Solo lo que se VE indiscutiblemente es correcto. Nunca asumas intenciones, motivos ni pensamientos de las personas.',
    commonTraps: [
      'Trampa del Sonido Similar: El audio incluye una palabra que rima con un objeto visible (ej. "tree" cuando hay un "train").',
      'Acción Incorrecta: Describe una persona con un objeto correcto, pero haciendo una acción falsa (ej. "holding a pen" cuando solo está mirando un papel).',
      'Confusión de Sujeto: La acción es verdadera, pero la ejecuta otra persona que no aparece en la foto.',
      'Detalle hiper-específico no visible: "He is thinking about his family" (imposible de verificar visualmente).'
    ],
    tactics: [
      { step: 'Paso 1 (Durante la intro)', description: 'Escanea la imagen en 3 segundos: ¿Personas o solo objetos/paisaje? Si hay personas, identifica su acción principal y vestimenta.' },
      { step: 'Paso 2 (Al escuchar)', description: 'Mantén los ojos en la fotografía y usa la técnica de eliminación con los dedos: descarta inmediatamente opciones absurdas.' },
      { step: 'Paso 3 (Decisión rápida)', description: 'Si dudas entre dos, elige la opción que use verbos de estado simple o voz pasiva descriptiva simple.' }
    ],
    timeManagement: 'Tienes exactamente 5 segundos de silencio entre cada foto. Responde en el segundo 1 y enfoca tus ojos en la foto siguiente.'
  },
  {
    id: 's-02',
    partNumber: 2,
    partName: 'Parte 2: Pregunta - Respuesta (Question - Response)',
    section: 'listening',
    goldenRule: 'Regla de Oro: La primera palabra de la pregunta (Who, Where, When, Why, How, Did, Is) decide el 80% del éxito.',
    commonTraps: [
      'Trampa de la Misma Palabra: La opción de respuesta repite exactamente una palabra de la pregunta con un significado diferente (casi siempre es FALSA).',
      'Sí/No a una pregunta Wh-: Si la pregunta empieza con When, Where, Who, etc., NUNCA puede responderse con "Yes" o "No".',
      'Confusión Temporal: Preguntan con "When" (tiempo) y responden con un lugar ("At the 3rd floor").',
      'Respuestas Indirectas Modernas: En el TOEIC actual, muchas respuestas no son directas (ej: "¿Dónde está la engrapadora?" ➔ "Pregúntale a María, ella la usó").'
    ],
    tactics: [
      { step: 'Paso 1 (Escucha activa)', description: 'Anota mentalmente la primera palabra (Where, When, Could you...).' },
      { step: 'Paso 2 (Filtro de exclusión)', description: 'Descarta cualquier opción que repita la misma palabra clave de la pregunta; es el distractor número 1 de ETS.' },
      { step: 'Paso 3 (Acepta lo indirecto)', description: 'Si las opciones obvias no cuadran, busca la respuesta educada indirecta o que redirija la acción.' }
    ],
    timeManagement: 'No hay tiempo de pausa: 3 opciones habladas consecutivas. Elige tu letra mentalmente de inmediato.'
  },
  {
    id: 's-03',
    partNumber: 5,
    partName: 'Parte 5: Oraciones Incompletas (Incomplete Sentences)',
    section: 'reading',
    goldenRule: 'Regla de Oro: No leas toda la oración desde el inicio si es una pregunta gramatical. Identifica primero si el problema es de Gramática o de Vocabulario.',
    commonTraps: [
      'Diferenciación por opciones: Si las 4 opciones son la misma raíz con terminaciones distintas (decide, decision, decisive, decisively), es 100% GRAMÁTICA.',
      'Si las 4 opciones son palabras totalmente distintas, es una pregunta de VOCABULARIO y contexto.',
      'Sujetos lejanos con modificadores: El sujeto está al inicio y el verbo al final separado por una frase preposicional larga.'
    ],
    tactics: [
      { step: 'Paso 1 (Mira las opciones)', description: 'Determina si te piden tipo de palabra (sustantivo, adjetivo, adverbio) o significado.' },
      { step: 'Paso 2 (Analiza el entorno del espacio)', description: 'Mira solo la palabra inmediatamente anterior y la posterior al espacio en blanco.' },
      { step: 'Paso 3 (Aplica la regla)', description: 'Artículo + _____ + Sustantivo = requiere Adjetivo. Verbo + _____ = requiere Adverbio.' }
    ],
    timeManagement: 'Dedica un promedio de 25 a 30 segundos por pregunta. Las 30 preguntas deben completarse en un máximo de 15 minutos.'
  },
  {
    id: 's-04',
    partNumber: 7,
    partName: 'Parte 7: Comprensión Lectora (Reading Comprehension)',
    section: 'reading',
    goldenRule: 'Regla de Oro: Lee primero las PREGUNTAS (no las opciones) antes de leer el texto para saber qué buscar.',
    commonTraps: [
      'Textos dobles y triples: La respuesta a la pregunta 3 o 4 casi siempre requiere CRUZAR información de dos textos diferentes.',
      'Respuestas con palabras idénticas al texto: A menudo son trampas fuera de contexto; la respuesta correcta suele parafrasear con sinónimos.',
      'Información verdadera en el texto pero que NO responde a la pregunta formulada.'
    ],
    tactics: [
      { step: 'Paso 1 (Lectura de preguntas)', description: 'Lee las 2 o 3 preguntas e identifica palabras clave (nombres de personas, fechas, números).' },
      { step: 'Paso 2 (Escaneo veloz / Skimming)', description: 'Busca visualmente las palabras clave en el texto.' },
      { step: 'Paso 3 (Cruce de textos)', description: 'En pasajes múltiples, si un texto tiene un recibo o itinerario y el otro un email, localiza la referencia cruzada.' }
    ],
    timeManagement: 'Dispones de 55 minutos para toda la Parte 7. Asigna unos 2.5 minutos por texto simple y 4.5 minutos por texto múltiple.'
  }
];
