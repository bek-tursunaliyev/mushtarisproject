import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateQuestionPoints,
  computeQuizSummary,
  computeSpinTargetAngle,
  getSegmentAtAngle,
  pickNextQuestionIndex,
  validateQuestionInput,
} from './quizEngine';
import { TOPIC_18_PACKS } from '../data/topic18Packs';
import type { AnswerRecord, Question } from '../types/quiz';

test('computeSpinTargetAngle always lands inside the intended segment', () => {
  const currentRotations = [0, 37, 145, 728, 1983.4];
  const jitters = [-0.3, -0.1, 0, 0.15, 0.32];

  for (const startAngle of currentRotations) {
    for (let target = 0; target < 10; target++) {
      for (const jitter of jitters) {
        const finalAngle = computeSpinTargetAngle(startAngle, target, 10, 5, jitter);
        assert.ok(
          finalAngle >= startAngle + 5 * 360,
          'Spin must include full extra turns forward'
        );
        const landedSegment = getSegmentAtAngle(finalAngle, 10);
        assert.equal(
          landedSegment,
          target,
          `Start ${startAngle}, target ${target}, jitter ${jitter} landed on ${landedSegment}`
        );
      }
    }
  }
});

test('pickNextQuestionIndex only chooses from unanswered questions when available', () => {
  const questions = TOPIC_18_PACKS[0].questions;
  const completed = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]); // only id 10 (index 9) left
  const picked = pickNextQuestionIndex(10, completed, questions, 0.42);
  assert.equal(picked, 9);
});

test('pickNextQuestionIndex falls back to full pool if all questions are answered', () => {
  const questions = TOPIC_18_PACKS[0].questions;
  const completed = new Set<number>(questions.map((q) => q.id));
  const picked = pickNextQuestionIndex(10, completed, questions, 0.05);
  assert.equal(picked, 0);
});

test('calculateQuestionPoints applies hint penalty and caps streak bonus', () => {
  assert.equal(calculateQuestionPoints(false, false, 3), 0);
  assert.equal(calculateQuestionPoints(true, false, 0), 100);
  assert.equal(calculateQuestionPoints(true, true, 0), 75);
  assert.equal(calculateQuestionPoints(true, false, 2), 130);
  assert.equal(calculateQuestionPoints(true, false, 10), 160);
});

test('computeQuizSummary aggregates accuracy, points, hints, and average time', () => {
  const questions = TOPIC_18_PACKS[0].questions;
  const answers: Record<number, AnswerRecord> = {
    1: { questionId: 1, selectedIndex: 2, isCorrect: true, usedHint: false, pointsEarned: 100, elapsedSeconds: 12 },
    2: { questionId: 2, selectedIndex: 1, isCorrect: true, usedHint: true, pointsEarned: 90, elapsedSeconds: 20 },
    3: { questionId: 3, selectedIndex: 1, isCorrect: false, usedHint: false, pointsEarned: 0, elapsedSeconds: 16 },
  };
  const summary = computeQuizSummary(questions, answers);
  assert.equal(summary.answeredCount, 3);
  assert.equal(summary.correctCount, 2);
  assert.equal(summary.accuracyPercent, 20);
  assert.equal(summary.totalPoints, 190);
  assert.equal(summary.hintsUsedCount, 1);
  assert.equal(summary.averageSeconds, 16);
});

test('default Topic 18 packs each have exactly 10 valid questions', () => {
  for (const pack of TOPIC_18_PACKS) {
    assert.equal(pack.questions.length, 10, `Pack ${pack.id} must have 10 questions`);
    for (const q of pack.questions) {
      assert.equal(validateQuestionInput(q), null, `Question ${q.id} in ${pack.id} invalid`);
    }
  }
});

test('validateQuestionInput catches empty prompt', () => {
  const badQ: Question = {
    ...TOPIC_18_PACKS[0].questions[0],
    prompt: '   ',
  };
  assert.ok(validateQuestionInput(badQ) !== null);
});
