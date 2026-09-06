export interface GrammarRule {
  id: string;
  title: string;
  titleEn: string;
  category: 'grammar';
  summary: string;
  explanation: string;
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

export const GRAMMAR_RULES: GrammarRule[] = [
  {
    id: 'g-01',
    title: 'Present Perfect vs Past Simple',
    titleEn: 'Present Perfect vs. Past Simple',
    category: 'grammar',
    summary: 'Distinción clave entre acciones terminadas en un tiempo específico del pasado y acciones con impacto en el presente.',
    explanation: 'El Past Simple se utiliza cuando hay una referencia temporal específica y cerrada (yesterday, last month, in 2023, two days ago). El Present Perfect (have/has + past participle) se usa para experiencias de vida, acciones recientes con impacto actual, o periodos de tiempo que aún continúan (since, for, already, yet, recently).',
    keyFormula: 'Past Simple: Sujeto + V-ed/irregular + tiempo específico | Present Perfect: Sujeto + have/has + V-pp + since/recently',
    examples: [
      {
        correct: 'Mr. Davis has recently approved the quarterly expenditure budget.',
        incorrect: 'Mr. Davis has approved the budget yesterday.',
        explanation: '"Yesterday" exige Past Simple ("Mr. Davis approved the budget yesterday"). "Recently" o "already" requieren Present Perfect.'
      },
      {
        correct: 'Our logistics team opened three new regional warehouses last year.',
        incorrect: 'Our logistics team has opened three new regional warehouses last year.',
        explanation: 'La frase temporal cerrada "last year" imposibilita el uso del Present Perfect en el TOEIC.'
      }
    ],
    toeicTip: 'Si ves palabras como "since [año/mes]" o "over the past few years", la respuesta casi siempre es Present Perfect. Si ves "ago", "last [semana/mes]" o "in [año pasado]", elige Past Simple.'
  },
  {
    id: 'g-02',
    title: 'Voz Pasiva en Documentos Corporativos',
    titleEn: 'Passive Voice in Corporate Contexts',
    category: 'grammar',
    summary: 'La forma impersonal por excelencia del lenguaje de negocios y avisos formales en el TOEIC.',
    explanation: 'En el inglés comercial, el énfasis recae en la acción o el objeto afectado más que en la persona que la ejecuta. Se forma con el verbo "to be" en el tiempo correspondiente + el Participio Pasado del verbo principal.',
    keyFormula: 'Sujeto Paciente + [am/is/are/was/were/has been/will be] + Past Participle (+ by agente)',
    examples: [
      {
        correct: 'All expense reimbursement requests must be submitted by Friday afternoon.',
        incorrect: 'All expense reimbursement requests must submit by Friday afternoon.',
        explanation: 'Las solicitudes no se envían a sí mismas; son enviadas por los empleados, por lo que requiere voz pasiva ("must be submitted").'
      },
      {
        correct: 'The revised software guidelines were distributed to all department heads.',
        explanation: 'Forma pasiva en pasado simple que indica distribución oficial de un documento corporativo.'
      }
    ],
    toeicTip: 'Pregúntate siempre: ¿El sujeto puede realizar la acción por sí mismo? Si el sujeto es inanimado (report, package, contract, invoice), casi con seguridad la opción correcta será pasiva.'
  },
  {
    id: 'g-03',
    title: 'Gerundios vs Infinitivos',
    titleEn: 'Gerunds vs. Infinitives after Verbs',
    category: 'grammar',
    summary: 'Saber si un verbo rige gerundio (-ing) o infinitivo con "to" es una de las preguntas fijas en Parte 5 y 6.',
    explanation: 'Ciertos verbos de negocios siempre van seguidos de gerundio (consider, postpone, recommend, suggest, delay, appreciate, avoid). Otros siempre exigen infinitivo con to (decide, plan, intend, agree, refuse, afford, offer, promise). Además, toda preposición (in, on, at, about, without, before, after) va seguida obligatoriamente de gerundio (-ing).',
    keyFormula: 'Verbo + V-ing (consider, postpone) | Verbo + to-V (plan, decide) | Preposición + V-ing',
    examples: [
      {
        correct: 'The board of directors is considering expanding operations into Southeast Asia.',
        incorrect: 'The board of directors is considering to expand operations...',
        explanation: '"Consider" siempre rige gerundio (-ing).'
      },
      {
        correct: 'We look forward to meeting your executive delegation next week.',
        incorrect: 'We look forward to meet your executive delegation...',
        explanation: '¡Trampa clásica de TOEIC! En "look forward to", la palabra "to" es una preposición, por lo que requiere gerundio ("meeting").'
      }
    ],
    toeicTip: 'Memoriza estas tres expresiones fijas del TOEIC con -ing: "look forward to + V-ing", "be committed to + V-ing" y "in addition to + V-ing". Salen constantemente.'
  },
  {
    id: 'g-04',
    title: 'Conectores Lógicos: Contraste y Causa',
    titleEn: 'Logical Connectors: Contrast, Cause & Addition',
    category: 'grammar',
    summary: 'Distinguir entre conjunciones subordinantes (con oración completa) y preposiciones (con sustantivo o frase nominal).',
    explanation: 'El TOEIC adora poner como opciones palabras con el mismo significado pero distinta categoría gramatical. "Although/Even though" requieren Sujeto + Verbo. "Despite/In spite of" requieren solo un sustantivo o gerundio. "Because/Since" requieren Sujeto + Verbo, mientras que "Because of/Due to" van seguidas de sustantivo.',
    keyFormula: 'Although / Even though / While + [Sujeto + Verbo] | Despite / In spite of + [Sustantivo / V-ing]',
    examples: [
      {
        correct: 'Despite the severe flight delay, the CEO arrived on time for the annual keynote.',
        incorrect: 'Although the severe flight delay, the CEO arrived...',
        explanation: '"The severe flight delay" es un sintagma nominal sin verbo conjugado; por ende, requiere la preposición "Despite".'
      },
      {
        correct: 'Although traffic was exceptionally heavy, the delivery truck arrived before noon.',
        incorrect: 'Despite traffic was exceptionally heavy...',
        explanation: '"Traffic was exceptionally heavy" tiene sujeto y verbo ("was"), por lo que requiere "Although".'
      }
    ],
    toeicTip: 'Revisa lo que viene inmediatamente después del espacio en blanco. Si hay un verbo conjugado (is, was, has, were), busca conjunciones como Although/Because. Si no hay verbo, elige Despite/Due to.'
  },
  {
    id: 'g-05',
    title: 'Preposiciones Temporales Confusas',
    titleEn: 'Time Prepositions: By, Until, During, For, Within',
    category: 'grammar',
    summary: 'Preposiciones clave para plazos de entrega, reuniones y vigencia de contratos en el entorno laboral.',
    explanation: '"By" significa "a más tardar en" (fecha límite para una acción puntual). "Until" indica una acción que continúa ininterrumpidamente hasta un momento específico. "During" responde a "cuándo" (durante un evento o sustantivo: during the conference). "For" responde a "por cuánto tiempo" (con duración numérica: for three months). "Within" indica "dentro de un plazo máximo" (within 30 days).',
    keyFormula: 'By + deadline (límite) | Until + momento (continuidad) | During + evento | For + duración | Within + periodo',
    examples: [
      {
        correct: 'Please submit your finalized quarterly expense spreadsheet by Friday at 5:00 PM.',
        incorrect: 'Please submit your spreadsheet until Friday at 5:00 PM.',
        explanation: 'La entrega es una acción puntual que tiene una fecha límite; por eso se usa "by".'
      },
      {
        correct: 'The human resources office will remain closed until next Monday morning.',
        explanation: 'Estar cerrado es un estado continuo que se mantiene hasta el lunes ("until").'
      }
    ],
    toeicTip: 'Con verbos de entrega o finalización puntual (submit, finish, return, arrive, complete) usa "by". Con verbos de estado continuo (wait, stay, remain, delay) usa "until".'
  },
  {
    id: 'g-06',
    title: 'Modales de Cortesía y Condicionales en Negocios',
    titleEn: 'Business Modals & Conditional Structures',
    category: 'grammar',
    summary: 'Expresión de solicitudes formales, acuerdos y situaciones hipotéticas de negocios.',
    explanation: 'En el TOEIC, las solicitudes formales usan "Could you please...", "Would you be able to...", y "May I suggest...". En condicionales, el primer condicional (If + presente, will + verbo) se usa para acuerdos comerciales reales; el segundo condicional (If + pasado, would + verbo) para escenarios hipotéticos.',
    keyFormula: 'Primer Condicional: If + Present Simple, Will/Can + Infinitivo | Inversión: Should you have questions, please contact...',
    examples: [
      {
        correct: 'Should you require further assistance with your account, please contact customer support.',
        explanation: 'Estructura formal muy frecuente en correos del TOEIC: equivale a "If you should require...".'
      },
      {
        correct: 'If the supplier offers a 10% volume discount, we will sign the procurement agreement.',
        explanation: 'Primer condicional clásico para negociaciones comerciales.'
      }
    ],
    toeicTip: 'Si una oración en Parte 5 o 6 empieza con "Should", "Were" o "Had" sin signo de interrogación, se trata de una inversión condicional formal (ej. "Should you need..." = "If you need...").'
  }
];

export const VOCABULARY_TOPICS: VocabularyTopic[] = [
  {
    id: 'v-01',
    title: 'Recursos Humanos y Contratación',
    titleEn: 'Human Resources & Recruitment',
    category: 'vocabulary',
    description: 'Vocabulario esencial sobre puestos de trabajo, entrevistas, beneficios laborales y evaluaciones.',
    terms: [
      {
        word: 'Applicant',
        partOfSpeech: 'noun',
        meaningEs: 'Candidato, postulante a un empleo',
        collocations: ['qualified applicant', 'job applicant', 'review applicant profiles'],
        example: 'The hiring manager received over two hundred resumes from qualified applicants.'
      },
      {
        word: 'Compensation',
        partOfSpeech: 'noun',
        meaningEs: 'Remuneración salarial y paquete de compensaciones',
        collocations: ['competitive compensation', 'compensation package', 'workers compensation'],
        example: 'The firm offers competitive compensation alongside comprehensive medical benefits.'
      },
      {
        word: 'Vacancy',
        partOfSpeech: 'noun',
        meaningEs: 'Vacante, puesto de trabajo disponible',
        collocations: ['job vacancy', 'fill a vacancy', 'unexpected vacancy'],
        example: 'Due to recent company expansion, there is an immediate vacancy in the accounting branch.'
      },
      {
        word: 'Evaluate',
        partOfSpeech: 'verb',
        meaningEs: 'Evaluar, valorar el desempeño laboral',
        collocations: ['evaluate performance', 'annual evaluation', 'thoroughly evaluate'],
        example: 'Supervisors will evaluate employee performance during the quarterly review meeting.'
      }
    ]
  },
  {
    id: 'v-02',
    title: 'Finanzas, Presupuesto y Facturación',
    titleEn: 'Finance, Budgeting & Billing',
    category: 'vocabulary',
    description: 'Términos bancarios, de costos, contabilidad y rendición de gastos en el ámbito comercial.',
    terms: [
      {
        word: 'Invoice',
        partOfSpeech: 'noun / verb',
        meaningEs: 'Factura comercial / emitir factura',
        collocations: ['issue an invoice', 'pay an invoice', 'outstanding invoice'],
        example: 'Please verify the line items on the vendor invoice before forwarding it to accounting.'
      },
      {
        word: 'Expenditure',
        partOfSpeech: 'noun',
        meaningEs: 'Gasto, desembolso económico',
        collocations: ['annual expenditure', 'cut expenditures', 'capital expenditure'],
        example: 'Management aims to decrease operating expenditures by 15% before the next fiscal quarter.'
      },
      {
        word: 'Reimburse',
        partOfSpeech: 'verb',
        meaningEs: 'Reembolsar, reintegrar gastos de trabajo',
        collocations: ['reimburse travel expenses', 'seek reimbursement', 'fully reimbursed'],
        example: 'The company will reimburse all reasonable meals purchased during authorized business trips.'
      },
      {
        word: 'Audit',
        partOfSpeech: 'noun / verb',
        meaningEs: 'Auditoría financiera / auditar cuentas',
        collocations: ['conduct an audit', 'internal audit', 'independent audit team'],
        example: 'An independent accounting firm conducted an annual financial audit of all company records.'
      }
    ]
  },
  {
    id: 'v-03',
    title: 'Compras, Envíos y Logística',
    titleEn: 'Procurement, Shipping & Logistics',
    category: 'vocabulary',
    description: 'Vocabulario sobre cadenas de suministro, almacenes, despacho y control de inventario.',
    terms: [
      {
        word: 'Shipment',
        partOfSpeech: 'noun',
        meaningEs: 'Envío de mercancías, cargamento despachado',
        collocations: ['track a shipment', 'expedited shipment', 'delay in shipment'],
        example: 'Customers will receive an automated tracking notification as soon as their shipment departs.'
      },
      {
        word: 'Inventory',
        partOfSpeech: 'noun',
        meaningEs: 'Inventario, existencias en almacén',
        collocations: ['conduct inventory', 'inventory count', 'low inventory levels'],
        example: 'Warehouse staff must perform a comprehensive inventory audit every six months.'
      },
      {
        word: 'Defective',
        partOfSpeech: 'adjective',
        meaningEs: 'Defectuoso, con fallas de fabricación',
        collocations: ['defective merchandise', 'defective parts', 'replace defective goods'],
        example: 'The electronics retailer will replace any defective components covered under the warranty.'
      },
      {
        word: 'Supplier',
        partOfSpeech: 'noun',
        meaningEs: 'Proveedor comercial',
        collocations: ['reliable supplier', 'negotiate with suppliers', 'supplier agreement'],
        example: 'We decided to switch to an alternative supplier capable of offering shorter lead times.'
      }
    ]
  },
  {
    id: 'v-04',
    title: 'Falsos Amigos Frecuentes en el TOEIC',
    titleEn: 'Common False Friends & Traps',
    category: 'vocabulary',
    description: 'Palabras que se parecen al español pero tienen significados empresariales completamente distintos.',
    terms: [
      {
        word: 'Attend',
        partOfSpeech: 'verb',
        meaningEs: 'Asistir (a una reunión o evento) — NO significa "atender"',
        collocations: ['attend a conference', 'attend a seminar', 'attendance record'],
        example: 'All department managers are required to attend the safety briefing on Tuesday.'
      },
      {
        word: 'Assist',
        partOfSpeech: 'verb',
        meaningEs: 'Ayudar, colaborar — NO significa "asistir a un lugar"',
        collocations: ['assist a client', 'assist with preparations', 'administrative assistant'],
        example: 'A technical representative will assist you with setting up your cloud database.'
      },
      {
        word: 'Currently',
        partOfSpeech: 'adverb',
        meaningEs: 'Actualmente, en este momento — NO significa "en realidad"',
        collocations: ['currently available', 'currently undergoing repairs', 'currently employed'],
        example: 'Our IT specialists are currently upgrading the network firewall.'
      },
      {
        word: 'Resume / Résumé',
        partOfSpeech: 'noun / verb',
        meaningEs: 'Currículum vitae (sustantivo) / Reanudar (verbo) — NO significa "resumir"',
        collocations: ['submit a résumé', 'resume negotiations', 'resume work'],
        example: 'Please send your updated résumé and cover letter directly to the personnel director.'
      },
      {
        word: 'Notice',
        partOfSpeech: 'noun / verb',
        meaningEs: 'Aviso, notificación previa / Notar — NO significa "noticia" (news)',
        collocations: ['give two weeks notice', 'until further notice', 'short notice'],
        example: 'The regional flight schedule will remain altered until further notice.'
      }
    ]
  }
];

export const EXAM_STRATEGIES: ExamStrategy[] = [
  {
    id: 's-01',
    partNumber: 1,
    partName: 'Fotografías (Photographs)',
    section: 'listening',
    goldenRule: 'No hagas suposiciones. Solo es correcto lo que se puede verificar visualmente al 100%.',
    commonTraps: [
      'Palabras con sonido similar pero significado incorrecto (ej. "packing" vs "parking").',
      'Acciones que parecen lógicas pero que no están ocurriendo en el instante de la foto.',
      'Sujetos erróneos realizando una acción que sí ocurre en la imagen.'
    ],
    tactics: [
      {
        step: 'Paso 1 (3 segundos)',
        description: 'En cuanto aparezca la imagen, identifica: ¿Cuántas personas hay? ¿Qué están tocando o sosteniendo? ¿En qué entorno están (oficina, calle, tienda)?'
      },
      {
        step: 'Paso 2 (Durante el audio)',
        description: 'Mantén tus ojos en la foto mientras escuchas las 4 opciones (A, B, C, D). Descarta inmediatamente las que mencionen objetos que no existan.'
      },
      {
        step: 'Paso 3',
        description: 'Elige de inmediato. No te quedes dudando porque la siguiente foto comenzará a reproducirse.'
      }
    ],
    timeManagement: 'Aproximadamente 5 segundos por fotografía.'
  },
  {
    id: 's-02',
    partNumber: 2,
    partName: 'Pregunta - Respuesta (Question - Response)',
    section: 'listening',
    goldenRule: 'La primera palabra de la pregunta (Where, When, Who, Why, How, Did, Can) define el 80% de la respuesta.',
    commonTraps: [
      'Trampa del Eco: Si una opción repite la misma palabra exacta de la pregunta, en un 90% de los casos es una distracción.',
      'Palabras con rima o homófonos (ej. "write" en la pregunta y "right" en la respuesta).',
      'Responder con "Yes" o "No" a una pregunta que empieza con Wh- (Where, When, Who...).'
    ],
    tactics: [
      {
        step: 'Identificar el tipo de pregunta',
        description: '¿Es de información (Where = lugar, When = tiempo, Who = persona)? ¿O es una pregunta cerrada de Sí/No (Has, Do, Are)?'
      },
      {
        step: 'Esperar respuestas indirectas',
        description: 'El TOEIC moderno usa muchas respuestas conversacionales realistas: "Where is the printer paper?" -> "I think Sarah ordered some yesterday" en vez de "In the cabinet".'
      }
    ],
    timeManagement: 'Todo ocurre en audio puro. Tienes 5 segundos entre preguntas.'
  },
  {
    id: 's-03',
    partNumber: 3,
    partName: 'Conversaciones y Charlas Breves (Parts 3 & 4)',
    section: 'listening',
    goldenRule: 'Aprovecha los 8-10 segundos de introducción para leer las 3 preguntas antes de que empiece el audio.',
    commonTraps: [
      'Mencionar información de los distractores que solo se dijo como comentario pasajero.',
      'Confundir quién habla (el hombre vs la mujer).'
    ],
    tactics: [
      {
        step: 'Pre-lectura táctica',
        description: 'Subraya mentalmente las palabras clave de las 3 preguntas (¿Quién es el orador? ¿Cuál es el problema? ¿Qué pasará después?).'
      },
      {
        step: 'Responder en tiempo real',
        description: 'Responde la pregunta 1 al inicio del diálogo, la pregunta 2 a la mitad, y la 3 al final. Nunca esperes a que termine todo el audio para empezar a leer las preguntas.'
      }
    ],
    timeManagement: 'Responde mientras escuchas; cuando el narrador lea las preguntas, tú ya debes estar pre-leyendo el siguiente diálogo.'
  },
  {
    id: 's-05',
    partNumber: 5,
    partName: 'Oraciones Incompletas (Incomplete Sentences)',
    section: 'reading',
    goldenRule: 'Clasifica en 2 segundos si la pregunta es de Gramática o de Vocabulario.',
    commonTraps: [
      'Confundir sustantivo con adjetivo derivado (economic vs economical).',
      'Olvidar que las preposiciones exigen gerundio (-ing).'
    ],
    tactics: [
      {
        step: 'Si las 4 opciones tienen la misma raíz',
        description: 'Ejemplo: (A) decide, (B) decision, (C) decisively, (D) decisive. Es una pregunta de GRAMÁTICA. Mira la posición sintáctica alrededor del espacio (ej. después de un artículo "the" va un sustantivo).'
      },
      {
        step: 'Si las 4 opciones son palabras totalmente distintas',
        description: 'Es una pregunta de VOCABULARIO. Lee el contexto de la oración y busca la colocación habitual en negocios.'
      }
    ],
    timeManagement: 'Máximo 25 a 30 segundos por pregunta. Son 30 preguntas que debes resolver en 15 minutos.'
  },
  {
    id: 's-07',
    partNumber: 7,
    partName: 'Comprensión de Lectura (Reading Comprehension)',
    section: 'reading',
    goldenRule: 'Lee primero las preguntas, luego escanea el texto en busca de las palabras clave.',
    commonTraps: [
      'En pasajes dobles y triples, asumir que toda la respuesta está en un solo texto. La respuesta clave suele requerir cruzar datos (ej. un aviso de conferencia en el texto 1 + un email de reserva en el texto 2).',
      'Distractores que copian frases literales del texto pero responden a otra pregunta.'
    ],
    tactics: [
      {
        step: 'Identificar el tipo de texto',
        description: '¿Es un correo electrónico? Mira el Remitente (From), Destinatario (To) y Asunto (Subject) en 2 segundos.'
      },
      {
        step: 'Preguntas de vocabulario en contexto',
        description: 'Para "The word X in paragraph 2 is closest in meaning to...", sustituye mentalmente las 4 opciones en el texto para ver cuál mantiene el sentido exacto del negocio.'
      }
    ],
    timeManagement: 'Asigna 48-50 minutos para los 54 ítems de Parte 7. No te atores en una pregunta difícil; márcala y continúa.'
  }
];
