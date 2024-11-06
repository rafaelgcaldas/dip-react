import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it, vi, type Mocked } from 'vitest';
import { AxiosHttpClientAdapter } from './axios-adapters';

import axios from 'axios';
import { HttpRequest } from './axios-adapters';

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>;

const makeSut = () => {
  return new AxiosHttpClientAdapter()
}

const mockGetRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: 'get',
})

describe('AxiosHttpClientAdapter', () => {
  beforeEach(() => {
    mockedAxios.request.mockClear();
  })

  it('should call axios with the correct values', () => {
    const sut = makeSut();
    const requestParams = mockGetRequest()

    sut.request(requestParams)

    expect(mockedAxios.request).toHaveBeenCalledWith(requestParams)
  })
})