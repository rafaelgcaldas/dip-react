/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { UnexpectedError } from "../../../domain/errors";
import { mockUserList } from "../../../domain/test";
import { createRandomUser } from "../../../infra/test";
import { HttpStatusCode, type HttpRequestParams } from "../../protocols/http";
import { HttpClientSpy } from "../../test";
import { RemoteLoadUserList } from "./load-user-list";
import type { User } from "../../../domain/models";

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
  sut: RemoteLoadUserList
  httpClientSpy: HttpClientSpy<any, User[]>
}

const makeSut = (): SutTypes => {
  const { url, method, body } = makeHttpRequestParams()

  const httpClientSpy = new HttpClientSpy<any, User[]>()
  const sut = new RemoteLoadUserList({ url, method, body }, httpClientSpy)

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

  it('should return a list of Users if HttpClient retruns 200 ', async () => {
    const { sut, httpClientSpy } = makeSut()

    const httpResult = mockUserList()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const userList = await sut.loadAll()

    expect(userList.body).toEqual(httpResult)
  })

  it('should return an empty list if HttpClient retruns 204 ', async () => {
    const { sut, httpClientSpy } = makeSut()

    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    }

    const userList = await sut.loadAll()

    expect(userList.body).toEqual([])
  })
})