import type { User } from "../../../domain/models"

type UserProps = {
  user: User
}
export function UserItem({ user }: UserProps) {
  return <li>{user.name}</li>
}