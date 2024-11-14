import { describe, expect, it, vi } from "vitest";
import { HttpStatusCode } from "../../../data/protocols/http";
import { LoadUserlistSpy, makeSut } from "./user-list.spec";
import { waitFor } from "@testing-library/dom";
import { UnexpectedError } from "../../../domain/errors";


describe('useUserList', () => {

  it('should returns user empty list', () => {
    const loadUserListSpy = new LoadUserlistSpy()
    vi.spyOn(loadUserListSpy, 'loadAll').mockResolvedValueOnce({
      body: [],
      statusCode: HttpStatusCode.ok
    }).mockClear()

    const { result } = makeSut()

    expect(result.current.users).toMatchObject([])
  })

  it('should returns user list', async () => {
    const loadUserListSpy = new LoadUserlistSpy()
    const users = [{
        id: 1, 
        name: 'John Doe',
        username: 'John',
        email: 'email@email.com'
      }]
    
    vi.spyOn(loadUserListSpy, 'loadAll').mockResolvedValueOnce({
      body: users,
      statusCode: HttpStatusCode.ok
    }).mockClear()
    
    const { result } = makeSut(loadUserListSpy)

    await waitFor(() => {
      expect(result.current.users).toMatchObject(users)
      expect(result.current.isLoading).toBeFalsy()
      expect(result.current.isError).toBeFalsy()
    })

  })

  it('should be able to return error', async () => {
    const loadUserListSpy = new LoadUserlistSpy()
    
    vi.spyOn(loadUserListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError).mockClear()
    
    const { result } = makeSut(loadUserListSpy)

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy()
    })

  })
})