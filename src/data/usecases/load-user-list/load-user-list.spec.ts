/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { createRandomUser } from "../../../infra/test";
import type { HttpRequestParams } from "../../protocols";
import { HttpClientSpy } from "../../test";
import { LoadUserList } from "./load-user-list";

const makeHttpRequestParams = (): HttpRequestParams => {
  return {
    url: faker.internet.url(),
    method: 'get',
    body: createRandomUser(),
  }
}

type SutTypes = {
  url: string
  method: string
  body: any
  sut: LoadUserList
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const { url, method, body } = makeHttpRequestParams()

  const httpClientSpy = new HttpClientSpy()
  const sut = new LoadUserList({ url, method, body }, httpClientSpy)

  return {
    url,
    method,
    body,
    sut,
    httpClientSpy
  }
}

describe('LaodUserList', () => {
  it('should call HttpClient with correct URL', async () => {
    const { url, sut, httpClientSpy } = makeSut()

    await sut.loadAll()

    expect(httpClientSpy.url).toBe(url)
  })

  it('should call HttpClient with correct method', async () => {
    const { method, sut, httpClientSpy } = makeSut()

    await sut.loadAll()

    expect(httpClientSpy.method).toBe(method)
  })

  it('should call HttpClient with correct body', async () => {
    const { body, sut, httpClientSpy } = makeSut()

    await sut.loadAll()

    expect(httpClientSpy.body).toEqual(body)
  })
})