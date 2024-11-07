/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import type { HttpRequest } from "../../infra/adapters";
import { HttpStatusCode, type HttpClient, type HttpRequestParams, type HttpResponse } from "../protocols/http";

export const mockGetRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: 'get',
})

export class HttpClientSpy<T, R> implements HttpClient<T, R> {
  url?: string;
  method?: string;
  body?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  }

  async request(data: HttpRequestParams<T>): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;

    return this.response
  }
}