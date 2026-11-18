import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Disc3,
  Moon,
  SlidersHorizontal,
  Sun,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import type { AnswerRecord, ThemeMode, TopicPack } from '../types/quiz';
import { SeparationTriad } from './SeparationTriad';

interface LandingPageProps {
  pack: TopicPack;
  answers: Record<number, AnswerRecord>;
  theme: ThemeMode;
  soundEnabled: boolean;
  onToggleTheme: () => void;
  onToggleSound: () => void;
  onGoToWheel: (preselectIndex?: number) => void;
  onOpenEditor: () => void;
}

export function LandingPage({
  pack,
  answers,
  theme,
  soundEnabled,
  onToggleTheme,
  onToggleSound,
  onGoToWheel,
  onOpenEditor,
}: LandingPageProps) {
  const answeredList = Object.values(answers);
  const correctCount = answeredList.filter((a) => a.isCorrect).length;
  const totalPoints = answeredList.reduce((sum, a) => sum + a.pointsEarned, 0);

  return (
    <div className="space-y-8 pb-24 md:pb-14">
      {/* Hero 2-Column Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 liquid-glass rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-300">
              <span>{pack.topicNumber}-Mavzu</span>
              <span aria-hidden="true">·</span>
              <span>10 ta tahliliy savol</span>
              <span aria-hidden="true">·</span>
              <span>Barabanli viktorina</span>
            </div>

            <h1
              className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              {pack.title}
            </h1>

            <p className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-200 leading-relaxed max-w-2xl">
              {pack.subtitle}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {pack.description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => onGoToWheel()}
              className="glass-cta min-h-[48px] px-6 py-3 rounded-2xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-lg shadow-sky-900/25 transition-all active:scale-[0.98] flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <Disc3 className="w-5 h-5" aria-hidden="true" />
              <span>Barabanli savollarga o‘tish</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onOpenEditor}
              className="min-h-[48px] px-5 py-3 rounded-2xl text-sm font-medium text-slate-800 dark:text-slate-100 liquid-glass-subtle hover:bg-white/75 dark:hover:bg-white/15 transition-all active:scale-[0.98] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>Savollarni tahrirlash</span>
            </button>
          </div>
        </motion.div>

        {/* Right: iOS Control Center + Live Wheel Preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 liquid-glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6"
        >
          {/* Miniature animated wheel emblem + status */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Viktorina holati
              </div>
              <div className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-0.5 font-mono">
                {answeredList.length} / {pack.questions.length}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {correctCount} ta to‘g‘ri · {totalPoints} ball
              </div>
            </div>

            {/* Subtle rotating miniature wheel icon */}
            <button
              type="button"
              onClick={() => onGoToWheel()}
              aria-label="Baraban sahifasini ochish"
              className="group relative w-20 h-20 rounded-full liquid-glass-subtle flex items-center justify-center shrink-0 hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <svg
                viewBox="0 0 100 100"
                className="w-16 h-16 transition-transform duration-700 group-hover:rotate-90"
                aria-hidden="true"
              >
                {Array.from({ length: 10 }, (_, idx) => {
                  const a1 = ((idx * 36 - 90) * Math.PI) / 180;
                  const a2 = (((idx + 1) * 36 - 90) * Math.PI) / 180;
                  const x1 = 50 + 44 * Math.cos(a1);
                  const y1 = 50 + 44 * Math.sin(a1);
                  const x2 = 50 + 44 * Math.cos(a2);
                  const y2 = 50 + 44 * Math.sin(a2);
                  const hues = [
                    '#0284C7',
                    '#4F46E5',
                    '#0D9488',
                    '#2563EB',
                    '#7C3AED',
                    '#0891B2',
                    '#059669',
                    '#4338CA',
                    '#0369A1',
                    '#6D28D9',
                  ];
                  return (
                    <path
                      key={idx}
                      d={`M50,50 L${x1},${y1} A44,44 0 0,1 ${x2},${y2} Z`}
                      fill={hues[idx]}
                      fillOpacity={0.78}
                      stroke="rgba(255,255,255,0.45)"
                      strokeWidth="1"
                    />
                  );
                })}
                <circle
                  cx="50"
                  cy="50"
                  r="13"
                  fill="rgba(255,255,255,0.9)"
                />
              </svg>
            </button>
          </div>

          {/* iOS Control Center Quick Toggles */}
          <div className="space-y-3">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              iOS Boshqaruv markazi
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onToggleTheme}
                className="min-h-[56px] rounded-2xl px-4 py-3 liquid-glass-subtle hover:bg-white/75 dark:hover:bg-white/15 transition-all flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-sky-300 shrink-0" aria-hidden="true" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-500 shrink-0" aria-hidden="true" />
                )}
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    Ko‘rinish
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {theme === 'dark' ? 'Tun shishasi' : 'Kun shishasi'}
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={onToggleSound}
                className="min-h-[56px] rounded-2xl px-4 py-3 liquid-glass-subtle hover:bg-white/75 dark:hover:bg-white/15 transition-all flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-teal-500 dark:text-teal-300 shrink-0" aria-hidden="true" />
                ) : (
                  <VolumeX className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                )}
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                    Tovushlar
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {soundEnabled ? 'Yoqilgan' : 'O‘chirilgan'}
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-900/10 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            2-sahifada barabanni aylantiring — tushgan raqamdagi mantiqiy kazus ochiladi, ishora olish va tahlilni ko‘rish mumkin.
          </div>
        </motion.div>
      </section>

      {/* Interactive Topic 18 Checks & Balances Triad */}
      <SeparationTriad />

      {/* 10 Questions Overview Grid */}
      <section aria-labelledby="questions-map-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
          <div>
            <h2
              id="questions-map-heading"
              className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
            >
              10 ta tahliliy savol xaritasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Barabanda qaysi raqam tushishini kuting yoki istalgan savolga o‘ting.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Jami: {pack.questions.length} ta topshiriq
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {pack.questions.map((q, idx) => {
            const record = answers[q.id];
            return (
              <motion.button
                key={q.id}
                type="button"
                onClick={() => onGoToWheel(idx)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16 }}
                className="text-left liquid-glass-subtle hover:bg-white/75 dark:hover:bg-white/15 rounded-2xl p-4 flex flex-col justify-between min-h-[124px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <div className="flex items-center justify-between gap-2 w-full">
                  <span className="font-mono text-xs font-semibold text-sky-700 dark:text-sky-300">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {record ? (
                    record.isCorrect ? (
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"
                        aria-label="To‘g‘ri yechildi"
                      />
                    ) : (
                      <XCircle
                        className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0"
                        aria-label="Noto‘g‘ri yechildi"
                      />
                    )
                  ) : (
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      Kutilmoqda
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {q.category}
                  </div>
                  <div className="font-display text-sm font-semibold text-slate-900 dark:text-white mt-0.5 line-clamp-2 leading-snug">
                    {q.title}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
