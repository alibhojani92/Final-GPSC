import { mainKeyboard } from "../keyboards/main.keyboard.js";

export async function startFlow(update, env) {
  const chatId =
    update.message?.chat?.id ||
    update.callback_query?.message?.chat?.id;

  return {
    method: "sendMessage",
    chat_id: chatId,
    text: "Welcome to Dental Pulse 18 Test Bot\n\nSelect an option below:",
    reply_markup: mainKeyboard()
  };
}
