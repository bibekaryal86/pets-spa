import { LocalStorage } from './localStorageHelper';

type ParamObjects = { [key: string]: string | number | boolean };

interface UrlOptions {
  path: string;
  queryParams: ParamObjects;
  pathParams: ParamObjects;
}

interface RequestOptions {
  method: string;
  requestBody: unknown;
  requestHeaders: ParamObjects;
  noAuth: boolean;
}

export interface FetchOptions extends UrlOptions, RequestOptions {}

export interface FetchResponse {
  statusCode?: number;
  refreshToken?: boolean;
  data?: unknown;
}

const addPathParams = (path: string, pathParams: ParamObjects) => {
  return Object.keys(pathParams).length === 0
    ? path
    : Object.keys(pathParams).reduce(
        (str: string, param: string) => str.replace(`{${param}}`, pathParams[param].toString()),
        path,
      );
};

const addQueryParams = (queryParams: ParamObjects) => {
  return Object.keys(queryParams).length === 0 ? '' : getQueryString(queryParams);
};

const getQueryString = (queryParams: ParamObjects) => {
  let queryString = '?';
  Object.entries(queryParams).forEach(([key, value]) => {
    queryString += `${key}=${value}&`;
  });
  return queryString.slice(0, -1);
};

const getUrl = ({ path = '', queryParams = {}, pathParams = {} }: Partial<UrlOptions>) => {
  const pathWithParams = addPathParams(path, pathParams);
  const queryString = addQueryParams(queryParams);
  return pathWithParams + queryString;
};

const getHeaders = (withAuth: boolean, requestHeaders: ParamObjects) => {
  const headers: HeadersInit = {};
  headers['Accept'] = 'application/json';
  headers['Content-Type'] = 'application/json';

  if (withAuth) {
    const appData = '';
    if (appData) {
      headers['App_data'] = appData;
    }

    const token = LocalStorage.getItem('token') as string;
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (requestHeaders) {
    Object.entries(requestHeaders).forEach(([key, value]) => {
      headers[key.toLowerCase()] = value.toString();
    });
  }

  return headers;
};

const getBody = (method: string, body: unknown) =>
  method !== 'GET' && typeof body !== 'undefined' ? JSON.stringify(body) : '';

export const Async = {
  fetch: async (urlPath: string, options: Partial<FetchOptions>): Promise<FetchResponse> => {
    const { queryParams, pathParams, method = 'GET', requestBody = {}, requestHeaders = {}, noAuth = false } = options;

    const url = getUrl({ path: urlPath, queryParams, pathParams });
    const headers = getHeaders(!noAuth, requestHeaders);
    const body = getBody(method, requestBody);

    const init: RequestInit = {
      method,
      //credentials: 'include',
      headers,
      mode: 'cors',
    };

    if (body) {
      init.body = body;
    }

    let statusCode = 0;
    let refreshToken = false;

    return await window
      .fetch(url, init)
      .then((response) => {
        refreshToken = response.headers.get('refresh-token') === 'true';
        statusCode = response.status;

        if (!response.ok) {
          console.log('Error Response: ', response);

          if (response.status === 401 || response.status === 403) {
            return Promise.resolve(undefined);
          }
        }

        return response.json();
      })
      .then((data) => {
        return {
          statusCode,
          refreshToken,
          data,
        };
      })
      .catch((error) => {
        console.log('Error in fetch: ', error);
        throw new Error(error);
      });
  },
};
