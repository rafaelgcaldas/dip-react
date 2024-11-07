import type { User } from "../../../@types";
import { UnexpectedError } from "../../../domain/errors";
import { HttpStatusCode, type HttpClient, type HttpRequestParams } from "../../protocols/http";

export class LoadUserList {
  constructor(
    private readonly params: HttpRequestParams,
    private readonly httpClient: HttpClient<undefined, User[]>
  ) {}

  async loadAll(): Promise<void> {
    const httpResponse = await this.httpClient.request({ 
      url: this.params.url,
      method: this.params.method,
      body: this.params.body
     })

     switch(httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      default: throw new UnexpectedError()
     }
  }
}