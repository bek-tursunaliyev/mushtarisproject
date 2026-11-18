import type { AnswerRecord, Question, QuizSummary } from '../types/quiz';

export const WHEEL_SEGMENT_COUNT = 10;

export function normalizeAngle(deg: number): number {
  const mod = deg % 360;
  return mod < 0 ? mod + 360 : mod;
}

/**
 * Returns the 0-based segment index currently aligned under the top 12-o'clock pointer.
 * Segment i occupies [i * sliceAngle, (i + 1) * sliceAngle) clockwise from 12 o'clock at 0 deg rotation.
 */
export function getSegmentAtAngle(
  rotationDeg: number,
  totalSegments: number = WHEEL_SEGMENT_COUNT
): number {
  if (totalSegments <= 0) {
    throw new Error('totalSegments must be positive');
  }
  const sliceAngle = 360 / totalSegments;
  const pointerLocalAngle = normalizeAngle(-rotationDeg);
  return Math.floor(pointerLocalAngle / sliceAngle) % totalSegments;
}

/**
 * Computes a target clockwise rotation >= currentRotation + extraTurns * 360
 * such that the top pointer lands safely inside `targetIndex`.
 * `jitterRatio` should be within [-0.35, 0.35] so the pointer avoids divider pegs.
 */
export function computeSpinTargetAngle(
  currentRotation: number,
  targetIndex: number,
  totalSegments: number = WHEEL_SEGMENT_COUNT,
  extraTurns: number = 6,
  jitterRatio: number = 0
): number {
  if (targetIndex < 0 || targetIndex >= totalSegments) {
    throw new Error(`targetIndex ${targetIndex} out of bounds [0, ${totalSegments - 1}]`);
  }
  const clampedJitter = Math.max(-0.35, Math.min(0.35, jitterRatio));
  const sliceAngle = 360 / totalSegments;
  const targetLocalAngle = (targetIndex + 0.5 + clampedJitter) * sliceAngle;
  const desiredMod = normalizeAngle(360 - targetLocalAngle);
  const currentMod = normalizeAngle(currentRotation);
  const deltaMod = normalizeAngle(desiredMod - currentMod);
  const turns = Math.max(1, Math.round(extraTurns));

  return currentRotation + turns * 360 + deltaMod;
}

/**
 * Picks an unanswered question index at random (or from all indices if every question is answered).
 */
export function pickNextQuestionIndex(
  total: number,
  completedIds: ReadonlySet<number>,
  questions: readonly Pick<Question, 'id'>[],
  randomValue: number = Math.random()
): number {
  if (total <= 0 || questions.length === 0) {
    return 0;
  }
  const availableIndices: number[] = [];
  for (let i = 0; i < Math.min(total, questions.length); i++) {
    if (!completedIds.has(questions[i].id)) {
      availableIndices.push(i);
    }
  }
  const pool =
    availableIndices.length > 0
      ? availableIndices
      : Array.from({ length: Math.min(total, questions.length) }, (_, idx) => idx);

  const clampedRandom = Math.max(0, Math.min(0.999999, randomValue));
  const chosen = Math.floor(clampedRandom * pool.length);
  return pool[chosen];
}

/**
 * Calculates points earned for a single question.
 * Base correct score: 100. Hint penalty: -25. Streak bonus: +15 per consecutive correct answer (capped at +60).
 */
export function calculateQuestionPoints(
  isCorrect: boolean,
  usedHint: boolean,
  currentStreak: number
): number {
  if (!isCorrect) {
    return 0;
  }
  const base = 100;
  const hintDeduction = usedHint ? 25 : 0;
  const streakBonus = Math.min(60, Math.max(0, currentStreak) * 15);
  return base - hintDeduction + streakBonus;
}

export function getRankTitle(accuracyPercent: number): string {
  if (accuracyPercent >= 90) return 'Kreativ Tafakkur Ustasi';
  if (accuracyPercent >= 70) return 'Mantiqiy Tahlilchi';
  if (accuracyPercent >= 50) return 'Izlanuvchan Tadqiqotchi';
  return 'Boshlang‘ich Kashfiyotchi';
}

export function computeQuizSummary(
  questions: readonly Question[],
  answers: Readonly<Record<number, AnswerRecord>>
): QuizSummary {
  const totalQuestions = questions.length;
  const records = Object.values(answers);
  const answeredCount = records.length;
  const correctCount = records.filter((r) => r.isCorrect).length;
  const totalPoints = records.reduce((sum, r) => sum + r.pointsEarned, 0);
  const hintsUsedCount = records.filter((r) => r.usedHint).length;
  const totalSeconds = records.reduce((sum, r) => sum + r.elapsedSeconds, 0);

  const accuracyPercent =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const averageSeconds =
    answeredCount > 0 ? Math.round(totalSeconds / answeredCount) : 0;

  return {
    totalQuestions,
    answeredCount,
    correctCount,
    accuracyPercent,
    totalPoints,
    hintsUsedCount,
    averageSeconds,
    rankTitle: getRankTitle(accuracyPercent),
  };
}

export function validateQuestionInput(q: Question): string | null {
  if (!q.title.trim()) return 'Savol sarlavhasi bo‘sh bo‘lmasligi kerak.';
  if (!q.prompt.trim()) return 'Savol matni bo‘sh bo‘lmasligi kerak.';
  if (q.options.some((opt) => !opt.trim())) {
    return 'Barcha 4 ta javob varianti to‘ldirilishi shart.';
  }
  if (!q.explanation.trim()) return 'Mantiqiy izoh bo‘sh bo‘lmasligi kerak.';
  return null;
}
