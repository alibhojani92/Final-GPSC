import { getPracticeTestMCQ } from "../../logic/test.engine.js";
import { testKeyboard } from "../keyboards/test.keyboard.js";

export async function practiceTestFlow(update, env) {
  const chatId = update.callback_query.message.chat.id;
  const userId = update.callback_query.from.id;
  const data = update.callback_query.data || "";
  const subjectId = data.split("_")[1] || null;

  const mcq = await getPracticeTestMCQ(env.DB, userId, subjectId);

  return {
    method: "sendMessage",
    chat_id: chatId,
    text: mcq.question,
    reply_markup: testKeyboard(mcq.id)
  };
}
