import type { LoadUserList } from "../../domain/usecases"
import { useUserList } from "./use-user-list"

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