import { saveAttempt } from "../../db/attempt.repo.js";
import { getMCQById } from "../../db/mcq.repo.js";
import { testKeyboard } from "../keyboards/test.keyboard.js";

export async function answerFlow(update, env) {
  const chatId = update.callback_query.message.chat.id;
  const userId = update.callback_query.from.id;
  const data = update.callback_query.data; // ANS_<mcqId>_<option>
  const parts = data.split("_");

  const mcqId = parts[1];
  const selected = parts[2];

  const mcq = await getMCQById(env.DB, mcqId);
  const isCorrect = selected === mcq.correct_option;

  await saveAttempt(env.DB, userId, mcqId, selected, isCorrect);

  let text = isCorrect
    ? "✅ Correct Answer"
    : `❌ Wrong Answer\n\nExplanation:\n${mcq.explanation}`;

  return {
    method: "sendMessage",
    chat_id: chatId,
    text,
    reply_markup: testKeyboard(mcqId)
  };
}
