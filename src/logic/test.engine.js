import { CONFIG } from "../constants/config.js";

async function getRandomMCQ(db, whereClause, params, userId) {
  const sql = `
    SELECT *
    FROM mcqs
    WHERE ${whereClause}
      AND id NOT IN (
        SELECT mcq_id
        FROM attempts
        WHERE user_id = ?
          AND attempted_at >= date('now', '-' || ? || ' day')
      )
    ORDER BY RANDOM()
    LIMIT 1
  `;

  return db
    .prepare(sql)
    .bind(...params, userId, CONFIG.NO_REPEAT_DAYS)
    .get();
}

export async function getDailyTestMCQs(db, userId) {
  return getRandomMCQ(db, "1=1", [], userId);
}

export async function getWeeklyTestMCQ(db, userId) {
  return getRandomMCQ(db, "1=1", [], userId);
}

export async function getPracticeTestMCQ(db, userId, subjectId = null) {
  if (subjectId) {
    return getRandomMCQ(db, "subject_id = ?", [subjectId], userId);
  }
  return getRandomMCQ(db, "1=1", [], userId);
}
