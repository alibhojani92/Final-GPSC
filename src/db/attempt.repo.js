export async function saveAttempt(db, userId, mcqId, selectedOption, isCorrect) {
  await db
    .prepare(
      `INSERT INTO attempts
       (user_id, mcq_id, selected_option, is_correct, attempted_at)
       VALUES (?, ?, ?, ?, datetime('now'))`
    )
    .bind(userId, mcqId, selectedOption, isCorrect ? 1 : 0)
    .run();
}

export async function getUserAttempts(db, userId) {
  return db
    .prepare(
      `SELECT * FROM attempts
       WHERE user_id = ?
       ORDER BY attempted_at DESC`
    )
    .bind(userId)
    .all();
}
