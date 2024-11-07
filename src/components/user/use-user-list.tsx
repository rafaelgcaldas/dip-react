import { useCallback, useEffect, useState } from "react"
import type { UserListProps } from "./user-list"
import type { User } from "../../domain/models"

export const useUserList = ({ loadUserList }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([])

  const getUserList = useCallback(async () => {
    const response = await loadUserList.loadAll()

    if (!response.body) return

    setUsers(response.body)
  }, [loadUserList])

  useEffect(() => {
    getUserList()
  }, [getUserList])

  return {
    users
  }
}