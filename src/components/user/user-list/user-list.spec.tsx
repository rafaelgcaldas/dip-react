import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor, type RenderResult } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { HttpResponse } from '../../../data/protocols/http';
import type { User } from '../../../domain/models';
import { mockUserList } from '../../../domain/test';
import type { LoadUserList } from '../../../domain/usecases';
import { UserList } from './user-list';

class LoadUserlistSpy implements LoadUserList {
  async loadAll (): Promise<HttpResponse<User[]>> {
    return {
      statusCode: 200,
      body: mockUserList()
    }
  }
}

type SutTypes = {
  loadUserListSpy: LoadUserList
  wrapper: RenderResult
}

const makeSut = (): SutTypes => {
  const queryClient = new QueryClient();

  const Providers = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const loadUserListSpy = new LoadUserlistSpy()

  const wrapper = render(
    <Providers>
      <UserList loadUserList={loadUserListSpy} />
    </Providers>
  )

  return {
    loadUserListSpy,
    wrapper
  }
}

describe('Userlist', () => {
  it('should be able render loading text', () => {
    const { wrapper } = makeSut()
    const loadingText = wrapper.getByText('carregando...')

    expect(loadingText).toBeVisible()
  })
  
  it('should be able render user list on success', async () => {
    const { wrapper } = makeSut()

    await waitFor(() => {
      expect(wrapper.getAllByRole('listitem').length).toBe(3)
    });
  })
})