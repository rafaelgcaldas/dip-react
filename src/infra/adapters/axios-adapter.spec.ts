import { faker } from '@faker-js/faker';
import { beforeEach, describe, expect, it, vi, type Mocked } from 'vitest';
import { AxiosHttpClientAdapter } from './axios-adapters';

import axios from 'axios';
import { HttpRequest } from './axios-adapters';
import type { User } from '../../@types';

const createRandomUser = (): User => {
  return {
    id: faker.number.int(),
    email: faker.internet.email(),
    name: faker.person.firstName(),
    username: `${faker.person.firstName()} ${faker.person.lastName()}`,
  };
}

const mockedAxiosResult = {
  data: createRandomUser(),
  status: faker.number.int()
}

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>;

mockedAxios.request.mockResolvedValue(mockedAxiosResult)

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

  it('should return the correct statusCode and body', async () => {
    const sut = makeSut();

    const httpResponse = await sut.request(mockGetRequest())

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })


})