import { useEffect, useRef, useState } from 'react';
import { Disc3, RotateCw } from 'lucide-react';
import type { AnswerRecord, Question } from '../types/quiz';
import { computeSpinTargetAngle, getSegmentAtAngle, pickNextQuestionIndex } from '../utils/quizEngine';
import { soundEngine } from '../utils/soundEffects';

interface SpinWheelProps {
  questions: Question[];
  answers: Record<number, AnswerRecord>;
  isSpinning: boolean;
  activeIndex: number | null;
  rotation: number;
  onRotationChange: (deg: number) => void;
  onSpinStart: () => void;
  onSpinComplete: (selectedIndex: number) => void;
}

const SLICE_COLORS = [
  { start: '#0284C7', end: '#0369A1' }, // 01 Sky
  { start: '#4F46E5', end: '#3730A3' }, // 02 Indigo
  { start: '#0D9488', end: '#115E59' }, // 03 Teal
  { start: '#2563EB', end: '#1D4ED8' }, // 04 Blue
  { start: '#7C3AED', end: '#5B21B6' }, // 05 Violet
  { start: '#0891B2', end: '#155E75' }, // 06 Cyan
  { start: '#059669', end: '#065F46' }, // 07 Emerald
  { start: '#4338CA', end: '#312E81' }, // 08 Deep Indigo
  { start: '#0369A1', end: '#0C4A6E' }, // 09 Ocean
  { start: '#6D28D9', end: '#4C1D95' }, // 10 Purple
];

function polarToCartesian(cx: number, cy: number, r: number, angleDegClockwiseFromTop: number) {
  const rad = ((angleDegClockwiseFromTop - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export function SpinWheel({
  questions,
  answers,
  isSpinning,
  activeIndex,
  rotation,
  onRotationChange,
  onSpinStart,
  onSpinComplete,
}: SpinWheelProps) {
  const total = questions.length;
  const sliceAngle = 360 / total;
  const wheelGroupRef = useRef<SVGGElement | null>(null);
  const pointerRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef<number>(rotation);
  const rafRef = useRef<number | null>(null);
  const lastPegIndexRef = useRef<number>(-1);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(activeIndex);

  useEffect(() => {
    rotationRef.current = rotation;
    if (wheelGroupRef.current && !isSpinning) {
      wheelGroupRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [rotation, isSpinning]);

  useEffect(() => {
    setHighlightIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const triggerSpin = () => {
    if (isSpinning || total === 0) return;

    soundEngine.playTap();
    onSpinStart();

    const completedIds = new Set(Object.keys(answers).map((k) => Number(k)));
    const targetIdx = pickNextQuestionIndex(total, completedIds, questions, Math.random());
    const jitter = (Math.random() - 0.5) * 0.56; // within [-0.28, +0.28]
    const extraTurns = 5 + Math.floor(Math.random() * 2); // 5 or 6 full turns

    const startRotation = rotationRef.current;
    const targetRotation = computeSpinTargetAngle(
      startRotation,
      targetIdx,
      total,
      extraTurns,
      jitter
    );

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      rotationRef.current = targetRotation;
      onRotationChange(targetRotation);
      if (wheelGroupRef.current) {
        wheelGroupRef.current.style.transform = `rotate(${targetRotation}deg)`;
      }
      const landed = getSegmentAtAngle(targetRotation, total);
      setHighlightIndex(landed);
      onSpinComplete(landed);
      return;
    }

    const durationMs = 3400;
    const startTime = performance.now();
    lastPegIndexRef.current = Math.floor(startRotation / sliceAngle);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      // Quintic ease-out for natural physical friction deceleration
      const eased = 1 - Math.pow(1 - t, 4.4);
      const currentRot = startRotation + (targetRotation - startRotation) * eased;
      rotationRef.current = currentRot;

      if (wheelGroupRef.current) {
        wheelGroupRef.current.style.transform = `rotate(${currentRot}deg)`;
      }

      // Detect peg crossing for pointer kick and crisp tick sound
      const currentPeg = Math.floor(currentRot / sliceAngle);
      if (currentPeg !== lastPegIndexRef.current) {
        lastPegIndexRef.current = currentPeg;
        const speedIntensity = Math.max(0.15, 1 - t);
        soundEngine.playWheelTick(speedIntensity);

        if (pointerRef.current) {
          pointerRef.current.style.transform = `rotate(-18deg) scale(1.06)`;
          setTimeout(() => {
            if (pointerRef.current) {
              pointerRef.current.style.transform = 'rotate(0deg) scale(1)';
            }
          }, 55);
        }
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
        onRotationChange(targetRotation);
        const landed = getSegmentAtAngle(targetRotation, total);
        setHighlightIndex(landed);
        onSpinComplete(landed);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-[390px] sm:max-w-[430px] aspect-square flex items-center justify-center select-none">
        {/* Ambient refractive glow behind wheel */}
        <div
          aria-hidden="true"
          className="absolute inset-4 rounded-full bg-gradient-to-tr from-sky-500/25 via-indigo-500/20 to-teal-400/25 blur-2xl pointer-events-none"
        />

        {/* Top Spring-Loaded Jewel Pointer */}
        <div
          ref={pointerRef}
          aria-hidden="true"
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 transition-transform duration-75 ease-out origin-top drop-shadow-[0_6px_12px_rgba(2,6,23,0.45)]"
        >
          <svg width="42" height="52" viewBox="0 0 42 52" fill="none">
            <path
              d="M21 50L5 18C2.5 12 6.8 4 14 4H28C35.2 4 39.5 12 37 18L21 50Z"
              fill="url(#pointerGrad)"
              stroke="rgba(255,255,255,0.88)"
              strokeWidth="2.2"
            />
            <circle cx="21" cy="15" r="5" fill="#FFFFFF" fillOpacity="0.92" />
            <defs>
              <linearGradient id="pointerGrad" x1="21" y1="4" x2="21" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F8FAFC" />
                <stop offset="0.45" stopColor="#38BDF8" />
                <stop offset="1" stopColor="#0284C7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Outer Liquid Glass Bezel */}
        <div className="relative w-full h-full rounded-full p-3 sm:p-3.5 liquid-glass shadow-2xl">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full overflow-visible"
            data-testid="spin-wheel-svg"
            role="img"
            aria-label="10 ta savoldan iborat interaktiv baraban"
          >
            <defs>
              {SLICE_COLORS.map((c, idx) => (
                <linearGradient
                  key={idx}
                  id={`sliceGrad-${idx}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={c.start} />
                  <stop offset="100%" stopColor={c.end} />
                </linearGradient>
              ))}
              <radialGradient id="glassSheen" cx="35%" cy="28%" r="72%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.34)" />
                <stop offset="45%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="100%" stopColor="rgba(2,6,23,0.18)" />
              </radialGradient>
            </defs>

            {/* Rotating Wheel Group */}
            <g
              ref={wheelGroupRef}
              style={{
                transformOrigin: '250px 250px',
                transform: `rotate(${rotationRef.current}deg)`,
              }}
            >
              {questions.map((q, idx) => {
                const startAngle = idx * sliceAngle;
                const endAngle = (idx + 1) * sliceAngle;
                const midAngle = startAngle + sliceAngle / 2;
                const outerR = 236;
                const p1 = polarToCartesian(250, 250, outerR, startAngle);
                const p2 = polarToCartesian(250, 250, outerR, endAngle);
                const labelPos = polarToCartesian(250, 250, 166, midAngle);
                const statusPos = polarToCartesian(250, 250, 114, midAngle);

                const answer = answers[q.id];
                const isAnswered = Boolean(answer);
                const isSelected = highlightIndex === idx;

                return (
                  <g key={q.id}>
                    <path
                      d={`M 250 250 L ${p1.x} ${p1.y} A ${outerR} ${outerR} 0 0 1 ${p2.x} ${p2.y} Z`}
                      fill={`url(#sliceGrad-${idx % SLICE_COLORS.length})`}
                      fillOpacity={isAnswered ? 0.44 : isSelected ? 1 : 0.88}
                      stroke="rgba(255,255,255,0.42)"
                      strokeWidth={isSelected ? '3' : '1.5'}
                    />

                    {/* Question Number */}
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      fill="#FFFFFF"
                      fillOpacity={isAnswered ? 0.72 : 1}
                      fontSize="24"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="middle"
                      dominantBaseline="central"
                      transform={`rotate(${midAngle}, ${labelPos.x}, ${labelPos.y})`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </text>

                    {/* Answered status marker */}
                    {isAnswered && (
                      <text
                        x={statusPos.x}
                        y={statusPos.y}
                        fill="#FFFFFF"
                        fontSize="16"
                        fontWeight="700"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${midAngle}, ${statusPos.x}, ${statusPos.y})`}
                      >
                        {answer.isCorrect ? '✓' : '×'}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Optical glass sheen overlay */}
              <circle
                cx="250"
                cy="250"
                r="236"
                fill="url(#glassSheen)"
                pointerEvents="none"
              />

              {/* 10 Rim Pegs */}
              {questions.map((_, idx) => {
                const pegPos = polarToCartesian(250, 250, 229, idx * sliceAngle);
                return (
                  <circle
                    key={`peg-${idx}`}
                    cx={pegPos.x}
                    cy={pegPos.y}
                    r="5.5"
                    fill="#F8FAFC"
                    stroke="rgba(15,23,42,0.35)"
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>

            {/* Outer Glass Rim Ring */}
            <circle
              cx="250"
              cy="250"
              r="237"
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="3"
              pointerEvents="none"
            />
          </svg>

          {/* Center Tactile iOS Glass Hub Button */}
          <button
            type="button"
            onClick={triggerSpin}
            disabled={isSpinning}
            aria-label="Barabanni aylantirish"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-26 sm:h-26 rounded-full liquid-island flex flex-col items-center justify-center gap-1 shadow-xl transition-transform hover:scale-105 active:scale-95 disabled:opacity-80 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-400"
          >
            <RotateCw
              className={`w-6 h-6 text-sky-600 dark:text-sky-300 ${
                isSpinning ? 'animate-spin' : ''
              }`}
              aria-hidden="true"
            />
            <span className="font-display text-xs font-bold tracking-wide text-slate-900 dark:text-white">
              {isSpinning ? 'Kuting...' : 'AYLANTIR'}
            </span>
          </button>
        </div>
      </div>

      {/* Primary Spin Action Button */}
      <button
        type="button"
        onClick={triggerSpin}
        disabled={isSpinning}
        className="glass-cta min-h-[50px] px-8 py-3 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-lg shadow-sky-900/25 transition-all active:scale-[0.98] disabled:opacity-65 disabled:cursor-wait flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
      >
        <Disc3 className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} aria-hidden="true" />
        <span>{isSpinning ? 'Baraban aylanmoqda...' : 'Barabanni aylantir'}</span>
      </button>
    </div>
  );
}
