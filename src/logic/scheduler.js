export function isWeekend() {
  const day = new Date().getDay();
  return day === 0 || day === 6;
}

export function getWeekDay() {
  return new Date().getDay();
}
