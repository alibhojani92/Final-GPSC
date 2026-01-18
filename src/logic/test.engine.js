import { CONFIG } from "../constants/config.js";

export async function getDailyTestMCQs(db, userId) {
  const result = await db.prepare(`
    SELECT * FROM mcqs
    WHERE id NOT IN (
      SELECT mcq_id FROM attempts
      WHERE user_id = ?
      AND attempted_at >= date('now','-30 day')
    )
    ORDER BY RANDOM()
    LIMIT 1
  `).bind(userId).get();

  return result;
}
