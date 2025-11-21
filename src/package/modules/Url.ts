export const getAll = (url = window.location.href) => {
  const params = {};

  Array.from(new URLSearchParams(new URL(url).search)).forEach(
    ([key, value]) => {
      params[encodeURIComponent(key)] = encodeURIComponent(value);
    }
  );

  return params;
};

export const get = (key, url) => getAll(url)[key];

export const set = (props: {
  params: Record<string | number, string | number>;
  url: string;
  pushState: boolean;
}) => {
  const { url = window.location.href, params = {}, pushState = false } = props;
  const nextUrl = new URL(url);

  Object.entries(params).forEach(([key, value]) => {
    if (value === '') {
      nextUrl.searchParams.delete(key);
    } else {
      nextUrl.searchParams.set(key, value.toString());
    }
  });

  if (pushState) {
    window.history.pushState({}, '', nextUrl);
  }

  return nextUrl.href;
};

export const isValidURL = (url) => {
  try {
    new URL(url);

    return true;
  } catch (_) {
    return false;
  }
};
