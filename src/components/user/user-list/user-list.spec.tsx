import '@testing-library/jest-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, waitFor, type RenderResult } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { HttpResponse } from '../../../data/protocols/http';
import type { User } from '../../../domain/models';
import { mockUserList } from '../../../domain/test';
import type { LoadUserList } from '../../../domain/usecases';
import { UserList } from './user-list';
import { UnexpectedError } from '../../../domain/errors';
import { useUserList } from './use-user-list';

export class LoadUserlistSpy implements LoadUserList {
  async loadAll (): Promise<HttpResponse<User[]>> {
    return {
      statusCode: 200,
      body: mockUserList()
    }
  }
}

type SutTypes = {
  loadUserListSpy: LoadUserList
  wrapper: RenderResult,
  result: {
    current: {
      users: User[];
      isLoading: boolean;
      isError: boolean;
    };
  }
}

export const makeSut = (loadUserListSpy = new LoadUserlistSpy()): SutTypes => {
  const queryClient = new QueryClient();

  const Providers = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const wrapper = render(
    <Providers>
      <UserList loadUserList={loadUserListSpy} />
    </Providers>
  )

  const { result } = renderHook(() => useUserList({ loadUserList: loadUserListSpy }), {
    wrapper: Providers
  });

  return {
    loadUserListSpy,
    wrapper,
    result
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
  
  it('should be able render error text on failure', async () => {
    const loadUserListSpy = new LoadUserlistSpy()
    vi.spyOn(loadUserListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError)

    const { wrapper } = makeSut(loadUserListSpy)
    
    await waitFor(() => {
      const errorText = wrapper.getByText('Aconteceu um erro inesperado, tente novamente.')
      expect(errorText).toBeVisible()
    });
  })
})