import { subjectKeyboard } from "../keyboards/subject.keyboard.js";

export async function subjectFlow(update, env) {
  const chatId = update.callback_query.message.chat.id;

  return {
    method: "sendMessage",
    chat_id: chatId,
    text: "Select Subject (Dental Pulse 18):",
    reply_markup: subjectKeyboard()
  };
}
