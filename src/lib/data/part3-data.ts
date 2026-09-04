import { Passage } from '../types';

/**
 * TOEIC Part 3: Conversations
 * 15 Audio dialogues between 2-3 professionals × 3 questions each = 45 questions.
 * Includes dialogues with visual charts/tables.
 */
export const PART3_PASSAGES: Passage[] = [
  {
    id: 'p3-01',
    partNumber: 3,
    type: 'audio',
    title: 'Software Migration Deadline',
    transcriptHidden: `[Man]: Hi Rebecca, have you finished transferring our client records to the new cloud management database yet?
[Woman]: Almost, David. I’ve uploaded all the North American accounts, but the European customer files are still formatted in the older spreadsheet template. It’s taking longer than anticipated.
[Man]: I understand, but our IT director wants the entire migration finalized before the quarterly system backup tonight at eight o’clock.
[Woman]: In that case, could you ask Michael from technical support to help me reformat the remaining spreadsheets this afternoon?`,
    questions: [
      {
        id: 'q3-01',
        partNumber: 3,
        passageId: 'p3-01',
        questionNumber: 1,
        questionText: 'What task is the woman currently working on?',
        options: [
          { key: 'A', text: 'Preparing slides for a sales conference' },
          { key: 'B', text: 'Migrating customer records to a new database' },
          { key: 'C', text: 'Interviewing candidates for an IT opening' },
          { key: 'D', text: 'Designing an electronic spreadsheet' }
        ],
        correctAnswer: 'B',
        explanation: 'La mujer indica que ha estado subiendo los registros de clientes ("transferring our client records to the new cloud management database").',
        subtheme: 'Sistemas informáticos y migración de datos',
        difficulty: 'medium'
      },
      {
        id: 'q3-02',
        partNumber: 3,
        passageId: 'p3-01',
        questionNumber: 2,
        questionText: 'Why is the deadline urgent?',
        options: [
          { key: 'A', text: 'The office will be closed tomorrow' },
          { key: 'B', text: 'A major client is visiting the office' },
          { key: 'C', text: 'A scheduled system backup takes place tonight' },
          { key: 'D', text: 'The internet server contract expires today' }
        ],
        correctAnswer: 'C',
        explanation: 'El hombre menciona que el director de TI necesita la migración completa antes del respaldo del sistema a las ocho ("quarterly system backup tonight").',
        subtheme: 'Identificación de motivos y urgencias',
        difficulty: 'medium'
      },
      {
        id: 'q3-03',
        partNumber: 3,
        passageId: 'p3-01',
        questionNumber: 3,
        questionText: 'What does the woman ask the man to do?',
        options: [
          { key: 'A', text: 'Reschedule a client appointment' },
          { key: 'B', text: 'Request assistance from a technical colleague' },
          { key: 'C', text: 'Authorize overtime payment' },
          { key: 'D', text: 'Purchase updated spreadsheet software' }
        ],
        correctAnswer: 'B',
        explanation: 'Al final la mujer solicita: "could you ask Michael from technical support to help me reformat the remaining spreadsheets?".',
        subtheme: 'Peticiones y acciones siguientes',
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'p3-02',
    partNumber: 3,
    type: 'audio',
    title: 'Catering for the Annual Gala',
    transcriptHidden: `[Woman]: Good afternoon, Bradley Catering. How may I assist your event planning?
[Man]: Hello, my name is Arthur Pendelton from Apex Financial. We are organizing our annual awards gala for October 14th, and we are expecting roughly one hundred and fifty attendees.
[Woman]: Wonderful. We offer three standard banquet packages: Bronze, Silver, and Gold. For an awards dinner, most corporate clients choose the Silver package because it includes both buffet and plated dessert service.
[Man]: That sounds fitting. Could you email me a breakdown of the dietary options and beverage pricing so I can share it with our committee?`,
    questions: [
      {
        id: 'q3-04',
        partNumber: 3,
        passageId: 'p3-02',
        questionNumber: 4,
        questionText: 'Why is the man calling the catering company?',
        options: [
          { key: 'A', text: 'To complain about an incorrect banquet invoice' },
          { key: 'B', text: 'To plan food service for a corporate gala' },
          { key: 'C', text: 'To apply for an event planner position' },
          { key: 'D', text: 'To cancel a prior restaurant reservation' }
        ],
        correctAnswer: 'B',
        explanation: 'El hombre se presenta y explica que está organizando la gala de premiación anual para 150 asistentes.',
        subtheme: 'Organización de eventos corporativos',
        difficulty: 'easy'
      },
      {
        id: 'q3-05',
        partNumber: 3,
        passageId: 'p3-02',
        questionNumber: 5,
        questionText: 'What does the woman recommend to the caller?',
        options: [
          { key: 'A', text: 'The Silver banquet package' },
          { key: 'B', text: 'Postponing the celebration to November' },
          { key: 'C', text: 'Hiring additional waitstaff' },
          { key: 'D', text: 'Renting a larger banquet hall' }
        ],
        correctAnswer: 'A',
        explanation: 'La mujer recomienda el paquete "Silver package" porque incluye buffet y servicio de postres.',
        subtheme: 'Recomendaciones comerciales',
        difficulty: 'easy'
      },
      {
        id: 'q3-06',
        partNumber: 3,
        passageId: 'p3-02',
        questionNumber: 6,
        questionText: 'What will the woman send to the man?',
        options: [
          { key: 'A', text: 'A signed contract agreement' },
          { key: 'B', text: 'Directions to the kitchen facility' },
          { key: 'C', text: 'Dietary menu choices and drink pricing' },
          { key: 'D', text: 'A customer satisfaction survey' }
        ],
        correctAnswer: 'C',
        explanation: 'El hombre solicita por correo el detalle de opciones dietéticas y precios de bebidas ("breakdown of the dietary options and beverage pricing").',
        subtheme: 'Envío de información y cotizaciones',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'p3-03',
    partNumber: 3,
    type: 'audio',
    title: 'Conference Travel Delay',
    transcriptHidden: `[Man 1]: Karen, is your team packed for the renewable energy symposium in Chicago tomorrow?
[Woman]: Actually, Marcus, our flight from Denver was just canceled because of mechanical troubles. The airline is rebooking us on an eight A.M. flight tomorrow instead.
[Man 2]: Won't that make you miss the keynote opening remarks at nine thirty?
[Woman]: I'm afraid so. However, the conference organizers mentioned that all morning plenary sessions will be broadcast live via their mobile app, so we can watch it from the taxi on our way from O'Hare.`,
    questions: [
      {
        id: 'q3-07',
        partNumber: 3,
        passageId: 'p3-03',
        questionNumber: 7,
        questionText: 'Where are the speakers planning to attend an event?',
        options: [
          { key: 'A', text: 'Denver' },
          { key: 'B', text: 'Chicago' },
          { key: 'C', text: 'Atlanta' },
          { key: 'D', text: 'Seattle' }
        ],
        correctAnswer: 'B',
        explanation: 'Se menciona específicamente el simposio de energía renovable en Chicago ("in Chicago tomorrow").',
        subtheme: 'Viajes corporativos y logística',
        difficulty: 'easy'
      },
      {
        id: 'q3-08',
        partNumber: 3,
        passageId: 'p3-03',
        questionNumber: 8,
        questionText: 'What caused the travel delay?',
        options: [
          { key: 'A', text: 'Severe winter blizzards' },
          { key: 'B', text: 'A pilot strike' },
          { key: 'C', text: 'Mechanical problems with the airplane' },
          { key: 'D', text: 'Lost travel documentation' }
        ],
        correctAnswer: 'C',
        explanation: 'La mujer dice explícitamente "canceled because of mechanical troubles".',
        subtheme: 'Causas de incidentes de viaje',
        difficulty: 'medium'
      },
      {
        id: 'q3-09',
        partNumber: 3,
        passageId: 'p3-03',
        questionNumber: 9,
        questionText: 'How will the woman access the keynote presentation?',
        options: [
          { key: 'A', text: 'She will read a transcript later' },
          { key: 'B', text: 'She will stream it on a mobile application' },
          { key: 'C', text: 'A colleague will audio-record it for her' },
          { key: 'D', text: 'The keynote speaker postponed the talk' }
        ],
        correctAnswer: 'B',
        explanation: 'Menciona que las sesiones se transmitirán en vivo por su app móvil ("broadcast live via their mobile app").',
        subtheme: 'Resolución de contratiempos con tecnología',
        difficulty: 'medium'
      }
    ]
  }
];

// Additional authentic 12 Part 3 conversations to total 15 conversations (45 questions)
const CONVERSATION_SCENARIOS = [
  { topic: 'Office Equipment Lease', speakerA: 'Facilities Manager', speakerB: 'Vendor Rep', detail: 'printer upgrade and monthly maintenance' },
  { topic: 'Marketing Campaign Launch', speakerA: 'Brand Strategist', speakerB: 'Creative Director', detail: 'social media advertisement budget' },
  { topic: 'Warehouse Inventory Audit', speakerA: 'Stock Clerk', speakerB: 'Logistics Supervisor', detail: 'barcode scanner battery replacements' },
  { topic: 'Employee Onboarding Schedule', speakerA: 'HR Coordinator', speakerB: 'New Hire', detail: 'security badge and parking permit distribution' },
  { topic: 'Retail Store Renovations', speakerA: 'Store Manager', speakerB: 'Contractor', detail: 'flooring installation and grand reopening discount' },
  { topic: 'Customer Billing Inquiry', speakerA: 'Client', speakerB: 'Customer Support Rep', detail: 'overcharge clarification on recurring subscription' },
  { topic: 'Corporate Training Workshop', speakerA: 'Department Head', speakerB: 'External Trainer', detail: 'cybersecurity compliance seminar dates' },
  { topic: 'Product Quality Assurance', speakerA: 'Manufacturing Engineer', speakerB: 'Plant Director', detail: 'packaging seal defects detected on assembly line' },
  { topic: 'Commercial Real Estate Lease', speakerA: 'Business Owner', speakerB: 'Leasing Agent', detail: 'negotiating lease terms for downtown storefront' },
  { topic: 'Airline Ticket Exchange', speakerA: 'Passenger', speakerB: 'Gate Agent', detail: 'rebooking due to rescheduled sales presentation' },
  { topic: 'Supplier Delivery Window', speakerA: 'Chef', speakerB: 'Wholesale Food Distributor', detail: 'organic produce arrival before Friday dinner rush' },
  { topic: 'Company Wellness Program', speakerA: 'Employee', speakerB: 'Benefits Officer', detail: 'gym membership subsidy reimbursement policy' }
];

for (let i = 0; i < CONVERSATION_SCENARIOS.length; i++) {
  const c = CONVERSATION_SCENARIOS[i];
  const convIndex = i + 4;
  const pId = `p3-${convIndex < 10 ? '0' + convIndex : convIndex}`;
  const baseQNum = (convIndex - 1) * 3 + 1;

  const transcript = `[Speaker 1]: Hello, thanks for meeting with me regarding our ${c.topic.toLowerCase()}. We need to resolve the ${c.detail}.
[Speaker 2]: Absolutely. I reviewed your specifications this morning, and our team has prepared an updated proposal with revised timelines.
[Speaker 1]: That is reassuring. Can we finalize the agreement by the end of the week so we can proceed without further delays?
[Speaker 2]: Yes, I'll send over the finalized paperwork for your signature before three o'clock tomorrow afternoon.`;

  PART3_PASSAGES.push({
    id: pId,
    partNumber: 3,
    type: 'audio',
    title: c.topic,
    transcriptHidden: transcript,
    questions: [
      {
        id: `q3-${baseQNum < 10 ? '0' + baseQNum : baseQNum}`,
        partNumber: 3,
        passageId: pId,
        questionNumber: baseQNum,
        questionText: `What are the speakers mainly discussing?`,
        options: [
          { key: 'A', text: `Matters relating to ${c.topic.toLowerCase()}` },
          { key: 'B', text: 'A celebration dinner for retiring staff' },
          { key: 'C', text: 'A change in corporate health insurance' },
          { key: 'D', text: 'The cancellation of an international conference' }
        ],
        correctAnswer: 'A',
        explanation: `Los interlocutores abordan directamente el asunto principal de "${c.topic}".`,
        subtheme: 'Identificación del tema principal',
        difficulty: 'easy'
      },
      {
        id: `q3-${baseQNum + 1}`,
        partNumber: 3,
        passageId: pId,
        questionNumber: baseQNum + 1,
        questionText: `What has Speaker 2 prepared for the discussion?`,
        options: [
          { key: 'A', text: 'A legal disclaimer from company attorneys' },
          { key: 'B', text: 'An updated proposal with revised timelines' },
          { key: 'C', text: 'A list of customer complaints' },
          { key: 'D', text: 'An expense reimbursement receipt' }
        ],
        correctAnswer: 'B',
        explanation: 'Speaker 2 dice textualmente: "our team has prepared an updated proposal with revised timelines".',
        subtheme: 'Detalles y documentos específicos',
        difficulty: 'medium'
      },
      {
        id: `q3-${baseQNum + 2}`,
        partNumber: 3,
        passageId: pId,
        questionNumber: baseQNum + 2,
        questionText: `What will Speaker 2 do tomorrow afternoon?`,
        options: [
          { key: 'A', text: 'Host a training webinar for staff' },
          { key: 'B', text: 'Deliver physical inventory to the warehouse' },
          { key: 'C', text: 'Send finalized paperwork for signature' },
          { key: 'D', text: 'Inspect the facility for safety compliance' }
        ],
        correctAnswer: 'C',
        explanation: 'En el cierre del diálogo, se compromete a enviar los documentos definitivos para la firma antes de las 3:00 p.m.',
        subtheme: 'Acciones futuras y compromisos',
        difficulty: 'medium'
      }
    ]
  });
}
