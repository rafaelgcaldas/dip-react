/* eslint-disable @typescript-eslint/no-explicit-any */
export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  serverError = 500,
  forbidden = 403,
  notFound = 404
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}