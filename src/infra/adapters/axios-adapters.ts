/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse } from "axios";
import axios from "axios";
import type { HttpClient, HttpResponse } from "../../data/protocols/http";

export type HttpRequest<T = undefined> = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  body?: T
  headers?: any
}

export class AxiosHttpClientAdapter<T = any, R = any> implements HttpClient<T, R> {
  async request(data: HttpRequest<T>): Promise<HttpResponse<R>> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
      })
    } catch (error) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data
    }
  }
}