import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { AnswerRecord, PageView, ThemeMode, TopicPack } from './types/quiz';
import { TOPIC_18_PACKS } from './data/topic18Packs';
import { calculateQuestionPoints } from './utils/quizEngine';
import { soundEngine } from './utils/soundEffects';
import { LiquidBackdrop } from './components/LiquidBackdrop';
import { TopNavBar } from './components/TopNavBar';
import { LandingPage } from './components/LandingPage';
import { WheelQuizPage } from './components/WheelQuizPage';
import { ResultsPage } from './components/ResultsPage';
import { TopicEditorModal } from './components/TopicEditorModal';

const STORAGE_KEY_PACK = 'mavzu18_pack_v2';
const STORAGE_KEY_ANSWERS = 'mavzu18_answers_v2';
const STORAGE_KEY_THEME = 'mavzu18_theme_v2';

function loadInitialPack(): TopicPack {
  if (typeof window === 'undefined') return TOPIC_18_PACKS[0];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_PACK);
    if (raw) {
      const parsed = JSON.parse(raw) as TopicPack;
      if (parsed && Array.isArray(parsed.questions) && parsed.questions.length === 10) {
        return parsed;
      }
    }
  } catch {
    // ignore storage errors
  }
  return TOPIC_18_PACKS[0];
}

function loadInitialAnswers(): Record<number, AnswerRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_ANSWERS);
    if (raw) return JSON.parse(raw) as Record<number, AnswerRecord>;
  } catch {
    // ignore storage errors
  }
  return {};
}

function loadInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY_THEME);
  return stored === 'light' ? 'light' : 'dark';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageView>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return 'wheel';
    }
    return 'intro';
  });

  const [pack, setPack] = useState<TopicPack>(loadInitialPack);
  const [answers, setAnswers] = useState<Record<number, AnswerRecord>>(loadInitialAnswers);
  const [theme, setTheme] = useState<ThemeMode>(loadInitialTheme);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [streak, setStreak] = useState<number>(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);

  // Sync Tailwind dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    soundEngine.enabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_PACK, JSON.stringify(pack));
    } catch {
      // ignore
    }
  }, [pack]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY_ANSWERS, JSON.stringify(answers));
    } catch {
      // ignore
    }
  }, [answers]);

  useEffect(() => {
    document.body.setAttribute('data-state', activePage);
  }, [activePage]);

  const handleNavigate = (page: PageView) => {
    soundEngine.playTap();
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToWheel = (preselectIndex?: number) => {
    soundEngine.playTap();
    if (typeof preselectIndex === 'number') {
      setActiveQuestionIndex(preselectIndex);
    }
    setActivePage('wheel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpinStart = () => {
    setIsSpinning(true);
  };

  const handleSpinComplete = (selectedIdx: number) => {
    setIsSpinning(false);
    setActiveQuestionIndex(selectedIdx);
    soundEngine.playTap();
  };

  const handleSubmitAnswer = (
    questionId: number,
    selectedIndex: number,
    usedHint: boolean,
    elapsedSeconds: number
  ) => {
    const question = pack.questions.find((q) => q.id === questionId);
    if (!question || answers[questionId]) return;

    const isCorrect = selectedIndex === question.correctIndex;
    const nextStreak = isCorrect ? streak + 1 : 0;
    const pointsEarned = calculateQuestionPoints(isCorrect, usedHint, streak);

    if (isCorrect) {
      soundEngine.playSuccess();
    } else {
      soundEngine.playError();
    }

    const updatedAnswers: Record<number, AnswerRecord> = {
      ...answers,
      [questionId]: {
        questionId,
        selectedIndex,
        isCorrect,
        usedHint,
        pointsEarned,
        elapsedSeconds,
      },
    };

    setStreak(nextStreak);
    setAnswers(updatedAnswers);

    if (Object.keys(updatedAnswers).length === pack.questions.length) {
      setTimeout(() => soundEngine.playCelebration(), 280);
    }
  };

  const handleResetQuiz = () => {
    soundEngine.playTap();
    setAnswers({});
    setStreak(0);
    setActiveQuestionIndex(null);
    setActivePage('wheel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSavePack = (updatedPack: TopicPack) => {
    soundEngine.playTap();
    const packChanged = updatedPack.id !== pack.id;
    setPack(updatedPack);
    if (packChanged) {
      setAnswers({});
      setStreak(0);
      setActiveQuestionIndex(null);
    }
  };

  const handleResetDefaultPack = () => {
    soundEngine.playTap();
    setPack(TOPIC_18_PACKS[0]);
    setAnswers({});
    setStreak(0);
    setActiveQuestionIndex(null);
  };

  return (
    <div className="min-h-screen relative text-slate-900 dark:text-slate-100">
      <LiquidBackdrop />

      <TopNavBar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenEditor={() => {
          soundEngine.playTap();
          setEditorOpen(true);
        }}
        answeredCount={Object.keys(answers).length}
        totalQuestions={pack.questions.length}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <AnimatePresence mode="wait">
          {activePage === 'intro' && (
            <motion.div
              key="page-intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <LandingPage
                pack={pack}
                answers={answers}
                theme={theme}
                soundEnabled={soundEnabled}
                onToggleTheme={() => {
                  soundEngine.playTap();
                  setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
                }}
                onToggleSound={() => setSoundEnabled((s) => !s)}
                onGoToWheel={handleGoToWheel}
                onOpenEditor={() => {
                  soundEngine.playTap();
                  setEditorOpen(true);
                }}
              />
            </motion.div>
          )}

          {activePage === 'wheel' && (
            <motion.div
              key="page-wheel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <WheelQuizPage
                pack={pack}
                answers={answers}
                streak={streak}
                activeIndex={activeQuestionIndex}
                isSpinning={isSpinning}
                wheelRotation={wheelRotation}
                onWheelRotationChange={setWheelRotation}
                onSpinStart={handleSpinStart}
                onSpinComplete={handleSpinComplete}
                onSelectManualIndex={(idx) => {
                  soundEngine.playTap();
                  setActiveQuestionIndex(idx);
                }}
                onSubmitAnswer={handleSubmitAnswer}
                onViewResults={() => handleNavigate('results')}
              />
            </motion.div>
          )}

          {activePage === 'results' && (
            <motion.div
              key="page-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <ResultsPage
                pack={pack}
                answers={answers}
                onResetQuiz={handleResetQuiz}
                onBackToWheel={handleGoToWheel}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <TopicEditorModal
        isOpen={editorOpen}
        currentPack={pack}
        onClose={() => setEditorOpen(false)}
        onSavePack={handleSavePack}
        onResetDefault={handleResetDefaultPack}
      />
    </div>
  );
}
