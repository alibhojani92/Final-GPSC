export async function getMCQById(db, mcqId) {
  const result = await db
    .prepare(
      `SELECT id, question, option_a, option_b, option_c, option_d, correct_option, explanation
       FROM mcqs
       WHERE id = ?`
    )
    .bind(mcqId)
    .get();

  return result;
}

export async function insertBulkMCQs(db, mcqs = []) {
  const stmt = db.prepare(
    `INSERT INTO mcqs
     (subject_id, question, option_a, option_b, option_c, option_d, correct_option, explanation)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );

  for (const q of mcqs) {
    await stmt
      .bind(
        q.subject_id,
        q.question,
        q.option_a,
        q.option_b,
        q.option_c,
        q.option_d,
        q.correct_option,
        q.explanation
      )
      .run();
  }
}
