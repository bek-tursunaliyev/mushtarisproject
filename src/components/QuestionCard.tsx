import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Lightbulb,
  RotateCw,
  Timer,
  XCircle,
} from 'lucide-react';
import type { AnswerRecord, Question } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  existingAnswer?: AnswerRecord;
  allCompleted: boolean;
  onSubmitAnswer: (selectedIndex: number, usedHint: boolean, elapsedSeconds: number) => void;
  onSpinAgain: () => void;
  onViewResults: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  existingAnswer,
  allCompleted,
  onSubmitAnswer,
  onSpinAgain,
  onViewResults,
}: QuestionCardProps) {
  const [showHint, setShowHint] = useState(Boolean(existingAnswer?.usedHint));
  const [elapsedSeconds, setElapsedSeconds] = useState(existingAnswer?.elapsedSeconds ?? 0);

  useEffect(() => {
    setShowHint(Boolean(existingAnswer?.usedHint));
    setElapsedSeconds(existingAnswer?.elapsedSeconds ?? 0);
  }, [question.id, existingAnswer]);

  useEffect(() => {
    if (existingAnswer) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [question.id, existingAnswer]);

  // Keyboard shortcuts 1-4 for options
  useEffect(() => {
    if (existingAnswer) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = Number(e.key) - 1;
        onSubmitAnswer(idx, showHint, elapsedSeconds);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [existingAnswer, showHint, elapsedSeconds, onSubmitAnswer]);

  const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
  const secs = String(elapsedSeconds % 60).padStart(2, '0');

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="liquid-glass rounded-3xl p-6 sm:p-7 space-y-5"
    >
      {/* Clean Unboxed Header Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-300">
          <span className="font-mono font-bold">
            Savol {String(questionIndex + 1).padStart(2, '0')} / {totalQuestions}
          </span>
          <span aria-hidden="true">·</span>
          <span>{question.category}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
          <Timer className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{mins}:{secs}</span>
        </div>
      </div>

      {/* Question Title & Prompt */}
      <div className="space-y-2.5">
        <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
          {question.title}
        </h2>
        <p className="text-sm sm:text-[15.5px] leading-relaxed text-slate-700 dark:text-slate-200">
          {question.prompt}
        </p>
      </div>

      {/* Hint Disclosure */}
      {!existingAnswer && (
        <div>
          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            aria-expanded={showHint}
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:opacity-80 transition-opacity py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
          >
            <Lightbulb className="w-4 h-4" aria-hidden="true" />
            <span>
              {showHint ? 'Ishorani yashirish' : 'Mantiqiy ishora olish (-25 ball)'}
            </span>
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-2xl p-3.5 text-xs sm:text-sm bg-amber-500/12 border border-amber-500/25 text-amber-950 dark:text-amber-100 leading-relaxed">
                  <span className="font-semibold">Ishora: </span>
                  {question.hint}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 4 Answer Options */}
      <div className="space-y-2.5" role="group" aria-label="Javob variantlari">
        {question.options.map((opt, idx) => {
          const isAnswered = Boolean(existingAnswer);
          const isChosen = existingAnswer?.selectedIndex === idx;
          const isCorrectOption = question.correctIndex === idx;

          let stateClasses =
            'liquid-glass-subtle hover:bg-white/75 dark:hover:bg-white/15 text-slate-800 dark:text-slate-100';

          if (isAnswered) {
            if (isCorrectOption) {
              stateClasses =
                'bg-emerald-500/18 border border-emerald-500/55 text-emerald-950 dark:text-emerald-100';
            } else if (isChosen && !isCorrectOption) {
              stateClasses =
                'bg-rose-500/18 border border-rose-500/55 text-rose-950 dark:text-rose-100';
            } else {
              stateClasses =
                'liquid-glass-subtle opacity-60 text-slate-600 dark:text-slate-300';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => onSubmitAnswer(idx, showHint, elapsedSeconds)}
              className={`w-full min-h-[50px] rounded-2xl px-4 py-3 text-left transition-all duration-150 flex items-start gap-3.5 active:scale-[0.99] disabled:active:scale-100 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${stateClasses}`}
            >
              <span className="font-mono text-xs font-bold w-7 h-7 rounded-lg bg-slate-900/10 dark:bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                {OPTION_LETTERS[idx]}
              </span>
              <span className="text-sm leading-snug flex-1 pt-0.5">{opt}</span>
              {isAnswered && isCorrectOption && (
                <CheckCircle2
                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                  aria-label="To‘g‘ri javob"
                />
              )}
              {isAnswered && isChosen && !isCorrectOption && (
                <XCircle
                  className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5"
                  aria-label="Tanlangan noto‘g‘ri javob"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback & Explanation */}
      <AnimatePresence>
        {existingAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 pt-2"
          >
            <div
              className={`rounded-2xl p-4 border text-sm leading-relaxed ${
                existingAnswer.isCorrect
                  ? 'bg-emerald-500/12 border-emerald-500/35 text-emerald-950 dark:text-emerald-100'
                  : 'bg-rose-500/12 border-rose-500/35 text-rose-950 dark:text-rose-100'
              }`}
            >
              <div className="flex items-center justify-between gap-2 font-display font-bold mb-1.5">
                <span className="flex items-center gap-2">
                  {existingAnswer.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                      <span>To‘g‘ri javob!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-500" aria-hidden="true" />
                      <span>
                        Noto‘g‘ri — to‘g‘ri javob: {OPTION_LETTERS[question.correctIndex]}
                      </span>
                    </>
                  )}
                </span>
                <span className="font-mono text-xs">
                  +{existingAnswer.pointsEarned} ball
                </span>
              </div>

              <p className="text-xs sm:text-sm opacity-95 leading-relaxed">
                <span className="font-semibold">Mantiqiy izoh: </span>
                {question.explanation}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {!allCompleted ? (
                <button
                  type="button"
                  onClick={onSpinAgain}
                  className="glass-cta flex-1 min-h-[48px] px-5 py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                >
                  <RotateCw className="w-4 h-4" aria-hidden="true" />
                  <span>Keyingi savol uchun barabanni aylantir</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onViewResults}
                  className="glass-cta flex-1 min-h-[48px] px-5 py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <BarChart3 className="w-4 h-4" aria-hidden="true" />
                  <span>Barcha 10 savol yakunlandi — Natijalarni ko‘rish</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
