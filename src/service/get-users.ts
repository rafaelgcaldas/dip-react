import type { User } from "../@types"
import type { LoadUserList } from "../components/user/user-list"
import type { HttpClient } from "../infra/adapters"

export function getUserList(httpClient: HttpClient<undefined, User[]>): LoadUserList {
  async function loadAll() {
    const response = await httpClient.request({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'get',
    })

    return response
  }

  return {
    loadAll
  }
}