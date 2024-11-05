export type User = {
  id: number
  name: string
  username: string
  email: string
}

export enum HttpStatusCode {
  ok = 200,
  serverError = 500
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}