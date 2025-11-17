type TOptions = {
  year?: number;
  month?: number;
  weekStartFromSunday?: boolean;
};

export const MILLESECONDS = {
  seconds: 1000,
  minutes: 60 * 1000,
  hours: 60 * 1000 * 60,
  days: 60 * 1000 * 60 * 24,
  months: 60 * 1000 * 60 * 24 * 30,
  years: 60 * 1000 * 60 * 24 * 30 * 365,
};

const dayProcess = (day: number, weekStartFromSunday: boolean): number =>
  weekStartFromSunday ? day : day === 0 ? 6 : day - 1;

export const getMonth = (options: TOptions = {}) => {
  const {
    year = new Date().getFullYear(),
    month = new Date().getMonth(),
    weekStartFromSunday = false,
  } = options;

  const current = {
    date: new Date(year, month),
    count: new Date(year, month + 1, 0).getDate(),
    firstWeekDay: dayProcess(
      new Date(year, month).getDay(),
      weekStartFromSunday
    ),
    lastWeekDay: dayProcess(
      new Date(
        new Date(year, month).setDate(new Date(year, month + 1, 0).getDate())
      ).getDay(),
      weekStartFromSunday
    ),
  };

  const previous = {
    date: new Date(year, month, 0),
    count: new Date(year, month, 0).getDate(),
  };

  const next = {
    date: new Date(year, month + 1),
  };

  const data = [];

  for (let day = current.firstWeekDay - 1; day >= 0; day--) {
    data.push({
      day: previous.count - day,
      month: previous.date.getMonth(),
      year: previous.date.getFullYear(),
      previous: true,
    });
  }

  for (let day = 1; day <= current.count; day++) {
    data.push({
      day,
      month: current.date.getMonth(),
      year: current.date.getFullYear(),
      current: true,
    });
  }

  for (let day = 1; day <= 6 - current.lastWeekDay; day++) {
    data.push({
      day,
      month: next.date.getMonth(),
      year: next.date.getFullYear(),
      next: true,
    });
  }

  const now = new Date();

  data.forEach((day) => {
    if (
      day.day === now.getDate() &&
      day.year === now.getFullYear() &&
      day.month === now.getMonth()
    ) {
      day.today = true;
    }
  });

  return data;
};

export const getDifference = (start: Date, end = new Date()) => {
  if (!start) {
    return null;
  }

  const diff = +end - +start;

  return Object.keys(MILLESECONDS).reduce((acc, key) => {
    acc[key] = Math.floor(diff / MILLESECONDS[key]);

    return acc;
  }, {});
};

export default { getMonth, getDifference };
