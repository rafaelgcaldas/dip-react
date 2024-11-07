import { createRandomUser } from "../../infra/test";
import type { User } from "../models";

export const mockUserList = (): User[] => {
  return Array.from({ length: 3 }, () => createRandomUser())
}