export async function dailyTestFlow(update, env) {
  const chatId = update.callback_query.message.chat.id;

  return {
    method: "sendMessage",
    chat_id: chatId,
    text: "📝 Daily Test started\n\n(Next step: MCQ fetch)"
  };
}
