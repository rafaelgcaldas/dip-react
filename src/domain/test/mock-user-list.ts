import type { User } from "../../@types";
import { createRandomUser } from "../../infra/test";

export const mockUserList = (): User[] => {
  return Array.from({ length: 3 }, () => createRandomUser())
}