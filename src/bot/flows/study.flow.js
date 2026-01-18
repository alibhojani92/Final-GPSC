import { addStudyHours, getTodayStudy } from "../../db/study.repo.js";

export async function studyFlow(update, env) {
  const chatId = update.callback_query.message.chat.id;
  const userId = update.callback_query.from.id;
  const data = update.callback_query.data || "";

  // STUDY_ADD_<hours>
  let hours = 0;
  if (data.startsWith("STUDY_ADD_")) {
    hours = parseFloat(data.replace("STUDY_ADD_", ""));
    await addStudyHours(env.DB, userId, hours);
  }

  const today = await getTodayStudy(env.DB, userId);

  const text =
    `⏱ Study Hours (Today)\n\n` +
    `Added Today: ${today.total_hours} hrs\n\n` +
    `You can add hours multiple times. No limit.`;

  return {
    method: "sendMessage",
    chat_id: chatId,
    text
  };
}
