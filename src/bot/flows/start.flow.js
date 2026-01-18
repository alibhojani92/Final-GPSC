import { mainKeyboard } from "../keyboards/main.keyboard.js";

export async function startFlow(update, env) {
  const chatId = update.message.chat.id;

  return {
    method: "sendMessage",
    chat_id: chatId,
    text: "Welcome Dr Arzoo❤️\n\nSelect an option below:",
    reply_markup: mainKeyboard()
  };
}
