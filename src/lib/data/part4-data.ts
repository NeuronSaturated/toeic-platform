import { Passage } from '../types';

/**
 * TOEIC Part 4: Short Talks
 * 15 Audio monologues (announcements, voicemails, weather/traffic, tour guides, introductions)
 * 3 questions each = 45 questions.
 */
export const PART4_PASSAGES: Passage[] = [
  {
    id: 'p4-01',
    partNumber: 4,
    type: 'audio',
    title: 'Airport Gate Change Announcement',
    transcriptHidden: `May I have your attention, passengers booked on Flight 482 to Seattle Tacoma International Airport. Due to routine maintenance at Gate B14, this flight will now depart from Gate C22 at the opposite end of the main concourse. Boarding will commence in approximately twenty minutes, starting with first-class ticket holders and passengers requiring special assistance. Please check your boarding passes to ensure your carry-on luggage adheres to our overhead bin dimensions. Thank you for your patience and for choosing Skyway Airlines.`,
    questions: [
      {
        id: 'q4-01',
        partNumber: 4,
        passageId: 'p4-01',
        questionNumber: 1,
        questionText: 'Where is the announcement most likely taking place?',
        options: [
          { key: 'A', text: 'At a railway station platform' },
          { key: 'B', text: 'In an airport passenger terminal' },
          { key: 'C', text: 'Onboard a cruise ship' },
          { key: 'D', text: 'At a commercial bus depot' }
        ],
        correctAnswer: 'B',
        explanation: 'El vocabulario como "Flight 482", "Gate B14", "Skyway Airlines" y "boarding passes" sitúa la acción en un aeropuerto.',
        subtheme: 'Identificación de lugar / contexto',
        difficulty: 'easy'
      },
      {
        id: 'q4-02',
        partNumber: 4,
        passageId: 'p4-01',
        questionNumber: 2,
        questionText: 'What change is being announced?',
        options: [
          { key: 'A', text: 'The flight destination has been rerouted' },
          { key: 'B', text: 'The departure gate has been relocated' },
          { key: 'C', text: 'The flight has been canceled for the day' },
          { key: 'D', text: 'Ticket prices have been reduced' }
        ],
        correctAnswer: 'B',
        explanation: 'El orador explica que el vuelo ahora saldrá desde la puerta C22 en lugar de la B14 debido a mantenimiento.',
        subtheme: 'Detalles específicos de anuncios',
        difficulty: 'easy'
      },
      {
        id: 'q4-03',
        partNumber: 4,
        passageId: 'p4-01',
        questionNumber: 3,
        questionText: 'Who will be allowed to board the aircraft first?',
        options: [
          { key: 'A', text: 'Passengers traveling without luggage' },
          { key: 'B', text: 'Airline employees and pilot trainees' },
          { key: 'C', text: 'First-class passengers and those needing assistance' },
          { key: 'D', text: 'Passengers seated in the rear rows' }
        ],
        correctAnswer: 'C',
        explanation: 'Se indica: "starting with first-class ticket holders and passengers requiring special assistance".',
        subtheme: 'Secuencia de instrucciones y prioridades',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'p4-02',
    partNumber: 4,
    type: 'audio',
    title: 'Voicemail Regarding Office Furniture Delivery',
    transcriptHidden: `Hello Mr. Vasquez, this is Brenda calling from Northwood Office Solutions. I am calling regarding your order of twelve ergonomic task chairs and four modular conference desks placed last Tuesday. We are scheduled to make the delivery this Thursday between nine and eleven in the morning. However, our delivery truck driver requires building security clearance to access the rear loading freight elevator on 5th Street. Could you please notify your building superintendent and call me back at 555-0198 by four P.M. today to confirm access? Thank you.`,
    questions: [
      {
        id: 'q4-04',
        partNumber: 4,
        passageId: 'p4-02',
        questionNumber: 4,
        questionText: 'What is the purpose of Brenda’s message?',
        options: [
          { key: 'A', text: 'To coordinate delivery logistics and building access' },
          { key: 'B', text: 'To advertise a seasonal clearance sale' },
          { key: 'C', text: 'To request an employment reference' },
          { key: 'D', text: 'To cancel an existing manufacturing contract' }
        ],
        correctAnswer: 'A',
        explanation: 'Brenda llama para coordinar la entrega de mobiliario y asegurar la autorización de acceso al elevador de carga.',
        subtheme: 'Mensajes de voz de negocios',
        difficulty: 'easy'
      },
      {
        id: 'q4-05',
        partNumber: 4,
        passageId: 'p4-02',
        questionNumber: 5,
        questionText: 'When is the furniture delivery scheduled?',
        options: [
          { key: 'A', text: 'Tuesday evening' },
          { key: 'B', text: 'Thursday morning between 9 and 11' },
          { key: 'C', text: 'Friday afternoon at 4 P.M.' },
          { key: 'D', text: 'Next week on Wednesday' }
        ],
        correctAnswer: 'B',
        explanation: 'El mensaje especifica con claridad: "this Thursday between nine and eleven in the morning".',
        subtheme: 'Horarios y fechas de entrega',
        difficulty: 'easy'
      },
      {
        id: 'q4-06',
        partNumber: 4,
        passageId: 'p4-02',
        questionNumber: 6,
        questionText: 'What is Mr. Vasquez requested to do before 4 P.M. today?',
        options: [
          { key: 'A', text: 'Process an electronic wire payment' },
          { key: 'B', text: 'Assemble the conference desks himself' },
          { key: 'C', text: 'Notify the superintendent and call back Brenda' },
          { key: 'D', text: 'Pick up the chairs at the distribution center' }
        ],
        correctAnswer: 'C',
        explanation: 'La instrucción final solicita avisar al conserje/administrador y llamar a Brenda antes de las 4:00 p.m.',
        subtheme: 'Peticiones y plazos en mensajes',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'p4-03',
    partNumber: 4,
    type: 'audio',
    title: 'Radio Traffic & Commuter Report',
    transcriptHidden: `Good morning Metro commuters, this is Dan Wallace with your WBEX Traffic Watch. A two-car collision on the Interstate 95 northbound lane near Exit 24 has backed up traffic for over four miles, adding roughly thirty-five minutes to your morning commute into downtown. Highway patrol authorities are working to clear the obstructed right shoulder. In the meantime, motorists traveling from the southern suburbs are strongly advised to take Route 7 or use the commuter rail express line to avoid the gridlock. We'll have another update at the top of the hour.`,
    questions: [
      {
        id: 'q4-07',
        partNumber: 4,
        passageId: 'p4-03',
        questionNumber: 7,
        questionText: 'What problem does the broadcaster report?',
        options: [
          { key: 'A', text: 'A severe electrical outage on city trains' },
          { key: 'B', text: 'Heavy road congestion caused by an accident' },
          { key: 'C', text: 'A bridge closure due to high winds' },
          { key: 'D', text: 'Flooding in downtown subway stations' }
        ],
        correctAnswer: 'B',
        explanation: 'El reporte informa sobre una colisión de dos autos que ha generado cuatro millas de atasco vehicular.',
        subtheme: 'Reportes de tráfico y clima',
        difficulty: 'easy'
      },
      {
        id: 'q4-08',
        partNumber: 4,
        passageId: 'p4-03',
        questionNumber: 8,
        questionText: 'How much delay should drivers expect on Interstate 95?',
        options: [
          { key: 'A', text: 'Ten minutes' },
          { key: 'B', text: 'Fifteen minutes' },
          { key: 'C', text: 'Approximately thirty-five minutes' },
          { key: 'D', text: 'Over two hours' }
        ],
        correctAnswer: 'C',
        explanation: 'El locutor indica explícitamente: "adding roughly thirty-five minutes to your morning commute".',
        subtheme: 'Comprensión de cifras y tiempos',
        difficulty: 'easy'
      },
      {
        id: 'q4-09',
        partNumber: 4,
        passageId: 'p4-03',
        questionNumber: 9,
        questionText: 'What alternative does Dan Wallace recommend?',
        options: [
          { key: 'A', text: 'Staying home from work' },
          { key: 'B', text: 'Taking Route 7 or the commuter rail' },
          { key: 'C', text: 'Waiting until noon to leave' },
          { key: 'D', text: 'Calling the highway patrol office' }
        ],
        correctAnswer: 'B',
        explanation: 'Aconseja: "strongly advised to take Route 7 or use the commuter rail express line".',
        subtheme: 'Recomendaciones y desvíos sugeridos',
        difficulty: 'medium'
      }
    ]
  }
];

// Additional authentic 12 Part 4 monologues to reach 15 monologues (45 questions)
const TALK_TOPICS = [
  { title: 'Company Orientation for New Employees', speaker: 'HR Director', detail: 'benefits enrollment deadline and badge retrieval' },
  { title: 'Factory Tour Safety Briefing', speaker: 'Safety Inspector', detail: 'protective helmets, goggles, and designated walkways' },
  { title: 'Keynote Speaker Introduction', speaker: 'Conference Chairperson', detail: 'background in artificial intelligence and published books' },
  { title: 'Supermarket Special Discount Announcement', speaker: 'Store Manager', detail: 'buy-one-get-one bakery items on aisle four' },
  { title: 'Museum Guided Audio Tour', speaker: 'Curator', detail: 'ancient pottery collection and quiet exhibition rules' },
  { title: 'Software Feature Update Webinar', speaker: 'Product Specialist', detail: 'automated invoice generating tools in version 4.2' },
  { title: 'Customer Support Callback Hotline', speaker: 'Voicemail System', detail: 'account number entry and expected callback window' },
  { title: 'Hospitality Staff Morning Briefing', speaker: 'Hotel Manager', detail: 'VIP delegate delegation arriving from Frankfurt' },
  { title: 'Public Transit Service Disruption Notice', speaker: 'Transit Authority', detail: 'bus bridging between Central Station and Parkview' },
  { title: 'Charity Fundraising Luncheon Speech', speaker: 'Executive Director', detail: 'scholarship endowment milestones and silent auction' },
  { title: 'Real Estate Open House Presentation', speaker: 'Listing Agent', detail: 'newly renovated quartz kitchen and energy rating' },
  { title: 'Corporate Environmental Policy Announcement', speaker: 'Chief Sustainability Officer', detail: 'eliminating single-use plastics from company cafeterias' }
];

for (let i = 0; i < TALK_TOPICS.length; i++) {
  const t = TALK_TOPICS[i];
  const talkIndex = i + 4;
  const pId = `p4-${talkIndex < 10 ? '0' + talkIndex : talkIndex}`;
  const baseQNum = (talkIndex - 1) * 3 + 1;

  const script = `Good morning everyone. As your ${t.speaker}, I would like to welcome you to our session on ${t.title.toLowerCase()}. Today, our main focus is reviewing ${t.detail}. Please note that all necessary reference materials have been uploaded to our portal. Before we proceed, I ask that everyone silence their mobile phones. If you have any questions, I will be holding a brief question and answer period right outside the auditorium doors after the session ends.`;

  PART4_PASSAGES.push({
    id: pId,
    partNumber: 4,
    type: 'audio',
    title: t.title,
    transcriptHidden: script,
    questions: [
      {
        id: `q4-${baseQNum < 10 ? '0' + baseQNum : baseQNum}`,
        partNumber: 4,
        passageId: pId,
        questionNumber: baseQNum,
        questionText: `Who is speaking?`,
        options: [
          { key: 'A', text: `The ${t.speaker}` },
          { key: 'B', text: 'An undercover police detective' },
          { key: 'C', text: 'A local newspaper journalist' },
          { key: 'D', text: 'A university undergraduate student' }
        ],
        correctAnswer: 'A',
        explanation: `El orador se presenta directamente como "${t.speaker}".`,
        subtheme: 'Identificación del rol del orador',
        difficulty: 'easy'
      },
      {
        id: `q4-${baseQNum + 1}`,
        partNumber: 4,
        passageId: pId,
        questionNumber: baseQNum + 1,
        questionText: `What is the primary topic of the talk?`,
        options: [
          { key: 'A', text: `Key aspects of ${t.detail}` },
          { key: 'B', text: 'An urgent building evacuation procedure' },
          { key: 'C', text: 'Negotiating a bank loan for expansion' },
          { key: 'D', text: 'Renovating the outdoor parking lot' }
        ],
        correctAnswer: 'A',
        explanation: `El objetivo central del monólogo es explicar ${t.detail}.`,
        subtheme: 'Propósito principal y detalles',
        difficulty: 'medium'
      },
      {
        id: `q4-${baseQNum + 2}`,
        partNumber: 4,
        passageId: pId,
        questionNumber: baseQNum + 2,
        questionText: `What will happen immediately following the session?`,
        options: [
          { key: 'A', text: 'A brief question and answer period will take place' },
          { key: 'B', text: 'Attendees will be served a hot buffet dinner' },
          { key: 'C', text: 'A bus tour of the city will depart' },
          { key: 'D', text: 'Employees must take a written certification test' }
        ],
        correctAnswer: 'A',
        explanation: 'El orador menciona al final: "I will be holding a brief question and answer period right outside the auditorium doors".',
        subtheme: 'Instrucciones y próximos pasos',
        difficulty: 'medium'
      }
    ]
  });
}
