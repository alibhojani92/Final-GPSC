export class Router {
  constructor(env) {
    this.env = env;
  }

  async handle(update) {
    // /start
    if (update.message?.text?.startsWith("/start")) {
      const chatId = update.message.chat.id;
      return {
        method: "sendMessage",
        chat_id: chatId,
        text: "START OK – click any button now"
      };
    }

    // 🔥 ANY inline button click (echo test)
    if (update.callback_query) {
      const chatId = update.callback_query.message.chat.id;
      const data = update.callback_query.data;

      return {
        method: "sendMessage",
        chat_id: chatId,
        text: `CALLBACK RECEIVED: ${data}`
      };
    }

    return null;
  }
}
