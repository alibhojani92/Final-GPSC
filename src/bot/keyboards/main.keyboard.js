export function mainKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "📝 Daily Test", callback_data: "DAILY" }],
      [{ text: "📆 Weekly Test", callback_data: "WEEKLY" }],
      [{ text: "📚 Practice Test", callback_data: "PRACTICE" }],
      [{ text: "⏱ Study Hours", callback_data: "STUDY" }],
      [{ text: "📊 Report", callback_data: "REPORT" }]
    ]
  };
}
