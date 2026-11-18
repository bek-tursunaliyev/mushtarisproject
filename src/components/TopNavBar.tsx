import { motion } from 'motion/react';
import { Disc3, Home, BarChart3, SlidersHorizontal } from 'lucide-react';
import type { PageView } from '../types/quiz';

interface TopNavBarProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenEditor: () => void;
  answeredCount: number;
  totalQuestions: number;
}

const NAV_ITEMS: { id: PageView; label: string; icon: typeof Home }[] = [
  { id: 'intro', label: 'Kirish', icon: Home },
  { id: 'wheel', label: 'Baraban', icon: Disc3 },
  { id: 'results', label: 'Natijalar', icon: BarChart3 },
];

export function TopNavBar({
  activePage,
  onNavigate,
  onOpenEditor,
  answeredCount,
  totalQuestions,
}: TopNavBarProps) {
  return (
    <>
      <header className="relative md:sticky top-0 z-30 pt-3 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl liquid-island rounded-2xl px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('intro')}
            className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg px-1"
          >
            18-Mavzu
          </button>

          {/* Zone 2: Clean iOS Segmented Navigation (Desktop & Tablet) */}
          <nav
            aria-label="Asosiy sahifalar"
            className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-900/5 dark:bg-white/10"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    isActive
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="desktop-nav-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-white dark:bg-white/20 shadow-sm border border-white/60 dark:border-white/25"
                    />
                  )}
                  <Icon className="relative z-10 w-4 h-4" aria-hidden="true" />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden lg:inline text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {answeredCount}/{totalQuestions} yechildi
            </span>
            <button
              type="button"
              onClick={onOpenEditor}
              className="glass-cta min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:bg-sky-500/90 dark:hover:bg-sky-400 shadow-md shadow-sky-900/20 transition-all active:scale-[0.97] whitespace-nowrap shrink-0 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>Mavzuni sozlash</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile iOS Floating Bottom Tab Bar (under 15% mobile viewport cap) */}
      <nav
        aria-label="Mobil navigatsiya"
        className="md:hidden fixed bottom-3 left-4 right-4 z-40 liquid-island rounded-2xl p-1.5 grid grid-cols-3 gap-1"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative min-h-[46px] rounded-xl flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                isActive
                  ? 'text-sky-600 dark:text-sky-300'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-nav-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-white/85 dark:bg-white/15 border border-white/60 dark:border-white/20 shadow-sm"
                />
              )}
              <Icon className="relative z-10 w-5 h-5" aria-hidden="true" />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
