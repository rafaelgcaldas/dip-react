import type { HttpClient, HttpRequestParams } from "../../protocols";

export class LoadUserList {
  constructor(
    private readonly params: HttpRequestParams,
    private readonly httpClient: HttpClient
  ) {}

  async loadAll(): Promise<void> {
    await this.httpClient.request({ 
      url: this.params.url,
      method: this.params.method,
      body: this.params.body
     })
  }
}