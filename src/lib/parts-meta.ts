import { PartInfo } from './types';

export const TOEIC_PARTS: PartInfo[] = [
  {
    id: 1,
    partNumber: 1,
    name: 'Fotografías',
    nameEn: 'Photographs',
    section: 'listening',
    description: 'Observa una fotografía y escucha 4 afirmaciones en audio. Elige la que describe con precisión la imagen.',
    instructions: 'Para cada pregunta en esta parte, escucharás cuatro afirmaciones sobre una imagen en tu pantalla. Las afirmaciones no estarán escritas en tu pantalla y solo se pronunciarán una vez. Elige la afirmación que mejor describa lo que ves.',
    questionCountRealExam: 6,
    timeAdviceMinutes: 5,
    iconName: 'Camera',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    partNumber: 2,
    name: 'Pregunta - Respuesta',
    nameEn: 'Question - Response',
    section: 'listening',
    description: 'Solo audio sin texto en pantalla. Escuchas una pregunta o afirmación y tres posibles respuestas habladas (A, B, C).',
    instructions: 'Escucharás una pregunta o declaración y tres respuestas habladas en inglés. No estarán impresas en tu pantalla y solo se pronunciarán una vez. Selecciona la mejor respuesta a la pregunta o afirmación.',
    questionCountRealExam: 25,
    timeAdviceMinutes: 10,
    iconName: 'HelpCircle',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    id: 3,
    partNumber: 3,
    name: 'Conversaciones',
    nameEn: 'Conversations',
    section: 'listening',
    description: 'Diálogos entre 2 o 3 personas de ámbito profesional o comercial. Cada audio genera 3 preguntas vinculadas.',
    instructions: 'Escucharás conversaciones entre dos o más personas. Se te pedirá que respondas a tres preguntas sobre lo que los hablantes dicen en cada diálogo. Selecciona la mejor respuesta a cada pregunta.',
    questionCountRealExam: 39,
    timeAdviceMinutes: 15,
    iconName: 'Users',
    color: 'from-sky-500 to-indigo-500'
  },
  {
    id: 4,
    partNumber: 4,
    name: 'Charlas Breves',
    nameEn: 'Short Talks',
    section: 'listening',
    description: 'Monólogos profesionales como anuncios públicos, reportes meteorológicos o mensajes de voz, con 3 preguntas.',
    instructions: 'Escucharás charlas breves impartidas por un solo orador. Se te pedirá que respondas a tres preguntas sobre lo que dice el orador en cada charla. Selecciona la mejor respuesta.',
    questionCountRealExam: 30,
    timeAdviceMinutes: 15,
    iconName: 'Radio',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 5,
    partNumber: 5,
    name: 'Oraciones Incompletas',
    nameEn: 'Incomplete Sentences',
    section: 'reading',
    description: 'Enunciados con un espacio en blanco y 4 opciones gramaticales o léxicas. Evalúa vocabulario y estructuras formales.',
    instructions: 'Una palabra o frase falta en cada una de las siguientes oraciones. Se presentan cuatro opciones de respuesta debajo de cada oración. Elige la mejor opción para completar la oración.',
    questionCountRealExam: 30,
    timeAdviceMinutes: 15,
    iconName: 'FileEdit',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 6,
    partNumber: 6,
    name: 'Texto Completado',
    nameEn: 'Text Completion',
    section: 'reading',
    description: 'Documentos empresariales breves (correos, notas, cartas) con 4 espacios en blanco que deben rellenarse coherentemente.',
    instructions: 'Lee los textos que siguen. Una palabra, frase o cláusula falta en partes de cada texto. Se dan cuatro opciones para cada espacio en blanco. Selecciona la mejor opción.',
    questionCountRealExam: 16,
    timeAdviceMinutes: 12,
    iconName: 'FileText',
    color: 'from-teal-500 to-emerald-600'
  },
  {
    id: 7,
    partNumber: 7,
    name: 'Comprensión de Lectura',
    nameEn: 'Reading Comprehension',
    section: 'reading',
    description: 'Pasajes individuales, dobles y triples (artículos, mensajes de texto, formularios, horarios) con múltiples preguntas.',
    instructions: 'En esta parte leerás una variedad de textos, como artículos de revistas, cartas, chats y anuncios. Cada texto o grupo de textos va seguido de varias preguntas. Selecciona la mejor respuesta a cada pregunta basada en lo que se dice o infiere.',
    questionCountRealExam: 54,
    timeAdviceMinutes: 48,
    iconName: 'BookOpen',
    color: 'from-amber-500 to-emerald-600'
  }
];

export function getPartInfo(partNumber: number): PartInfo | undefined {
  return TOEIC_PARTS.find(p => p.partNumber === partNumber);
}
