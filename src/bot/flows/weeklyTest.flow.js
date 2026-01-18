export async function weeklyTestFlow(update, env) {
  const chatId = update.callback_query.message.chat.id;

  return {
    method: "sendMessage",
    chat_id: chatId,
    text: "📆 Weekly Test started\n\n(Logic coming next)"
  };
}
