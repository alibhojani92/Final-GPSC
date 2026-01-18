import { getUserReport } from "../../db/report.repo.js";

export async function reportFlow(update, env) {
  const chatId = update.callback_query.message.chat.id;
  const userId = update.callback_query.from.id;

  const report = await getUserReport(env.DB, userId);

  const text =
    `📊 Your Report\n\n` +
    `Total Attempts: ${report.total_attempts}\n` +
    `Correct: ${report.correct}\n` +
    `Wrong: ${report.wrong}\n` +
    `Accuracy: ${report.accuracy}%`;

  return {
    method: "sendMessage",
    chat_id: chatId,
    text
  };
}
