import '@testing-library/jest-dom';

import { render, type RenderResult } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { HttpResponse } from '../../../data/protocols/http';
import type { User } from '../../../domain/models';
import type { LoadUserList } from '../../../domain/usecases';
import { UserList } from './user-list';

class LoadUserlistSpy implements LoadUserList {
  callsCount = 0;
  async loadAll (): Promise<HttpResponse<User[]>> {
    this.callsCount++

    return {
      statusCode: 200,
      body: []
    }
  }
}

type SutTypes = {
  loadUserListSpy: LoadUserList
  wrapper: RenderResult
}

const makeSut = (): SutTypes => {
  const loadUserListSpy = new LoadUserlistSpy()
  const wrapper = render(<UserList loadUserList={loadUserListSpy} />)

  return {
    loadUserListSpy,
    wrapper
  }
}

describe('Userlist', () => {
  it('should be render loading text', () => {
    const { wrapper } = makeSut()
    const loadingText = wrapper.getByText('carregando...')

    expect(loadingText).toBeVisible()
  })
})