export type TOEICSection = 'listening' | 'reading';

export type PartNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface PartInfo {
  id: number;
  partNumber: PartNumber;
  name: string;
  nameEn: string;
  section: TOEICSection;
  description: string;
  instructions: string;
  questionCountRealExam: number;
  timeAdviceMinutes: number;
  iconName: string;
  color: string;
}

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  partNumber: PartNumber;
  passageId?: string;
  questionNumber?: number; // Within a set or exam
  questionText: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  subtheme: string; // e.g. 'Tiempos verbales', 'Preposiciones', 'Vocabulario de negocios', 'Inferencias'
  difficulty: Difficulty;
  audioScript?: string; // Spoken text for listening questions
}

export interface Passage {
  id: string;
  partNumber: PartNumber;
  type: 'image' | 'audio' | 'text' | 'image_and_audio' | 'double_passage' | 'triple_passage';
  title?: string;
  contentUrl?: string; // For images or audio MP3
  textContent?: string; // For reading texts (emails, memos, articles)
  secondTextContent?: string; // For double passages
  thirdTextContent?: string; // For triple passages
  transcriptHidden?: string; // Audio script for listening parts (revealed upon review)
  questions: Question[];
}

export interface AttemptAnswer {
  questionId: string;
  partNumber: PartNumber;
  userAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface ExamAttempt {
  id: string;
  userId?: string;
  mode: 'practice' | 'mock_test';
  partNumber?: PartNumber; // Null if full mock test
  totalQuestions: number;
  correctCount: number;
  scoreListening?: number; // 5 - 495
  scoreReading?: number;   // 5 - 495
  totalScore?: number;     // 10 - 990
  timeSpentSeconds: number;
  completedAt: string;
  answers: AttemptAnswer[];
}

export interface ReviewItem {
  questionId: string;
  question: Question;
  passage?: Passage;
  missedCount: number;
  correctInARow: number;
  isMastered: boolean;
  lastAttemptedAt: string;
}

export interface UserStats {
  totalPracticed: number;
  totalCorrect: number;
  studyStreakDays: number;
  estimatedListeningScore: number;
  estimatedReadingScore: number;
  estimatedTotalScore: number;
  accuracyByPart: Record<PartNumber, { total: number; correct: number }>;
  accuracyBySubtheme: Record<string, { total: number; correct: number }>;
  lastPracticedDate?: string;
}
