export type TCatcher = (...args: unknown[]) => void;

type TOptions<T> = {
  data?: T;
  url?: string;
  responseParse?: boolean;
  method?: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'UPDATE';
  additionalHeaders?: Record<string, string>;
  additionalOptions?: Record<string, string>;
  dataToQuery?: boolean;
  baseUrl?: string;
  catcher?: TCatcher;
  mock?: {
    data: unknown;
    delay?: number;
  };
};

const request = <T = unknown, K = unknown>(
  options: TOptions<K>
): Promise<T> => {
  const {
    data,
    url = '',
    method = 'GET',
    additionalHeaders = {},
    additionalOptions = {},
    responseParse = true,
    baseUrl = window.location.origin,
    catcher,
    mock,
  } = options;

  if (mock?.data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock.data as T);
      }, mock?.delay || 1000);
    });
  }

  const dataToQuery = options.dataToQuery || method === 'GET';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };

  const returnerData = (response, callback) => {
    if (response?.json && responseParse) {
      response
        .json()
        .then(callback)
        .catch(() => callback({}));

      return;
    }

    callback(response);
  };

  return new Promise((resolve, reject) => {
    const fetchUrl = new URL(`${baseUrl}${url}`);

    const fetchOptions: Record<string, string | Object> = {
      method,
      headers,
      ...additionalOptions,
    };

    if (data) {
      if (dataToQuery) {
        Object.keys(data).forEach((key) =>
          fetchUrl.searchParams.append(key, data[key])
        );
      } else {
        fetchOptions.body = JSON.stringify(data);
      }
    }

    fetch(fetchUrl.toString(), fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }

        returnerData(response, resolve);
      })
      .catch((response) => {
        returnerData(response, (responseData) => {
          if (catcher) {
            catcher(responseData);
          }

          reject(responseData);
        });
      });
  });
};

export default request;
