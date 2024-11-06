import { faker } from '@faker-js/faker';
import { describe, expect, it, vi, type Mocked } from 'vitest';
import { AxiosHttpClientAdapter } from './axios-adapters';

import axios from 'axios';
import { HttpRequest } from './axios-adapters';

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>;

const makeSut = () => {
  return new AxiosHttpClientAdapter()
}

describe('AxiosHttpClientAdapter', () => {
  it('should call axios with the correct values', () => {
    const sut = makeSut();
    const requestParams: HttpRequest = {
      url: faker.internet.url(),
      method: 'get',
    }

    sut.request(requestParams)

    expect(mockedAxios.request).toHaveBeenCalledWith(requestParams)
  })
})