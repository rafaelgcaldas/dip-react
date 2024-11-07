/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { HttpStatusCode, type User } from "../../../@types";
import { UnexpectedError } from "../../../domain/errors";
import { createRandomUser } from "../../../infra/test";
import type { HttpRequestParams } from "../../protocols/http";
import { HttpClientSpy } from "../../test";
import { LoadUserList } from "./load-user-list";

const makeHttpRequestParams = (): HttpRequestParams<User> => {
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
  httpClientSpy: HttpClientSpy<any, User[]>
}

const makeSut = (): SutTypes => {
  const { url, method, body } = makeHttpRequestParams()

  const httpClientSpy = new HttpClientSpy<any, User[]>()
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

  it('should throw UnexpectedError if HttpClient returns 403 ', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpClient returns 404 ', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.loadAll()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})