/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import type { HttpRequest } from "../../infra/adapters";
import type { HttpClient, HttpRequestParams } from "../protocols";

export const mockGetRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: 'get',
})

export class HttpClientSpy implements HttpClient {
  url?: string;
  method?: string;
  body: any;

  async request(data: HttpRequestParams): Promise<void> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
  }
}