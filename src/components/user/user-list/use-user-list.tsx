import { useQuery } from "@tanstack/react-query"
import type { UserListProps } from "./user-list"

export const useUserList = ({ loadUserList }: UserListProps) => {

  const { data, isLoading, isError } = useQuery({
    queryKey: [ "users" ],
    queryFn: () => loadUserList.loadAll(),
    retry: false
  })

  const users = data ? data.body : []

  return {
    users,
    isLoading,
    isError
  }
}