import type { HttpResponse, User } from "../../@types"
import { useUserList } from "./use-user-list"

export type LoadUserList = {
  loadAll: () => Promise<HttpResponse<User[]>>
}

export type UserListProps = {
  loadUserList: LoadUserList
}

export function UserList({ loadUserList }: UserListProps) {
  const { users } = useUserList({
    loadUserList
  })

  return (
    <div>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  )
}