export function testKeyboard(mcqId) {
  return {
    inline_keyboard: [
      [
        { text: "A", callback_data: `ANS_${mcqId}_A` },
        { text: "B", callback_data: `ANS_${mcqId}_B` }
      ],
      [
        { text: "C", callback_data: `ANS_${mcqId}_C` },
        { text: "D", callback_data: `ANS_${mcqId}_D` }
      ],
      [
        { text: "Next Question", callback_data: "PRACTICE_NEXT" }
      ]
    ]
  };
}
