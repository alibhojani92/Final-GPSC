import { getDailyTestMCQs } from "../../logic/test.engine.js";
import { testKeyboard } from "../keyboards/test.keyboard.js";

export async function dailyTestFlow(update, env) {
  const chatId = update.callback_query.message.chat.id;
  const userId = update.callback_query.from.id;

  const mcq = await getDailyTestMCQs(env.DB, userId);

  return {
    method: "sendMessage",
    chat_id: chatId,
    text: mcq.question,
    reply_markup: testKeyboard(mcq.id)
  };
}
