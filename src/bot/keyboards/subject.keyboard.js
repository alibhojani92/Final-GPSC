import { SUBJECTS } from "../../constants/subjects.js";

export function subjectKeyboard() {
  return {
    inline_keyboard: SUBJECTS.map(s => [
      { text: s.name, callback_data: `SUBJECT_${s.id}` }
    ])
  };
}
