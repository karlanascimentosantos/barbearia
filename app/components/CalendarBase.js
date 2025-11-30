export function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  firstDay.setHours(0, 0, 0, 0);

  const days = [];

  // Dia da semana do primeiro dia (0 = dom → 6 = sáb)
  const startWeekday = firstDay.getDay();

  // Espaços vazios antes do dia 1
  for (let i = 0; i < startWeekday; i++) {
    days.push(null);
  }

  // Dias do mês
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    date.setHours(0, 0, 0, 0);
    days.push(date);
  }

  return days;
}

// (mantida apenas por compatibilidade)
export function getWeekDays(date) {
  const dayOfWeek = date.getDay();
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - dayOfWeek);

  const days = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    d.setHours(0, 0, 0, 0);
    days.push(d);
  }

  return days;
}

export function isSameDay(a, b) {
  if (!a || !b) return false;

  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}
