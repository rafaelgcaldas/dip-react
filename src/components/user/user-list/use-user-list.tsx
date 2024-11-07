import { useCallback, useEffect, useState } from "react"
import type { UserListProps } from "./user-list"
import type { User } from "../../../domain/models"

export const useUserList = ({ loadUserList }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getUserList = useCallback(async () => {
    setIsLoading(true)
    const response = await loadUserList.loadAll()

    if (!response.body) return

    setUsers(response.body)
    setIsLoading(false)
  }, [loadUserList])

  useEffect(() => {
    getUserList()
  }, [getUserList])

  return {
    users,
    isLoading
  }
}