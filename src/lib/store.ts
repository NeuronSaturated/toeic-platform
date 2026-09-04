import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PartNumber, Question, Passage, ExamAttempt, ReviewItem, UserStats } from './types';
import { calculateTOEICScore } from './toeic-scoring';

interface AppState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Global User Stats
  stats: UserStats;
  recordAnswer: (question: Question, selectedAnswer: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => void;
  recordExamAttempt: (attempt: ExamAttempt) => void;

  // Review Bank (Banco de Errores)
  reviewBank: Record<string, ReviewItem>;
  addToReviewBank: (question: Question, passage?: Passage) => void;
  recordReviewAttempt: (questionId: string, isCorrect: boolean) => void;
  clearMasteredReviewItems: () => void;

  // Practice Mode State
  practiceSelectedAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  setPracticeAnswer: (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => void;
  resetPracticeSession: () => void;

  // Mock Test State
  mockTestActive: boolean;
  mockTestMode: 'quick' | 'full';
  mockTestTimeRemaining: number;
  mockTestAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  mockTestFlagged: Record<string, boolean>;
  mockTestCurrentIndex: number;
  mockTestCompleted: boolean;
  mockTestReport: ExamAttempt | null;
  startMockTest: (mode: 'quick' | 'full') => void;
  setMockTestAnswer: (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => void;
  toggleMockTestFlag: (questionId: string) => void;
  setMockTestCurrentIndex: (index: number) => void;
  tickMockTestTimer: () => void;
  finishMockTest: (allQuestions: { question: Question; passage?: Passage }[]) => void;
  resetMockTest: () => void;
}

const INITIAL_STATS: UserStats = {
  totalPracticed: 0,
  totalCorrect: 0,
  studyStreakDays: 1,
  estimatedListeningScore: 250,
  estimatedReadingScore: 230,
  estimatedTotalScore: 480,
  accuracyByPart: {
    1: { total: 0, correct: 0 },
    2: { total: 0, correct: 0 },
    3: { total: 0, correct: 0 },
    4: { total: 0, correct: 0 },
    5: { total: 0, correct: 0 },
    6: { total: 0, correct: 0 },
    7: { total: 0, correct: 0 }
  },
  accuracyBySubtheme: {}
};

export const useTOEICStore = create<AppState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      toggleDarkMode: () => set(state => {
        const next = !state.isDarkMode;
        if (typeof document !== 'undefined') {
          if (next) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
        return { isDarkMode: next };
      }),

      stats: INITIAL_STATS,

      recordAnswer: (question, selectedAnswer, isCorrect) => {
        set(state => {
          const stats = { ...state.stats };
          stats.totalPracticed += 1;
          if (isCorrect) stats.totalCorrect += 1;

          // Update part accuracy
          const partNum = question.partNumber;
          const currentPart = stats.accuracyByPart[partNum] || { total: 0, correct: 0 };
          stats.accuracyByPart[partNum] = {
            total: currentPart.total + 1,
            correct: currentPart.correct + (isCorrect ? 1 : 0)
          };

          // Update subtheme
          const sub = question.subtheme || 'General';
          const currentSub = stats.accuracyBySubtheme[sub] || { total: 0, correct: 0 };
          stats.accuracyBySubtheme[sub] = {
            total: currentSub.total + 1,
            correct: currentSub.correct + (isCorrect ? 1 : 0)
          };

          // Update estimated TOEIC scores
          const listeningParts = [1, 2, 3, 4] as PartNumber[];
          const readingParts = [5, 6, 7] as PartNumber[];

          let lCorrect = 0, lTotal = 0;
          listeningParts.forEach(p => {
            lCorrect += stats.accuracyByPart[p].correct;
            lTotal += stats.accuracyByPart[p].total;
          });

          let rCorrect = 0, rTotal = 0;
          readingParts.forEach(p => {
            rCorrect += stats.accuracyByPart[p].correct;
            rTotal += stats.accuracyByPart[p].total;
          });

          const scoring = calculateTOEICScore(
            lTotal > 0 ? lCorrect : 30,
            lTotal > 0 ? lTotal : 100,
            rTotal > 0 ? rCorrect : 30,
            rTotal > 0 ? rTotal : 100
          );

          stats.estimatedListeningScore = scoring.listeningScore;
          stats.estimatedReadingScore = scoring.readingScore;
          stats.estimatedTotalScore = scoring.totalScore;

          // Also manage review bank: if incorrect, auto-add to review bank
          const reviewBank = { ...state.reviewBank };
          if (!isCorrect) {
            const existing = reviewBank[question.id];
            reviewBank[question.id] = {
              questionId: question.id,
              question,
              missedCount: (existing?.missedCount || 0) + 1,
              correctInARow: 0,
              isMastered: false,
              lastAttemptedAt: new Date().toISOString()
            };
          }

          return { stats, reviewBank };
        });
      },

      recordExamAttempt: (attempt) => {
        set(state => {
          const stats = { ...state.stats };
          if (attempt.scoreListening && attempt.scoreReading && attempt.totalScore) {
            stats.estimatedListeningScore = attempt.scoreListening;
            stats.estimatedReadingScore = attempt.scoreReading;
            stats.estimatedTotalScore = attempt.totalScore;
          }
          return { stats };
        });
      },

      reviewBank: {},

      addToReviewBank: (question, passage) => {
        set(state => {
          const reviewBank = { ...state.reviewBank };
          reviewBank[question.id] = {
            questionId: question.id,
            question,
            passage,
            missedCount: (reviewBank[question.id]?.missedCount || 0) + 1,
            correctInARow: 0,
            isMastered: false,
            lastAttemptedAt: new Date().toISOString()
          };
          return { reviewBank };
        });
      },

      recordReviewAttempt: (questionId, isCorrect) => {
        set(state => {
          const reviewBank = { ...state.reviewBank };
          const item = reviewBank[questionId];
          if (!item) return state;

          if (isCorrect) {
            const newStreak = item.correctInARow + 1;
            reviewBank[questionId] = {
              ...item,
              correctInARow: newStreak,
              isMastered: newStreak >= 2, // Mastered after 2 consecutive correct answers
              lastAttemptedAt: new Date().toISOString()
            };
          } else {
            reviewBank[questionId] = {
              ...item,
              missedCount: item.missedCount + 1,
              correctInARow: 0,
              isMastered: false,
              lastAttemptedAt: new Date().toISOString()
            };
          }

          return { reviewBank };
        });
      },

      clearMasteredReviewItems: () => {
        set(state => {
          const reviewBank = { ...state.reviewBank };
          Object.keys(reviewBank).forEach(k => {
            if (reviewBank[k].isMastered) {
              delete reviewBank[k];
            }
          });
          return { reviewBank };
        });
      },

      practiceSelectedAnswers: {},
      setPracticeAnswer: (questionId, answer) => {
        set(state => ({
          practiceSelectedAnswers: {
            ...state.practiceSelectedAnswers,
            [questionId]: answer
          }
        }));
      },
      resetPracticeSession: () => set({ practiceSelectedAnswers: {} }),

      // Mock Test
      mockTestActive: false,
      mockTestMode: 'quick',
      mockTestTimeRemaining: 1800, // 30 min for quick, 7200 for full (120 min)
      mockTestAnswers: {},
      mockTestFlagged: {},
      mockTestCurrentIndex: 0,
      mockTestCompleted: false,
      mockTestReport: null,

      startMockTest: (mode) => {
        const timeLimit = mode === 'quick' ? 30 * 60 : 120 * 60;
        set({
          mockTestActive: true,
          mockTestMode: mode,
          mockTestTimeRemaining: timeLimit,
          mockTestAnswers: {},
          mockTestFlagged: {},
          mockTestCurrentIndex: 0,
          mockTestCompleted: false,
          mockTestReport: null
        });
      },

      setMockTestAnswer: (questionId, answer) => {
        set(state => ({
          mockTestAnswers: {
            ...state.mockTestAnswers,
            [questionId]: answer
          }
        }));
      },

      toggleMockTestFlag: (questionId) => {
        set(state => ({
          mockTestFlagged: {
            ...state.mockTestFlagged,
            [questionId]: !state.mockTestFlagged[questionId]
          }
        }));
      },

      setMockTestCurrentIndex: (index) => set({ mockTestCurrentIndex: index }),

      tickMockTestTimer: () => {
        set(state => {
          if (!state.mockTestActive || state.mockTestCompleted) return state;
          if (state.mockTestTimeRemaining <= 1) {
            return { mockTestTimeRemaining: 0 };
          }
          return { mockTestTimeRemaining: state.mockTestTimeRemaining - 1 };
        });
      },

      finishMockTest: (allQuestions) => {
        const state = get();
        let correctCount = 0;
        let lCorrect = 0, lTotal = 0;
        let rCorrect = 0, rTotal = 0;

        const answersList = allQuestions.map(item => {
          const q = item.question;
          const userAns = state.mockTestAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;
          if (isCorrect) correctCount++;

          if (q.partNumber <= 4) {
            lTotal++;
            if (isCorrect) lCorrect++;
          } else {
            rTotal++;
            if (isCorrect) rCorrect++;
          }

          // Also record to store stats
          state.recordAnswer(q, userAns || 'A', isCorrect);

          return {
            questionId: q.id,
            partNumber: q.partNumber,
            userAnswer: (userAns || 'A') as 'A' | 'B' | 'C' | 'D',
            isCorrect,
            timeSpentSeconds: 60
          };
        });

        const scoring = calculateTOEICScore(lCorrect, lTotal, rCorrect, rTotal);

        const report: ExamAttempt = {
          id: 'attempt-' + Date.now(),
          mode: 'mock_test',
          totalQuestions: allQuestions.length,
          correctCount,
          scoreListening: scoring.listeningScore,
          scoreReading: scoring.readingScore,
          totalScore: scoring.totalScore,
          timeSpentSeconds: (state.mockTestMode === 'quick' ? 1800 : 7200) - state.mockTestTimeRemaining,
          completedAt: new Date().toISOString(),
          answers: answersList
        };

        set({
          mockTestActive: false,
          mockTestCompleted: true,
          mockTestReport: report
        });
      },

      resetMockTest: () => {
        set({
          mockTestActive: false,
          mockTestCompleted: false,
          mockTestReport: null,
          mockTestAnswers: {},
          mockTestFlagged: {}
        });
      }
    }),
    {
      name: 'toeic-mastery-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        stats: state.stats,
        reviewBank: state.reviewBank
      })
    }
  )
);
