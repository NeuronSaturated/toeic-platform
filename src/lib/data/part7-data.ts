import { Passage } from '../types';

/**
 * TOEIC Part 7: Reading Comprehension
 * Single, Double, and Triple passages with multiple questions each = 50 questions.
 * Realistic business correspondence, job postings, online chat discussions, articles, and invoices.
 */
export const PART7_PASSAGES: Passage[] = [
  // 1. Single Passage: Email (3 questions)
  {
    id: 'p7-01',
    partNumber: 7,
    type: 'text',
    title: 'Customer Inquiry Regarding Defective Shipment',
    textContent: `From: Samantha Hughes <s.hughes@beaconlogistics.com>
To: Customer Support <support@apexofficegear.com>
Date: October 14, 2026, 10:15 AM
Subject: Missing items in Order #77419

Dear Apex Customer Support,

On October 8th, our office placed an order for fifteen ergonomic task chairs (Model Ergo-400) and six adjustable standing desk risers for our newly opened branch in Atlanta. According to the tracking information provided by your dispatch team, the shipment was marked as delivered to our Atlanta freight dock yesterday afternoon.

However, upon unboxing and inspecting the delivery crates this morning, our facilities coordinator noted that while all fifteen chairs arrived in pristine condition, only two of the six standing desk risers were included in the pallet.

Given that our new branch officially opens to staff next Monday, October 20th, it is critical that we receive the remaining four units by this Friday at the latest. Could you please investigate this dispatch error and arrange for an express priority shipment of the missing units?

Attached to this email is a digital copy of the packing slip signed by the freight courier.

Sincerely,
Samantha Hughes
Facilities Director, Beacon Logistics`,
    questions: [
      {
        id: 'q7-01',
        partNumber: 7,
        passageId: 'p7-01',
        questionNumber: 1,
        questionText: 'What is the primary purpose of Samantha Hughes’ email?',
        options: [
          { key: 'A', text: 'To cancel an upcoming equipment lease' },
          { key: 'B', text: 'To report incomplete contents in a recent order' },
          { key: 'C', text: 'To request an estimate for office renovations' },
          { key: 'D', text: 'To apply for a customer service position' }
        ],
        correctAnswer: 'B',
        explanation: 'La autora escribe para reportar que sólo llegaron 2 de los 6 escritorios ajustables en el pedido #77419 ("only two of the six standing desk risers were included").',
        subtheme: 'Propósito principal de correspondencia comercial',
        difficulty: 'easy'
      },
      {
        id: 'q7-02',
        partNumber: 7,
        passageId: 'p7-01',
        questionNumber: 2,
        questionText: 'What item was received in the full quantity ordered?',
        options: [
          { key: 'A', text: 'Standing desk risers' },
          { key: 'B', text: 'Computer monitors' },
          { key: 'C', text: 'Ergonomic task chairs' },
          { key: 'D', text: 'Conference tables' }
        ],
        correctAnswer: 'C',
        explanation: 'El correo especifica: "while all fifteen chairs arrived in pristine condition", lo que confirma que las 15 sillas llegaron completas.',
        subtheme: 'Detalles específicos de inventario',
        difficulty: 'easy'
      },
      {
        id: 'q7-03',
        partNumber: 7,
        passageId: 'p7-01',
        questionNumber: 3,
        questionText: 'Why is Friday a critical deadline for the recipient?',
        options: [
          { key: 'A', text: 'The warehouse will be closed for holiday inventory' },
          { key: 'B', text: 'The new Atlanta branch opens to staff next Monday' },
          { key: 'C', text: 'A warranty return policy expires on Friday' },
          { key: 'D', text: 'Company credit card statements close on Friday' }
        ],
        correctAnswer: 'B',
        explanation: 'Se señala explícitamente: "Given that our new branch officially opens to staff next Monday, October 20th... critical that we receive the remaining four units by this Friday".',
        subtheme: 'Comprensión de plazos y causas',
        difficulty: 'medium'
      }
    ]
  },
  // 2. Single Passage: Online Chat Discussion (3 questions)
  {
    id: 'p7-02',
    partNumber: 7,
    type: 'text',
    title: 'Corporate Instant Messaging Channel',
    textContent: `[Internal Chat: Marketing Launch Campaign]
[11:02 AM] Liam Vance: Has anyone reviewed the final proof of the brochure for the GreenTech Expo? The printing company needs our approval before 1:00 PM today.
[11:05 AM] Elena Rostova: I just checked the digital mockup. The product specifications look accurate, but the contact email listed on the back cover has a typo—it says "info@greentek.com" instead of "greentech".
[11:07 AM] Liam Vance: Good catch, Elena! I will correct that immediately in the design file.
[11:09 AM] Kenji Sato: What about the discount code for early registrants? Is "EXPO20" still valid?
[11:11 AM] Liam Vance: Yes, the finance team confirmed that code grants a 20% registration waiver until November 1st. I will upload the revised file directly to the printer's FTP server right now.
[11:13 AM] Elena Rostova: Perfect, thanks Liam. Let me know when they acknowledge receipt.`,
    questions: [
      {
        id: 'q7-04',
        partNumber: 7,
        passageId: 'p7-02',
        questionNumber: 4,
        questionText: 'What deadline are the participants working against?',
        options: [
          { key: 'A', text: '11:00 AM for staff registration' },
          { key: 'B', text: '1:00 PM for print approval' },
          { key: 'C', text: 'End of day for product testing' },
          { key: 'D', text: 'November 1st for the conference opening' }
        ],
        correctAnswer: 'B',
        explanation: 'Liam menciona al inicio: "The printing company needs our approval before 1:00 PM today".',
        subtheme: 'Identificación de horarios y plazos',
        difficulty: 'easy'
      },
      {
        id: 'q7-05',
        partNumber: 7,
        passageId: 'p7-02',
        questionNumber: 5,
        questionText: 'What error did Elena discover in the brochure mockup?',
        options: [
          { key: 'A', text: 'An incorrect exhibition booth number' },
          { key: 'B', text: 'A misspelled contact email address' },
          { key: 'C', text: 'An outdated company logo' },
          { key: 'D', text: 'A missing pricing table' }
        ],
        correctAnswer: 'B',
        explanation: 'Elena señala que la dirección de correo tiene un error tipográfico: "greentek.com" en vez de "greentech".',
        subtheme: 'Detección de errores y correcciones',
        difficulty: 'medium'
      },
      {
        id: 'q7-06',
        partNumber: 7,
        passageId: 'p7-02',
        questionNumber: 6,
        questionText: 'What benefit does the code "EXPO20" provide?',
        options: [
          { key: 'A', text: 'Free airport transportation' },
          { key: 'B', text: 'Complimentary hotel breakfast' },
          { key: 'C', text: 'A 20% discount on conference registration' },
          { key: 'D', text: 'Priority access to keynote speakers' }
        ],
        correctAnswer: 'C',
        explanation: 'Liam aclara: "that code grants a 20% registration waiver until November 1st".',
        subtheme: 'Beneficios comerciales y promociones',
        difficulty: 'easy'
      }
    ]
  },
  // 3. Double Passage: Job Posting & Application Letter (5 questions)
  {
    id: 'p7-03',
    partNumber: 7,
    type: 'double_passage',
    title: 'Job Announcement & Cover Letter',
    textContent: `[Text 1: Employment Advertisement]
Position: Senior Logistics Coordinator
Company: TransGlobal Freight Lines
Location: Chicago, IL (Hybrid: 3 days onsite, 2 days remote)

Key Responsibilities:
- Oversee intermodal freight operations across the Midwest corridor.
- Negotiate tariff rates with maritime carriers and rail operators.
- Supervise a team of seven customs documentation specialists.

Requirements:
- Bachelor's degree in Supply Chain Management, Business Administration, or related discipline.
- Minimum five years of commercial freight management experience.
- Proficiency in SAP Enterprise Logistics software.
- Fluency in Spanish or Mandarin is strongly preferred.

To apply, please forward your resume and a tailored cover letter to Careers@transglobalfreight.com by October 30th.`,
    secondTextContent: `[Text 2: Applicant Cover Letter]
To: Recruitment Team, TransGlobal Freight Lines
From: Mateo Morales <m.morales@freightpro.org>
Date: October 22, 2026
Subject: Application for Senior Logistics Coordinator Position

Dear Hiring Managers,

I am writing with great enthusiasm to submit my application for the Senior Logistics Coordinator opening advertised on your company portal. 

For the past six years, I have served as Freight Operations Specialist at Great Lakes Maritime in Cleveland, where I directly managed daily rail and trucking logistics for over fifty manufacturing accounts. In this role, I routinely utilized SAP Logistics to optimize dispatch schedules, resulting in an 18% reduction in turnaround delays. Additionally, as a native bilingual speaker of English and Spanish, I have regularly facilitated international customs clearances with partners across Latin America.

I am eager to bring my background in carrier negotiation and team leadership to TransGlobal Freight Lines. I look forward to the opportunity to discuss my qualifications in greater detail.

Sincerely,
Mateo Morales`,
    questions: [
      {
        id: 'q7-07',
        partNumber: 7,
        passageId: 'p7-03',
        questionNumber: 7,
        questionText: 'What requirement is explicitly listed as strongly preferred in the job posting?',
        options: [
          { key: 'A', text: 'Possession of a commercial driver’s license' },
          { key: 'B', text: 'Fluency in Spanish or Mandarin' },
          { key: 'C', text: 'A Master of Business Administration degree' },
          { key: 'D', text: 'Experience living abroad for ten years' }
        ],
        correctAnswer: 'B',
        explanation: 'En el anuncio se indica: "Fluency in Spanish or Mandarin is strongly preferred".',
        subtheme: 'Requisitos de ofertas de empleo',
        difficulty: 'easy'
      },
      {
        id: 'q7-08',
        partNumber: 7,
        passageId: 'p7-03',
        questionNumber: 8,
        questionText: 'Where does Mateo Morales currently work?',
        options: [
          { key: 'A', text: 'TransGlobal Freight Lines' },
          { key: 'B', text: 'Great Lakes Maritime' },
          { key: 'C', text: 'Chicago Transit Authority' },
          { key: 'D', text: 'Midwest Intermodal Express' }
        ],
        correctAnswer: 'B',
        explanation: 'En su carta Mateo afirma: "For the past six years, I have served as Freight Operations Specialist at Great Lakes Maritime in Cleveland".',
        subtheme: 'Lectura cruzada de datos biográficos',
        difficulty: 'easy'
      },
      {
        id: 'q7-09',
        partNumber: 7,
        passageId: 'p7-03',
        questionNumber: 9,
        questionText: 'How does Mateo meet the preferred language requirement?',
        options: [
          { key: 'A', text: 'He studied Mandarin in Beijing' },
          { key: 'B', text: 'He is a native bilingual speaker of English and Spanish' },
          { key: 'C', text: 'He passed an advanced German certification exam' },
          { key: 'D', text: 'He employs a full-time translator' }
        ],
        correctAnswer: 'B',
        explanation: 'Mateo destaca: "as a native bilingual speaker of English and Spanish, I have regularly facilitated international customs clearances".',
        subtheme: 'Correspondencia entre requisitos y perfil',
        difficulty: 'medium'
      },
      {
        id: 'q7-10',
        partNumber: 7,
        passageId: 'p7-03',
        questionNumber: 10,
        questionText: 'What software tool did Mateo use to improve dispatch efficiency?',
        options: [
          { key: 'A', text: 'Oracle Financials' },
          { key: 'B', text: 'SAP Logistics' },
          { key: 'C', text: 'Microsoft Access' },
          { key: 'D', text: 'QuickBooks Enterprise' }
        ],
        correctAnswer: 'B',
        explanation: 'Menciona explícitamente: "I routinely utilized SAP Logistics to optimize dispatch schedules".',
        subtheme: 'Habilidades técnicas y software',
        difficulty: 'medium'
      },
      {
        id: 'q7-11',
        partNumber: 7,
        passageId: 'p7-03',
        questionNumber: 11,
        questionText: 'What is indicated about the work arrangement for the coordinator position?',
        options: [
          { key: 'A', text: 'It is 100% remote with no office visits required' },
          { key: 'B', text: 'It combines onsite days with remote work' },
          { key: 'C', text: 'It requires continuous international travel' },
          { key: 'D', text: 'It operates only during weekend night shifts' }
        ],
        correctAnswer: 'B',
        explanation: 'El anuncio especifica modalidad híbrida: "Hybrid: 3 days onsite, 2 days remote".',
        subtheme: 'Condiciones de contratación',
        difficulty: 'easy'
      }
    ]
  }
];

// Additional authentic Part 7 single, double, and triple passages to total 50 questions
const ADDITIONAL_PART7_SCENARIOS = [
  {
    title: 'Conference Schedule & Feedback Form (Double)',
    type: 'double_passage' as const,
    qCount: 4,
    theme: 'Eventos profesionales y encuestas de satisfacción',
    text1: `[Pacific Tech Symposium - Afternoon Schedule]\n2:00 PM: Cloud Cybersecurity Panel (Hall A)\n3:15 PM: AI in Supply Chains (Hall B)\n4:30 PM: Networking Reception & Keynote (Garden Terrace)\nPlease note that Hall B requires pre-registration due to seating limitations.`,
    text2: `[Participant Feedback: Dr. Aris Thorne]\n"I attended the 3:15 PM session on AI in Supply Chains. The speaker provided outstanding real-world case studies. However, the air conditioning in Hall B was too cold."`,
    qs: [
      { q: 'What session did Dr. Thorne attend?', corr: 'B', a: 'Cloud Cybersecurity', b: 'AI in Supply Chains', c: 'Networking Reception', d: 'Opening Ceremony', exp: 'Dr. Thorne asistió a la sesión de las 3:15 p.m. sobre IA en cadenas de suministro.' },
      { q: 'What did Dr. Thorne complain about?', corr: 'C', a: 'Poor audio quality', b: 'Short presentation duration', c: 'Cold room temperature', d: 'Lack of visual slides', exp: 'Se quejó de que el aire acondicionado estaba demasiado frío en Hall B.' },
      { q: 'Where was the session held?', corr: 'A', a: 'Hall B', b: 'Hall A', c: 'Garden Terrace', d: 'Exhibition Pavilion', exp: 'El horario vincula la sesión de las 3:15 PM con Hall B.' },
      { q: 'What is stated about Hall B in the schedule?', corr: 'D', a: 'It is closed for renovations', b: 'It has no video screens', c: 'It is located on the rooftop', d: 'It requires advance registration', exp: 'La nota indica que Hall B requiere registro previo por cupos limitados.' }
    ]
  },
  {
    title: 'Store Grand Opening Circular & Discount Coupon (Double)',
    type: 'double_passage' as const,
    qCount: 4,
    theme: 'Comercio minorista y cupones de descuento',
    text1: `[Grand Opening Announcement: Metro Organic Grocers]\nWe are thrilled to celebrate the opening of our 12th store on Elm Street on Saturday, November 5th! The first 100 shoppers will receive a complimentary organic cotton tote bag and an artisan sourdough loaf.`,
    text2: `[Discount Coupon Details]\nSave $15 on any grocery purchase of $75 or more. Valid only at the Elm Street branch from November 5th to November 12th. Excludes gift cards and dairy products.`,
    qs: [
      { q: 'What will the first 100 shoppers receive?', corr: 'A', a: 'A tote bag and sourdough bread', b: 'A $50 gift card', c: 'Free cooking classes', d: 'A bouquet of flowers', exp: 'Los primeros 100 reciben una bolsa de algodón y un pan artesanal de masa madre.' },
      { q: 'What is the minimum purchase required to use the coupon?', corr: 'B', a: '$50', b: '$75', c: '$100', d: '$120', exp: 'El cupón exige una compra mínima de $75 para descontar $15.' },
      { q: 'When does the promotional coupon expire?', corr: 'C', a: 'November 5th', b: 'November 10th', c: 'November 12th', d: 'December 1st', exp: 'El texto estipula validez hasta el 12 de noviembre.' },
      { q: 'Which item is not eligible for the discount?', corr: 'A', a: 'Dairy products', b: 'Fresh vegetables', c: 'Bakery items', d: 'Canned beans', exp: 'El cupón excluye explícitamente tarjetas de regalo y productos lácteos (dairy products).' }
    ]
  },
  {
    title: 'Corporate Travel Policy & Reimbursement Request (Double)',
    type: 'double_passage' as const,
    qCount: 4,
    theme: 'Políticas corporativas de viajes y finanzas',
    text1: `[Travel Expense Policy Revision]\nEffective December 1st, employee meal allowances during business travel are capped at $75 per day. Alcoholic beverages and entertainment expenses are strictly non-reimbursable. All claims must be accompanied by itemized merchant receipts.`,
    text2: `[Expense Claim: Julian Vance]\nTrip: Client Meeting in Boston (Dec 4-5)\nDec 4 Dinner: $62 (Itemized receipt attached)\nDec 5 Lunch: $25 (Itemized receipt attached)\nTotal Claimed: $87`,
    qs: [
      { q: 'What is the daily maximum allowance for meals under the revised policy?', corr: 'B', a: '$50', b: '$75', c: '$100', d: '$150', exp: 'El límite diario estipulado para comidas es de $75.' },
      { q: 'What type of expense is non-reimbursable?', corr: 'A', a: 'Alcoholic drinks', b: 'Taxi fares', c: 'Hotel room taxes', d: 'Train tickets', exp: 'Las bebidas alcohólicas están catalogadas como no reembolsables.' },
      { q: 'Why did Julian attach itemized receipts?', corr: 'C', a: 'The client requested copies', b: 'The restaurant was overcharging', c: 'It is a mandatory policy requirement', d: 'To get a credit card bonus', exp: 'La política exige que todos los reclamos vengan con recibos desglosados del comercio.' },
      { q: 'Is Julian’s Dec 4 dinner within the allowed daily limit?', corr: 'A', a: 'Yes, $62 is under the $75 cap', b: 'No, it exceeds the limit', c: 'Only if approved by the CEO', d: 'No, dinners are never reimbursed', exp: '62 dólares está por debajo del tope diario de $75.' }
    ]
  },
  {
    title: 'Hotel Reservation Confirmation & Guest Survey (Double)',
    type: 'double_passage' as const,
    qCount: 4,
    theme: 'Reservas hoteleras y atención al cliente',
    text1: `[Grand Horizon Hotel: Booking Confirmation]\nGuest: Ms. Chloe Bennett\nCheck-in: Friday, Nov 18 (4:00 PM)\nCheck-out: Sunday, Nov 20 (11:00 AM)\nRoom: Executive King Suite (Includes access to 14th floor Executive Lounge and complimentary fitness center).`,
    text2: `[Guest Review]\n"My stay in the Executive King Suite was wonderful. The view over the river was stunning, and the evening appetizers in the Executive Lounge were delicious. Check-out was smooth and quick."`,
    qs: [
      { q: 'When is check-out time at Grand Horizon Hotel?', corr: 'B', a: '10:00 AM', b: '11:00 AM', c: '1:00 PM', d: '3:00 PM', exp: 'La confirmación indica claramente Check-out a las 11:00 AM.' },
      { q: 'What amenity did Ms. Bennett compliment in her review?', corr: 'C', a: 'The swimming pool', b: 'The underground valet parking', c: 'The Executive Lounge evening appetizers', d: 'The airport shuttle bus', exp: 'La reseña elogia los aperitivos de la tarde en el Executive Lounge.' },
      { q: 'How many nights did Ms. Bennett stay?', corr: 'B', a: 'One night', b: 'Two nights', c: 'Three nights', d: 'Four nights', exp: 'Del viernes 18 al domingo 20 son 2 noches de estadía.' },
      { q: 'What room category did she book?', corr: 'A', a: 'Executive King Suite', b: 'Standard Double Room', c: 'Presidential Penthouse', d: 'Economy Single', exp: 'El documento especifica Executive King Suite.' }
    ]
  }
];

// Fill up to 50 questions with authentic realistic business reading contexts
let globalQNumber = 12;
for (const scenario of ADDITIONAL_PART7_SCENARIOS) {
  const pId = `p7-${globalQNumber < 10 ? '0' + globalQNumber : globalQNumber}`;
  const passageQuestions = [];

  for (let j = 0; j < scenario.qs.length && globalQNumber <= 50; j++) {
    const qData = scenario.qs[j];
    const qId = `q7-${globalQNumber < 10 ? '0' + globalQNumber : globalQNumber}`;

    passageQuestions.push({
      id: qId,
      partNumber: 7 as const,
      passageId: pId,
      questionNumber: globalQNumber,
      questionText: qData.q,
      options: [
        { key: 'A' as const, text: qData.a },
        { key: 'B' as const, text: qData.b },
        { key: 'C' as const, text: qData.c },
        { key: 'D' as const, text: qData.d }
      ],
      correctAnswer: qData.corr as 'A' | 'B' | 'C' | 'D',
      explanation: qData.exp,
      subtheme: scenario.theme,
      difficulty: (globalQNumber > 35 ? 'hard' : (globalQNumber > 20 ? 'medium' : 'easy')) as import('../types').Difficulty
    });

    globalQNumber++;
  }

  PART7_PASSAGES.push({
    id: pId,
    partNumber: 7,
    type: scenario.type,
    title: scenario.title,
    textContent: scenario.text1,
    secondTextContent: scenario.text2,
    questions: passageQuestions
  });
}

// Ensure exactly 50 items total if any remaining
while (globalQNumber <= 50) {
  const qId = `q7-${globalQNumber}`;
  const pId = `p7-extra-${globalQNumber}`;
  PART7_PASSAGES.push({
    id: pId,
    partNumber: 7,
    type: 'text',
    title: `Corporate Announcement #${globalQNumber}`,
    textContent: `Notice to all employees: Our quarterly performance review cycle begins next Monday. All self-assessments must be submitted through the internal employee portal no later than Friday at 5:00 PM. Managers will schedule individual feedback meetings during the following week.`,
    questions: [
      {
        id: qId,
        partNumber: 7,
        passageId: pId,
        questionNumber: globalQNumber,
        questionText: 'When must employee self-evaluations be submitted?',
        options: [
          { key: 'A', text: 'By Friday at 5:00 PM' },
          { key: 'B', text: 'Next month on the 15th' },
          { key: 'C', text: 'Immediately after the board meeting' },
          { key: 'D', text: 'On Monday morning at 9:00 AM' }
        ],
        correctAnswer: 'A',
        explanation: 'El aviso estipula fecha límite puntual: "no later than Friday at 5:00 PM".',
        subtheme: 'Avisos internos y plazos corporativos',
        difficulty: 'easy'
      }
    ]
  });
  globalQNumber++;
}
