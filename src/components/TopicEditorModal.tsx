import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, RotateCcw, X } from 'lucide-react';
import type { Question, TopicPack } from '../types/quiz';
import { TOPIC_18_PACKS } from '../data/topic18Packs';
import { validateQuestionInput } from '../utils/quizEngine';

interface TopicEditorModalProps {
  isOpen: boolean;
  currentPack: TopicPack;
  onClose: () => void;
  onSavePack: (updatedPack: TopicPack) => void;
  onResetDefault: () => void;
}

export function TopicEditorModal({
  isOpen,
  currentPack,
  onClose,
  onSavePack,
  onResetDefault,
}: TopicEditorModalProps) {
  const [draft, setDraft] = useState<TopicPack>(currentPack);
  const [selectedQIndex, setSelectedQIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setDraft(JSON.parse(JSON.stringify(currentPack)) as TopicPack);
      setSelectedQIndex(0);
      setErrorMsg(null);
    }
  }, [isOpen, currentPack]);

  const activeQ = draft.questions[selectedQIndex] ?? draft.questions[0];

  const updateQuestion = (patch: Partial<Question>) => {
    setErrorMsg(null);
    setDraft((prev) => ({
      ...prev,
      questions: prev.questions.map((q, idx) =>
        idx === selectedQIndex ? { ...q, ...patch } : q
      ),
    }));
  };

  const updateOption = (optIdx: number, value: string) => {
    setErrorMsg(null);
    const nextOptions = [...activeQ.options] as [string, string, string, string];
    nextOptions[optIdx] = value;
    updateQuestion({ options: nextOptions });
  };

  const handleSelectPreset = (preset: TopicPack) => {
    setDraft(JSON.parse(JSON.stringify(preset)) as TopicPack);
    setSelectedQIndex(0);
    setErrorMsg(null);
  };

  const handleSave = () => {
    if (!draft.title.trim()) {
      setErrorMsg('Mavzu sarlavhasi bo‘sh bo‘lmasligi kerak.');
      return;
    }
    for (let i = 0; i < draft.questions.length; i++) {
      const err = validateQuestionInput(draft.questions[i]);
      if (err) {
        setSelectedQIndex(i);
        setErrorMsg(`${i + 1}-savolda xato: ${err}`);
        return;
      }
    }
    onSavePack(draft);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="editor-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* iOS Glass Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col liquid-glass rounded-t-3xl sm:rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-900/10 dark:border-white/10 flex items-center justify-between gap-4">
              <div>
                <h2
                  id="editor-modal-title"
                  className="font-display text-lg font-bold text-slate-900 dark:text-white"
                >
                  18-Mavzu va 10 savolni sozlash
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tayyor to‘plamni tanlang yoki savollarni o‘zingizga moslab tahrirlang.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Oynani yopish"
                className="w-10 h-10 rounded-full liquid-glass-subtle flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Preset Pack Switcher */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  18-Mavzu tayyor savol to‘plamlari
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TOPIC_18_PACKS.map((preset) => {
                    const isCurrent = draft.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`text-left rounded-2xl p-3.5 transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                          isCurrent
                            ? 'bg-sky-500/15 border-sky-500/50 text-slate-900 dark:text-white'
                            : 'liquid-glass-subtle text-slate-700 dark:text-slate-200 hover:bg-white/75 dark:hover:bg-white/10'
                        }`}
                      >
                        <div className="font-display text-sm font-bold">
                          {preset.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {preset.subtitle}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Topic Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="topic-title-input"
                    className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1"
                  >
                    Mavzu nomi
                  </label>
                  <input
                    id="topic-title-input"
                    type="text"
                    value={draft.title}
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm bg-white/70 dark:bg-slate-900/60 border border-slate-900/15 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="topic-subtitle-input"
                    className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1"
                  >
                    Qisqa tavsif
                  </label>
                  <input
                    id="topic-subtitle-input"
                    type="text"
                    value={draft.subtitle}
                    onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm bg-white/70 dark:bg-slate-900/60 border border-slate-900/15 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              {/* 1-10 Question Selector */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Savolni tanlab tahrirlash (01–10)
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                  {draft.questions.map((q, idx) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setSelectedQIndex(idx)}
                      className={`min-h-[40px] rounded-xl font-mono text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                        selectedQIndex === idx
                          ? 'bg-sky-600 text-white shadow'
                          : 'liquid-glass-subtle text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Question Fields */}
              {activeQ && (
                <div className="liquid-glass-subtle rounded-2xl p-4 sm:p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="q-title-input"
                        className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1"
                      >
                        {selectedQIndex + 1}-savol sarlavhasi
                      </label>
                      <input
                        id="q-title-input"
                        type="text"
                        value={activeQ.title}
                        onChange={(e) => updateQuestion({ title: e.target.value })}
                        className="w-full rounded-xl px-3 py-2 text-sm bg-white/70 dark:bg-slate-900/60 border border-slate-900/15 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="q-cat-input"
                        className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1"
                      >
                        Bo‘lim / Yo‘nalish
                      </label>
                      <input
                        id="q-cat-input"
                        type="text"
                        value={activeQ.category}
                        onChange={(e) => updateQuestion({ category: e.target.value })}
                        className="w-full rounded-xl px-3 py-2 text-sm bg-white/70 dark:bg-slate-900/60 border border-slate-900/15 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="q-prompt-input"
                      className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1"
                    >
                      Savol matni
                    </label>
                    <textarea
                      id="q-prompt-input"
                      rows={3}
                      value={activeQ.prompt}
                      onChange={(e) => updateQuestion({ prompt: e.target.value })}
                      className="w-full rounded-xl px-3 py-2 text-sm bg-white/70 dark:bg-slate-900/60 border border-slate-900/15 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      Variantlar (to‘g‘ri javobni belgilang)
                    </div>
                    {activeQ.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuestion({ correctIndex: oIdx as 0 | 1 | 2 | 3 })}
                          aria-label={`${oIdx + 1}-variantni to‘g‘ri deb belgilash`}
                          className={`w-9 h-9 rounded-xl font-mono text-xs font-bold shrink-0 flex items-center justify-center transition-colors ${
                            activeQ.correctIndex === oIdx
                              ? 'bg-emerald-600 text-white'
                              : 'liquid-glass-subtle text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {['A', 'B', 'C', 'D'][oIdx]}
                        </button>
                        <input
                          type="text"
                          value={opt}
                          aria-label={`${['A', 'B', 'C', 'D'][oIdx]} varianti`}
                          onChange={(e) => updateOption(oIdx, e.target.value)}
                          className="flex-1 rounded-xl px-3 py-2 text-sm bg-white/70 dark:bg-slate-900/60 border border-slate-900/15 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      htmlFor="q-explanation-input"
                      className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1"
                    >
                      Mantiqiy izoh
                    </label>
                    <textarea
                      id="q-explanation-input"
                      rows={2}
                      value={activeQ.explanation}
                      onChange={(e) => updateQuestion({ explanation: e.target.value })}
                      className="w-full rounded-xl px-3 py-2 text-sm bg-white/70 dark:bg-slate-900/60 border border-slate-900/15 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                </div>
              )}

              {errorMsg && (
                <div
                  role="alert"
                  className="rounded-xl px-4 py-3 text-xs sm:text-sm bg-rose-500/15 border border-rose-500/40 text-rose-800 dark:text-rose-200"
                >
                  {errorMsg}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-slate-900/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  onResetDefault();
                  onClose();
                }}
                className="min-h-[42px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Standartga qaytarish</span>
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[42px] px-4 py-2 rounded-xl text-sm font-medium liquid-glass-subtle text-slate-700 dark:text-slate-200"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="glass-cta min-h-[42px] px-5 py-2 rounded-xl text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Saqlash</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
