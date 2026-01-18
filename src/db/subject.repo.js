export async function getAllSubjects(db) {
  return db
    .prepare(`SELECT id, name FROM subjects ORDER BY name`)
    .all();
}

export async function getSubjectById(db, subjectId) {
  return db
    .prepare(`SELECT id, name FROM subjects WHERE id = ?`)
    .bind(subjectId)
    .get();
}
