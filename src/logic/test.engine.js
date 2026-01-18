// src/logic/test.engine.js

/**
 * Daily / Weekly / Practice test engine
 * - MCQ select from D1
 * - No repeat for last 30 days (per user)
 * - Limit based
 */

/* =========================
   DAILY TEST
========================= */
export async function getDailyTestMCQs(env, userId, limit = 20) {
  const db = env.DB;

  const { results } = await db.prepare(
    `
    SELECT m.id, m.question, m.option_a, m.option_b, m.option_c, m.option_d, m.correct_option
    FROM mcqs m
    WHERE m.id NOT IN (
      SELECT a.mcq_id
      FROM attempts a
      WHERE a.user_id = ?
        AND a.attempted_at >= date('now','-30 day')
    )
    ORDER BY RANDOM()
    LIMIT ?
    `
  ).bind(userId, limit).all();

  if (results.length < limit) {
    const { results: fallback } = await db.prepare(
      `
      SELECT m.id, m.question, m.option_a, m.option_b, m.option_c, m.option_d, m.correct_option
      FROM mcqs m
      ORDER BY RANDOM()
      LIMIT ?
      `
    ).bind(limit).all();

    return fallback;
  }

  return results;
}

/* =========================
   PRACTICE TEST (SAFE STUB)
   👉 build error fix
========================= */
export async function getPracticeTestMCQ(env, subject, limit = 20) {
  const db = env.DB;

  const { results } = await db.prepare(
    `
    SELECT id, question, option_a, option_b, option_c, option_d, correct_option
    FROM mcqs
    WHERE subject = ?
    ORDER BY RANDOM()
    LIMIT ?
    `
  ).bind(subject, limit).all();

  return results;
}

/* =========================
   ATTEMPT SAVE
========================= */
export async function saveAttempt(env, userId, mcqId, selectedOption, isCorrect) {
  const db = env.DB;

  await db.prepare(
    `
    INSERT INTO attempts (user_id, mcq_id, selected_option, is_correct, attempted_at)
    VALUES (?, ?, ?, ?, datetime('now'))
    `
  ).bind(
    userId,
    mcqId,
    selectedOption,
    isCorrect ? 1 : 0
  ).run();
}

/* =========================
   SCORE CALCULATION
========================= */
export async function calculateScore(env, userId, sinceMinutes = 60) {
  const db = env.DB;

  const { results } = await db.prepare(
    `
    SELECT
      COUNT(*) as total,
      SUM(is_correct) as correct
    FROM attempts
    WHERE user_id = ?
      AND attempted_at >= datetime('now', ?)
    `
  ).bind(
    userId,
    `-${sinceMinutes} minutes`
  ).all();

  const row = results[0] || { total: 0, correct: 0 };

  return {
    total: row.total || 0,
    correct: row.correct || 0,
    wrong: (row.total || 0) - (row.correct || 0)
  };
      }
