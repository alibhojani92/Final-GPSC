export function reportKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "📅 Daily Report", callback_data: "REPORT_DAILY" }],
      [{ text: "📆 Weekly Report", callback_data: "REPORT_WEEKLY" }],
      [{ text: "⬅️ Back", callback_data: "MAIN_MENU" }]
    ]
  };
}
