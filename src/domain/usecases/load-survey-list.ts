import type { HttpResponse } from "../../data/protocols/http";
import type { User } from "../models/user-model";

export interface LoadUserList {
  loadAll: () => Promise<HttpResponse<User[]>>
}