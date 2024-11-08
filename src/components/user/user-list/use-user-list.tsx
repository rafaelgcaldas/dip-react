import { useQuery } from "@tanstack/react-query"
import type { UserListProps } from "./user-list"

export const useUserList = ({ loadUserList }: UserListProps) => {

  const { data, isLoading } = useQuery({
    queryKey: [ "users" ],
    queryFn: () => loadUserList.loadAll()
  })

  const users = data ? data.body : []

  return {
    users,
    isLoading
  }
}