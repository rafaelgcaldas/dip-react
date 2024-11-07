export type HttpRequestParams = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
  // headers?: any
}

export interface HttpClient {
  request: (data: HttpRequestParams) => Promise<void>;
}