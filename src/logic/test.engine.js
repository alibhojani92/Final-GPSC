// Daily / Weekly / Practice MCQ selection engine
// Rules:
// - Fetch from D1
// - No repeat for last 30 days (per user)
// - Fallback allowed if pool exhausted

const DAY_MS = 24 * 60 * 60 * 1000;

export async function getDailyMcqs(env, userId, limit = 20) {
  const now = Date.now();
  const cutoff = now - 30 * DAY_MS;

  // 1) Try non-repeated MCQs (last 30 days)
  let res = await env.DB.prepare(
    `
    SELECT m.id, m.question, m.option_a, m.option_b, m.option_c, m.option_d, m.correct
    FROM mcqs m
    WHERE m.id NOT IN (
      SELECT mcq_id
      FROM attempts
      WHERE user_id = ?
        AND attempted_at >= ?
    )
    ORDER BY RANDOM()
    LIMIT ?
    `
  )
    .bind(userId, cutoff, limit)
    .all();

  let rows = res.results || [];

  // 2) Fallback if not enough (pool exhausted)
  if (rows.length < limit) {
    const remaining = limit - rows.length;

    const fallback = await env.DB.prepare(
      `
      SELECT m.id, m.question, m.option_a, m.option_b, m.option_c, m.option_d, m.correct
      FROM mcqs m
      ORDER BY RANDOM()
      LIMIT ?
      `
    )
      .bind(remaining)
      .all();

    rows = rows.concat(fallback.results || []);
  }

  return rows.slice(0, limit);
}

export async function recordAttempt(env, userId, mcqId, isCorrect) {
  const ts = Date.now();

  await env.DB.prepare(
    `
    INSERT INTO attempts (user_id, mcq_id, is_correct, attempted_at)
    VALUES (?, ?, ?, ?)
    `
  )
    .bind(userId, mcqId, isCorrect ? 1 : 0, ts)
    .run();
}

export function buildQuestionPayload(chatId, mcq, keyboard) {
  return {
    method: "sendMessage",
    chat_id: chatId,
    text:
      `❓ ${mcq.question}\n\n` +
      `A. ${mcq.option_a}\n` +
      `B. ${mcq.option_b}\n` +
      `C. ${mcq.option_c}\n` +
      `D. ${mcq.option_d}`,
    reply_markup: keyboard
  };
      }
