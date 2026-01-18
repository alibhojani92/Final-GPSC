export async function getUserReport(db, userId) {
  const total = await db
    .prepare(`SELECT COUNT(*) as c FROM attempts WHERE user_id = ?`)
    .bind(userId)
    .get();

  const correct = await db
    .prepare(
      `SELECT COUNT(*) as c
       FROM attempts
       WHERE user_id = ? AND is_correct = 1`
    )
    .bind(usersrId)
    .get();

  const wrong = total.c - correct.c;
  const accuracy =
    total.c === 0 ? 0 : Math.round((correct.c / total.c) * 100);

  return {
    total_attempts: total.c,
    correct: correct.c,
    wrong,
    accuracy
  };
}
