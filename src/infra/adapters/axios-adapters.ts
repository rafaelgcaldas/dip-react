/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import type { HttpResponse } from "../../data/protocols/http";

export type HttpRequest<T = undefined> = {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  body?: T
  headers?: any
}

export interface HttpClient<T, R> {
  request: (data: HttpRequest<T>) => Promise<HttpResponse<R>>;
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
      const _error = error as AxiosError<{ message: string }>

      throw new Error(_error?.response?.data?.message)
    }

    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data
    }
  }
}