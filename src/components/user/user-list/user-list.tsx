import type { LoadUserList } from "../../../domain/usecases"
import { UserItem } from "../user-item"
import { useUserList } from "./use-user-list"

export type UserListProps = {
  loadUserList: LoadUserList
}

export function UserList({ loadUserList }: UserListProps) {
  const { users, isLoading } = useUserList({
    loadUserList
  })

  return (
    <div>
      {isLoading ? (
        <p>carregando...</p>
      ) : (
        <ul>
          {users.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
      )}
    </div>
  )
}