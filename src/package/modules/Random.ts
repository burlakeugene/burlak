export const uid = (count = 4) =>
  new Array(count)
    .fill(null)
    .map(() => Math.random().toString(16).slice(2))
    .join('-');

export const range = (min = 0, max = 100) => {
  const low = Math.min(min, max);
  const high = Math.max(min, max);

  return Math.floor(Math.random() * (high - low + 1) + low);
};
