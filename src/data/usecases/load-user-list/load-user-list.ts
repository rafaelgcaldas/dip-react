/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnexpectedError } from "../../../domain/errors";
import type { User } from "../../../domain/models";
import type { LoadUserList } from "../../../domain/usecases";
import { HttpStatusCode, type HttpClient, type HttpRequestParams } from "../../protocols/http";

export class RemoteLoadUserList implements LoadUserList {
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
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
     }
  }
}