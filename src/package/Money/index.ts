export const format = (string, deliver = ' ') => {
  if (!string) {
    return '0';
  }

  return parseFloat(string)
    .toString()
    .replace(
      /\./.test(string) ? /(\d)(?=(?:\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g,
      '$1' + deliver
    );
};
