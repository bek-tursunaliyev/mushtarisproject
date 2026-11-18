import { useRef } from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, Flame, Sparkles, XCircle } from 'lucide-react';
import type { AnswerRecord, TopicPack } from '../types/quiz';
import { SpinWheel } from './SpinWheel';
import { QuestionCard } from './QuestionCard';

interface WheelQuizPageProps {
  pack: TopicPack;
  answers: Record<number, AnswerRecord>;
  streak: number;
  activeIndex: number | null;
  isSpinning: boolean;
  wheelRotation: number;
  onWheelRotationChange: (deg: number) => void;
  onSpinStart: () => void;
  onSpinComplete: (index: number) => void;
  onSelectManualIndex: (index: number) => void;
  onSubmitAnswer: (
    questionId: number,
    selectedIndex: number,
    usedHint: boolean,
    elapsedSeconds: number
  ) => void;
  onViewResults: () => void;
}

export function WheelQuizPage({
  pack,
  answers,
  streak,
  activeIndex,
  isSpinning,
  wheelRotation,
  onWheelRotationChange,
  onSpinStart,
  onSpinComplete,
  onSelectManualIndex,
  onSubmitAnswer,
  onViewResults,
}: WheelQuizPageProps) {
  const questionStageRef = useRef<HTMLDivElement | null>(null);
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = pack.questions.length;
  const allCompleted = answeredCount >= totalQuestions;
  const totalPoints = Object.values(answers).reduce((sum, r) => sum + r.pointsEarned, 0);

  const activeQuestion =
    activeIndex !== null && pack.questions[activeIndex]
      ? pack.questions[activeIndex]
      : null;

  const handleSpinDone = (idx: number) => {
    onSpinComplete(idx);
    // On compact screens, scroll smoothly into the opened question card
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && questionStageRef.current) {
      setTimeout(() => {
        questionStageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 120);
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-14">
      {/* Top Compact Status Strip */}
      <div className="liquid-glass rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {pack.topicNumber}-Mavzu · Barabanli savollar
          </div>
          <h1 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {pack.title}
          </h1>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <Award className="w-4 h-4 text-sky-500" aria-hidden="true" />
            <span className="font-mono font-bold">{totalPoints}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">ball</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <Flame className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span className="font-mono font-bold">{streak}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">seriya</span>
          </div>
          <div className="font-mono text-xs sm:text-sm font-semibold text-sky-700 dark:text-sky-300">
            {answeredCount} / {totalQuestions}
          </div>
        </div>
      </div>

      {/* Main 2-Column Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Spin Wheel & Quick Number Selector */}
        <div className="lg:col-span-6 liquid-glass rounded-3xl p-5 sm:p-7 flex flex-col items-center gap-6">
          <SpinWheel
            questions={pack.questions}
            answers={answers}
            isSpinning={isSpinning}
            activeIndex={activeIndex}
            rotation={wheelRotation}
            onRotationChange={onWheelRotationChange}
            onSpinStart={onSpinStart}
            onSpinComplete={handleSpinDone}
          />

          {/* Quick 01-10 Manual Selector */}
          <div className="w-full pt-4 border-t border-slate-900/10 dark:border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Yoki savol raqamini qo‘lda tanlang</span>
              <span className="font-mono">01–10</span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {pack.questions.map((q, idx) => {
                const rec = answers[q.id];
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    disabled={isSpinning}
                    onClick={() => onSelectManualIndex(idx)}
                    aria-label={`${idx + 1}-savolni ochish`}
                    aria-pressed={isActive}
                    className={`min-h-[40px] rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-md scale-105'
                        : rec
                        ? rec.isCorrect
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/35'
                          : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/35'
                        : 'liquid-glass-subtle text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-white/15'
                    }`}
                  >
                    <span>{String(idx + 1).padStart(2, '0')}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Active Question Stage or Ready Briefing */}
        <div ref={questionStageRef} className="lg:col-span-6">
          {activeQuestion && activeIndex !== null ? (
            <QuestionCard
              question={activeQuestion}
              questionIndex={activeIndex}
              totalQuestions={totalQuestions}
              existingAnswer={answers[activeQuestion.id]}
              allCompleted={allCompleted}
              onSubmitAnswer={(selectedIdx, usedHint, elapsed) =>
                onSubmitAnswer(activeQuestion.id, selectedIdx, usedHint, elapsed)
              }
              onSpinAgain={() => {
                const spinBtn = document.querySelector<HTMLButtonElement>(
                  'button[aria-label="Barabanni aylantirish"]'
                );
                spinBtn?.click();
              }}
              onViewResults={onViewResults}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-6"
            >
              <div className="w-12 h-12 rounded-2xl liquid-glass-subtle flex items-center justify-center text-sky-600 dark:text-sky-300">
                <Sparkles className="w-6 h-6" aria-hidden="true" />
              </div>

              <div className="space-y-2.5">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {isSpinning
                    ? 'Baraban aylanmoqda...'
                    : 'Barabanni aylantiring va savolni oching'}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isSpinning
                    ? 'Qaysi mantiqiy kazus tushishini kuting. Baraban to‘xtagach savol darhol shu oynada ochiladi.'
                    : 'Chap tomondagi “Barabanni aylantir” tugmasini bosing. Baraban hali yechilmagan savollardan biriga to‘xtaydi va sizning tahliliy fikrlashingizni sinovdan o‘tkazadi.'}
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Qanday baholanadi?
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                    <span>Har bir to‘g‘ri javob uchun +100 ball va seriya bonusi (+15)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <XCircle className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
                    <span>Mantiqiy ishoradan foydalansangiz -25 ball chegiriladi</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
