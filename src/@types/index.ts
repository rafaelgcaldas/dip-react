export type User = {
  id: number
  name: string
  username: string
  email: string
}

export enum HttpStatusCode {
  ok = 200,
  serverError = 500,
  forbidden = 403,
  notFound = 404
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}