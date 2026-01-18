export function calculateStats(attempts = []) {
  let correct = 0;
  let wrong = 0;

  for (const a of attempts) {
    if (a.is_correct) correct++;
    else wrong++;
  }

  const total = correct + wrong;
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);

  return {
    total,
    correct,
    wrong,
    accuracy
  };
}
