export function getWeekOfYear(date: Date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  return Math.ceil(
    ((date.valueOf() - oneJan.valueOf()) / millisecondsInDay + oneJan.getDay() + 1) / 7,
  );
}

export function secondsToHours(sec: number) {
  return Math.floor(sec / 3600);
}

export const toEnglishDay = (day: Day) => (day === 1 ? 7 : day - 1);

export const addLeadingZero = (num: number) => num.toString().padStart(2, '0');

export function toHumanHM(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}`;
}

export const getDayOfYear = (date: Date) =>
  Math.floor((date.valueOf() - new Date(date.getFullYear(), 0, 0).valueOf()) / 1000 / 60 / 60 / 24);

export function getThisWeekId(date: Date) {
  const currentYear = date.getFullYear();
  const currentWeek = getWeekOfYear(date);
  return `${currentYear}:${currentWeek}`;
}

export function getDayId(date: Date) {
  const currentYear = date.getFullYear();
  const currentDay = getDayOfYear(date);
  return `${currentYear}:${currentDay}`;
}
