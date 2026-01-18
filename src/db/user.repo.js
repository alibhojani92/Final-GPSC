export async function createUser(db, userId) {
  await db
    .prepare(
      `INSERT OR IGNORE INTO users (id, created_at)
       VALUES (?, datetime('now'))`
    )
    .bind(userId)
    .run();
}

export async function getUser(db, userId) {
  return db
    .prepare(`SELECT * FROM users WHERE id = ?`)
    .bind(userId)
    .get();
}
