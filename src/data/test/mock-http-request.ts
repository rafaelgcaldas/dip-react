import { faker } from "@faker-js/faker";
import type { HttpRequest } from "../../infra/adapters";

export const mockGetRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: 'get',
})