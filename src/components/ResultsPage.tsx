import { motion } from 'motion/react';
import {
  CheckCircle2,
  Disc3,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react';
import type { AnswerRecord, TopicPack } from '../types/quiz';
import { computeQuizSummary } from '../utils/quizEngine';

interface ResultsPageProps {
  pack: TopicPack;
  answers: Record<number, AnswerRecord>;
  onResetQuiz: () => void;
  onBackToWheel: (questionIndex?: number) => void;
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export function ResultsPage({
  pack,
  answers,
  onResetQuiz,
  onBackToWheel,
}: ResultsPageProps) {
  const summary = computeQuizSummary(pack.questions, answers);
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset =
    circumference - (summary.accuracyPercent / 100) * circumference;

  return (
    <div className="space-y-8 pb-24 md:pb-14">
      {/* Top Summary Card */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="liquid-glass rounded-3xl p-6 sm:p-8 lg:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Circular Progress Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-40 h-40 -rotate-90" viewBox="0 0 140 140" aria-hidden="true">
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-slate-900/10 dark:text-white/10"
                />
                <motion.circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="url(#resultRingGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeOffset }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
                <defs>
                  <linearGradient id="resultRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-bold text-slate-900 dark:text-white">
                  {summary.accuracyPercent}%
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  aniqlik
                </span>
              </div>
            </div>
          </div>

          {/* Rank & Metrics */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-sky-700 dark:text-sky-300">
                <Trophy className="w-4 h-4" aria-hidden="true" />
                <span>{pack.topicNumber}-Mavzu natijalari</span>
                <span aria-hidden="true">·</span>
                <span>{pack.title}</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {summary.rankTitle}
              </h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="liquid-glass-subtle rounded-2xl p-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  To‘g‘ri javob
                </div>
                <div className="font-mono text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {summary.correctCount} / {summary.totalQuestions}
                </div>
              </div>

              <div className="liquid-glass-subtle rounded-2xl p-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Jami ball
                </div>
                <div className="font-mono text-xl font-bold text-sky-600 dark:text-sky-300 mt-1">
                  {summary.totalPoints}
                </div>
              </div>

              <div className="liquid-glass-subtle rounded-2xl p-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Ishoralar
                </div>
                <div className="font-mono text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {summary.hintsUsedCount}
                </div>
              </div>

              <div className="liquid-glass-subtle rounded-2xl p-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  O‘rtacha vaqt
                </div>
                <div className="font-mono text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {summary.averageSeconds}s
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onBackToWheel()}
                className="glass-cta min-h-[46px] px-5 py-2.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-md transition-all active:scale-[0.98] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <Disc3 className="w-4 h-4" aria-hidden="true" />
                <span>Barabanga qaytish</span>
              </button>

              <button
                type="button"
                onClick={onResetQuiz}
                className="min-h-[46px] px-5 py-2.5 rounded-2xl text-sm font-medium liquid-glass-subtle text-slate-800 dark:text-slate-100 hover:bg-white/75 dark:hover:bg-white/15 transition-all active:scale-[0.98] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Qaytadan boshlash</span>
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Detailed 10-Question Breakdown */}
      <section aria-labelledby="review-heading" className="space-y-4">
        <h2
          id="review-heading"
          className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white px-1"
        >
          Barcha 10 ta savol tahlili
        </h2>

        <div className="space-y-3.5">
          {pack.questions.map((q, idx) => {
            const rec = answers[q.id];
            return (
              <div
                key={q.id}
                className="liquid-glass rounded-2xl p-5 sm:p-6 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="font-mono font-bold text-sky-700 dark:text-sky-300">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{q.category}</span>
                  </div>

                  {rec ? (
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      {rec.isCorrect ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          <span>To‘g‘ri (+{rec.pointsEarned} ball)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          <span>
                            Xato (Tanlangan: {LETTERS[rec.selectedIndex]}, To‘g‘risi: {LETTERS[q.correctIndex]})
                          </span>
                        </span>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onBackToWheel(idx)}
                      className="text-xs font-semibold text-sky-600 dark:text-sky-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded px-1"
                    >
                      Hali yechilmagan — Ochish
                    </button>
                  )}
                </div>

                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {q.title}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {q.prompt}
                </p>

                <div className="pt-2 border-t border-slate-900/10 dark:border-white/10 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    To‘g‘ri javob ({LETTERS[q.correctIndex]}):{' '}
                  </span>
                  {q.options[q.correctIndex]}.{' '}
                  <span className="opacity-90">{q.explanation}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
