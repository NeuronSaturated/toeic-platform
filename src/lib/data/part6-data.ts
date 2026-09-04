import { Passage } from '../types';

/**
 * TOEIC Part 6: Text Completion
 * 12 Business texts with 4 blanks each = 48 questions.
 * Texts include internal corporate memos, emails, press releases, and service notices.
 */
export const PART6_PASSAGES: Passage[] = [
  {
    id: 'p6-01',
    partNumber: 6,
    type: 'text',
    title: 'Internal Memo: Office Relocation Notice',
    textContent: `To: All Staff Members
From: Facilities Operations Committee
Date: September 12
Subject: Upcoming Corporate Headquarters Move

As previously announced, our central headquarters will be relocating to the newly developed Commerce Tower on October 1st. We anticipate that this move will provide our expanding teams with [1] workspace and improved conference facilities.

Over the coming weekend, professional movers will begin transporting all non-essential equipment. Employees are kindly asked to pack personal belongings into the labeled cardboard crates provided by Wednesday afternoon. Please ensure that all computer cables and accessories [2] inside your designated storage box. 

[3] Furthermore, our digital network servers will undergo scheduled maintenance during the transition weekend. Consequently, remote server access will be temporarily unavailable from Friday at 8:00 P.M. until Sunday noon.

We deeply appreciate your continued patience and cooperation as we transition into our new corporate environment. If you have any specific inquiries regarding ergonomic furniture or parking assignments, please do not hesitate to contact our department [4].`,
    questions: [
      {
        id: 'q6-01',
        partNumber: 6,
        passageId: 'p6-01',
        questionNumber: 1,
        questionText: 'Select the best option for blank [1]:',
        options: [
          { key: 'A', text: 'addition' },
          { key: 'B', text: 'additional' },
          { key: 'C', text: 'additionally' },
          { key: 'D', text: 'add' }
        ],
        correctAnswer: 'B',
        explanation: 'El adjetivo "additional" (espacio de trabajo adicional) califica adecuadamente al sustantivo "workspace".',
        subtheme: 'Formas de palabras (Adjetivos modificadores)',
        difficulty: 'easy'
      },
      {
        id: 'q6-02',
        partNumber: 6,
        passageId: 'p6-01',
        questionNumber: 2,
        questionText: 'Select the best option for blank [2]:',
        options: [
          { key: 'A', text: 'are placed' },
          { key: 'B', text: 'placing' },
          { key: 'C', text: 'had placed' },
          { key: 'D', text: 'places' }
        ],
        correctAnswer: 'A',
        explanation: 'Estructura pasiva en presente ("are placed"): los cables y accesorios son colocados dentro de las cajas designadas.',
        subtheme: 'Voz pasiva',
        difficulty: 'medium'
      },
      {
        id: 'q6-03',
        partNumber: 6,
        passageId: 'p6-01',
        questionNumber: 3,
        questionText: 'Select the best option for blank [3]:',
        options: [
          { key: 'A', text: 'Please leave all desktop monitors turned on.' },
          { key: 'B', text: 'Staff members are invited to bring their families.' },
          { key: 'C', text: 'Boxes that are not properly labeled will not be transported.' },
          { key: 'D', text: 'The cafeteria menu will change next month.' }
        ],
        correctAnswer: 'C',
        explanation: 'La oración C se integra lógicamente con la advertencia anterior sobre empacar en cajas etiquetadas para la mudanza.',
        subtheme: 'Inserción de oración coherente',
        difficulty: 'hard'
      },
      {
        id: 'q6-04',
        partNumber: 6,
        passageId: 'p6-01',
        questionNumber: 4,
        questionText: 'Select the best option for blank [4]:',
        options: [
          { key: 'A', text: 'directly' },
          { key: 'B', text: 'direct' },
          { key: 'C', text: 'direction' },
          { key: 'D', text: 'directed' }
        ],
        correctAnswer: 'A',
        explanation: 'El adverbio "directly" (contactar a nuestro departamento directamente) modifica al verbo transitivo "contact".',
        subtheme: 'Adverbios de modo',
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 'p6-02',
    partNumber: 6,
    type: 'text',
    title: 'Customer Email: Software Subscription Renewal',
    textContent: `Dear Valued Subscriber,

Thank you for choosing CloudSync Pro as your enterprise file sharing partner over the past twelve months. We are writing to remind you that your annual corporate subscription is due to [1] on October 25th.

To ensure uninterrupted service for your team, your account will be renewed automatically at your current preferred tier. [2] If your billing details or company credit card have changed recently, please log in to your account dashboard and update your payment information before the expiration date.

Over the past year, we have introduced numerous security enhancements, including end-to-end encryption and accelerated backup speeds. We remain [3] to providing your organization with world-class cloud infrastructure. 

[4] Thank you for your continued business and trust.

Sincerely,
The CloudSync Customer Care Team`,
    questions: [
      {
        id: 'q6-05',
        partNumber: 6,
        passageId: 'p6-02',
        questionNumber: 5,
        questionText: 'Select the best option for blank [1]:',
        options: [
          { key: 'A', text: 'expire' },
          { key: 'B', text: 'expiration' },
          { key: 'C', text: 'expired' },
          { key: 'D', text: 'expiring' }
        ],
        correctAnswer: 'A',
        explanation: 'La expresión "is due to" va seguida del verbo en forma base o infinitivo ("is due to expire" = está por vencer).',
        subtheme: 'Infinitivos tras locuciones verbales',
        difficulty: 'easy'
      },
      {
        id: 'q6-06',
        partNumber: 6,
        passageId: 'p6-02',
        questionNumber: 6,
        questionText: 'Select the best option for blank [2]:',
        options: [
          { key: 'A', text: 'No action is required on your part if your account info is current.' },
          { key: 'B', text: 'Our phone lines are disconnected indefinitely.' },
          { key: 'C', text: 'We have discontinued our subscription services.' },
          { key: 'D', text: 'Prices will triple starting tomorrow morning.' }
        ],
        correctAnswer: 'A',
        explanation: 'La opción A conecta coherentemente con la renovación automática mencionada en la oración precedente.',
        subtheme: 'Inserción de oración contextual',
        difficulty: 'medium'
      },
      {
        id: 'q6-07',
        partNumber: 6,
        passageId: 'p6-02',
        questionNumber: 7,
        questionText: 'Select the best option for blank [3]:',
        options: [
          { key: 'A', text: 'committed' },
          { key: 'B', text: 'commitment' },
          { key: 'C', text: 'committing' },
          { key: 'D', text: 'commits' }
        ],
        correctAnswer: 'A',
        explanation: '"Remain committed to" es una colocación fija en correspondencia formal corporativa ("permanecemos comprometidos con").',
        subtheme: 'Colocaciones participiales y adjetivales',
        difficulty: 'medium'
      },
      {
        id: 'q6-08',
        partNumber: 6,
        passageId: 'p6-02',
        questionNumber: 8,
        questionText: 'Select the best option for blank [4]:',
        options: [
          { key: 'A', text: 'As a token of appreciation, we have credited your account with 50 GB of bonus storage.' },
          { key: 'B', text: 'We regret to inform you that your data has been deleted.' },
          { key: 'C', text: 'Our offices are closed on weekends.' },
          { key: 'D', text: 'Please return the hardware by postal mail.' }
        ],
        correctAnswer: 'A',
        explanation: 'La oración A ofrece una bonificación de agradecimiento que concuerda perfectamente con el tono comercial de fidelización.',
        subtheme: 'Inserción de oración de cortesía comercial',
        difficulty: 'medium'
      }
    ]
  }
];

// Additional 10 texts × 4 blanks = 40 questions to complete 48 questions (12 texts total)
const PART6_ADDITIONAL_TEXTS = [
  { title: 'Press Release: Green Energy Initiative', topic: 'renewable solar panels installation on manufacturing plants' },
  { title: 'HR Announcement: Health Wellness Week', topic: 'ergonomic workstation assessments and free medical checkups' },
  { title: 'Vendor Notification: Invoice Processing Portal', topic: 'transition to electronic invoice submission system' },
  { title: 'Hotel Welcome Letter: Executive Lounge Privileges', topic: 'complimentary breakfast buffet and high-speed Wi-Fi access' },
  { title: 'Product Launch: Next-Gen Industrial Printer', topic: 'high-speed color printing with 40% reduced energy consumption' },
  { title: 'Client Advisory: Scheduled Banking Maintenance', topic: 'online transaction downtime during weekend security patch' },
  { title: 'Retail Notice: Extended Holiday Operating Hours', topic: 'evening shopping hours and additional customer assistance staff' },
  { title: 'Company Policy: Travel Expense Reimbursement', topic: 'submitting digital copies of receipts within 14 business days' },
  { title: 'Auditor Report: Supply Chain Efficiency', topic: 'warehouse logistics automation reducing transit turnaround times' },
  { title: 'Conference Invitation: Global Leadership Forum', topic: 'keynote panel on emerging technologies and sustainable business' }
];

for (let i = 0; i < PART6_ADDITIONAL_TEXTS.length; i++) {
  const item = PART6_ADDITIONAL_TEXTS[i];
  const pIndex = i + 3;
  const pId = `p6-${pIndex < 10 ? '0' + pIndex : pIndex}`;
  const baseQNum = (pIndex - 1) * 4 + 1;

  const content = `Subject: ${item.title}
Date: October ${10 + i}

This official communication outlines our upcoming initiatives concerning ${item.topic}. Our executive management team has established [1] guidelines to guarantee a smooth and seamless execution across all regional departments.

All participating staff members are strongly encouraged to review the documentation [2] before attending the orientation seminar scheduled for next Tuesday. 

[3] 

Should you require further clarification regarding procedural changes or technical requirements, please reach out to your designated department liaison [4].`;

  PART6_PASSAGES.push({
    id: pId,
    partNumber: 6,
    type: 'text',
    title: item.title,
    textContent: content,
    questions: [
      {
        id: `q6-${baseQNum < 10 ? '0' + baseQNum : baseQNum}`,
        partNumber: 6,
        passageId: pId,
        questionNumber: baseQNum,
        questionText: 'Select the best option for blank [1]:',
        options: [
          { key: 'A', text: 'comprehensive' },
          { key: 'B', text: 'comprehensively' },
          { key: 'C', text: 'comprehend' },
          { key: 'D', text: 'comprehension' }
        ],
        correctAnswer: 'A',
        explanation: 'El adjetivo "comprehensive" (exhaustivo, integral) califica adecuadamente al sustantivo plural "guidelines".',
        subtheme: 'Formas de palabras (Adjetivos)',
        difficulty: 'medium'
      },
      {
        id: `q6-${baseQNum + 1}`,
        partNumber: 6,
        passageId: pId,
        questionNumber: baseQNum + 1,
        questionText: 'Select the best option for blank [2]:',
        options: [
          { key: 'A', text: 'thoroughly' },
          { key: 'B', text: 'thorough' },
          { key: 'C', text: 'thoroughness' },
          { key: 'D', text: 'though' }
        ],
        correctAnswer: 'A',
        explanation: 'El adverbio "thoroughly" modifica al verbo "review" (revisar minuciosamente).',
        subtheme: 'Adverbios de modo',
        difficulty: 'easy'
      },
      {
        id: `q6-${baseQNum + 2}`,
        partNumber: 6,
        passageId: pId,
        questionNumber: baseQNum + 2,
        questionText: 'Select the best option for blank [3]:',
        options: [
          { key: 'A', text: 'Early feedback indicates that these changes will significantly increase our operational output.' },
          { key: 'B', text: 'The weather forecast predicts heavy rainfall this weekend.' },
          { key: 'C', text: 'All flights from the terminal have been canceled.' },
          { key: 'D', text: 'The parking lot will be closed for repaving tomorrow.' }
        ],
        correctAnswer: 'A',
        explanation: 'La opción A mantiene la coherencia temática del texto formal sobre mejoras operativas.',
        subtheme: 'Inserción de oraciones lógicas',
        difficulty: 'hard'
      },
      {
        id: `q6-${baseQNum + 3}`,
        partNumber: 6,
        passageId: pId,
        questionNumber: baseQNum + 3,
        questionText: 'Select the best option for blank [4]:',
        options: [
          { key: 'A', text: 'promptly' },
          { key: 'B', text: 'prompt' },
          { key: 'C', text: 'promptness' },
          { key: 'D', text: 'prompter' }
        ],
        correctAnswer: 'A',
        explanation: '"Promptly" es el adverbio que modifica la acción "reach out" (contactar con prontitud).',
        subtheme: 'Adverbios y modificadores verbales',
        difficulty: 'medium'
      }
    ]
  });
}
