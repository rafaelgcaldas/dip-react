import { describe, expect, it, vi, type Mocked } from 'vitest';
import { AxiosHttpClientAdapter } from './axios-adapters';

import type axios from 'axios';
import { mockGetRequest } from '../../data/test';
import { mockAxios } from '../test';

vi.mock('axios')

type SutTypes = {
  sut: AxiosHttpClientAdapter
  mockedAxios: Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClientAdapter()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClientAdapter', () => {

  it('should call axios with the correct values', () => {
    const { sut, mockedAxios } = makeSut();
    const requestParams = mockGetRequest()

    sut.request(requestParams)

    expect(mockedAxios.request).toHaveBeenCalledWith(requestParams)
  })

  it('should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.request(mockGetRequest())

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
  })

})
