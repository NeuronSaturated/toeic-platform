import { Question, Passage, PartNumber } from '../types';
import { PART1_PASSAGES } from './part1-data';
import { PART2_QUESTIONS } from './part2-data';
import { PART3_PASSAGES } from './part3-data';
import { PART4_PASSAGES } from './part4-data';
import { PART5_QUESTIONS } from './part5-data';
import { PART6_PASSAGES } from './part6-data';
import { PART7_PASSAGES } from './part7-data';

export {
  PART1_PASSAGES,
  PART2_QUESTIONS,
  PART3_PASSAGES,
  PART4_PASSAGES,
  PART5_QUESTIONS,
  PART6_PASSAGES,
  PART7_PASSAGES
};

/**
 * Returns all passages for a specific part (Parts 1, 3, 4, 6, 7).
 */
export function getPassagesByPart(partNumber: PartNumber): Passage[] {
  switch (partNumber) {
    case 1:
      return PART1_PASSAGES;
    case 3:
      return PART3_PASSAGES;
    case 4:
      return PART4_PASSAGES;
    case 6:
      return PART6_PASSAGES;
    case 7:
      return PART7_PASSAGES;
    default:
      return [];
  }
}

/**
 * Returns all questions for a specific part (Parts 1 to 7).
 */
export function getQuestionsByPart(partNumber: PartNumber): Question[] {
  switch (partNumber) {
    case 1:
      return PART1_PASSAGES.flatMap(p => p.questions);
    case 2:
      return PART2_QUESTIONS;
    case 3:
      return PART3_PASSAGES.flatMap(p => p.questions);
    case 4:
      return PART4_PASSAGES.flatMap(p => p.questions);
    case 5:
      return PART5_QUESTIONS;
    case 6:
      return PART6_PASSAGES.flatMap(p => p.questions);
    case 7:
      return PART7_PASSAGES.flatMap(p => p.questions);
    default:
      return [];
  }
}

/**
 * Returns all questions across all 7 parts in the database.
 */
export function getAllQuestions(): Question[] {
  return [
    ...getQuestionsByPart(1),
    ...getQuestionsByPart(2),
    ...getQuestionsByPart(3),
    ...getQuestionsByPart(4),
    ...getQuestionsByPart(5),
    ...getQuestionsByPart(6),
    ...getQuestionsByPart(7)
  ];
}

/**
 * Total question counts for each part.
 */
export const TOTAL_EXERCISE_COUNTS: Record<PartNumber, number> = {
  1: PART1_PASSAGES.length,
  2: PART2_QUESTIONS.length,
  3: PART3_PASSAGES.flatMap(p => p.questions).length,
  4: PART4_PASSAGES.flatMap(p => p.questions).length,
  5: PART5_QUESTIONS.length,
  6: PART6_PASSAGES.flatMap(p => p.questions).length,
  7: PART7_PASSAGES.flatMap(p => p.questions).length
};

/**
 * Generates an official or quick simulated TOEIC exam question set.
 * Quick mode: ~28 questions (proportional across all 7 parts)
 * Full mode: ~100 questions (50 Listening, 50 Reading)
 */
export function generateMockTestSet(mode: 'quick' | 'full' = 'quick'): {
  listeningQuestions: { question: Question; passage?: Passage }[];
  readingQuestions: { question: Question; passage?: Passage }[];
} {
  const listening: { question: Question; passage?: Passage }[] = [];
  const reading: { question: Question; passage?: Passage }[] = [];

  if (mode === 'quick') {
    // Quick test: 4 from Part 1, 6 from Part 2, 2 passages from Part 3 (6 Qs), 2 passages from Part 4 (6 Qs) -> 22 Listening
    // 8 from Part 5, 2 passages from Part 6 (8 Qs), 2 passages from Part 7 (6 Qs) -> 22 Reading
    PART1_PASSAGES.slice(0, 4).forEach(p => listening.push({ question: p.questions[0], passage: p }));
    PART2_QUESTIONS.slice(0, 6).forEach(q => listening.push({ question: q }));
    PART3_PASSAGES.slice(0, 2).forEach(p => p.questions.forEach(q => listening.push({ question: q, passage: p })));
    PART4_PASSAGES.slice(0, 2).forEach(p => p.questions.forEach(q => listening.push({ question: q, passage: p })));

    PART5_QUESTIONS.slice(0, 8).forEach(q => reading.push({ question: q }));
    PART6_PASSAGES.slice(0, 2).forEach(p => p.questions.forEach(q => reading.push({ question: q, passage: p })));
    PART7_PASSAGES.slice(0, 2).forEach(p => p.questions.forEach(q => reading.push({ question: q, passage: p })));
  } else {
    // Full practice test (100 questions total: 50 Listening, 50 Reading)
    PART1_PASSAGES.slice(0, 6).forEach(p => listening.push({ question: p.questions[0], passage: p }));
    PART2_QUESTIONS.slice(0, 20).forEach(q => listening.push({ question: q }));
    PART3_PASSAGES.slice(0, 4).forEach(p => p.questions.forEach(q => listening.push({ question: q, passage: p })));
    PART4_PASSAGES.slice(0, 4).forEach(p => p.questions.forEach(q => listening.push({ question: q, passage: p })));

    PART5_QUESTIONS.slice(0, 20).forEach(q => reading.push({ question: q }));
    PART6_PASSAGES.slice(0, 3).forEach(p => p.questions.forEach(q => reading.push({ question: q, passage: p })));
    PART7_PASSAGES.slice(0, 6).forEach(p => p.questions.forEach(q => reading.push({ question: q, passage: p })));
  }

  return { listeningQuestions: listening, readingQuestions: reading };
}
