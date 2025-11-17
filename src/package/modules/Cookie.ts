export const set = (name: string, value: any, days: number) => {
  let expires = '';

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }

  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

export const get = (name: string) => {
  const target = name + '=';
  const array = document.cookie.split(';');

  for (var i = 0; i < array.length; i++) {
    var cookie = array[i];
    while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
    if (cookie.indexOf(target) == 0)
      return cookie.substring(target.length, cookie.length);
  }

  return null;
};
