/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "../../../@types";
import { UnexpectedError } from "../../../domain/errors";
import { HttpStatusCode, type HttpClient, type HttpRequestParams } from "../../protocols/http";

export class LoadUserList {
  constructor(
    private readonly params: HttpRequestParams<any>,
    private readonly httpClient: HttpClient<any, User[]>
  ) {}

  async loadAll(): Promise<User[]> {
    const httpResponse = await this.httpClient.request({ 
      url: this.params.url,
      method: this.params.method,
      body: this.params.body
     })

     switch(httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      default: throw new UnexpectedError()
     }
  }
}