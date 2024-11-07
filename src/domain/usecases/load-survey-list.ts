import type { User } from "../models/user-model";

export interface LoadUserList {
  loadAll: () => Promise<User[]>
}