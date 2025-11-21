export const getDistance = (first, second) => {
  if (!first || !second) {
    return 0;
  }

  const earthRadius = 6371;
  const distanceLat = ((second[0] - first[0]) * Math.PI) / 180;
  const distanceLon = ((second[1] - first[1]) * Math.PI) / 180;
  const a =
    Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
    Math.cos((first[0] * Math.PI) / 180) *
      Math.cos((second[0] * Math.PI) / 180) *
      Math.sin(distanceLon / 2) *
      Math.sin(distanceLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(earthRadius * c * 1000);
};
