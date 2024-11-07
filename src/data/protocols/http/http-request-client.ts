import type { HttpResponse } from ".";

export type HttpRequestParams<T = undefined> = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  body?: T
  // headers?: any
}

export interface HttpClient<T, R> {
  request: (data: HttpRequestParams<T>) => Promise<HttpResponse<R>>;
}