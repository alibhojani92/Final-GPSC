export async function addStudyHours(db, userId, hours) {
  await db
    .prepare(
      `INSERT INTO study_hours (user_id, hours, created_at)
       VALUES (?, ?, datetime('now'))`
    )
    .bind(userId, hours)
    .run();
}

export async function getTodayStudy(db, userId) {
  const result = await db
    .prepare(
      `SELECT COALESCE(SUM(hours), 0) AS total_hours
       FROM study_hours
       WHERE user_id = ?
         AND date(created_at) = date('now')`
    )
    .bind(userId)
    .get();

  return result;
}
