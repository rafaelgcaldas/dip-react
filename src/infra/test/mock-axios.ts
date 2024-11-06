import { faker } from "@faker-js/faker";
import axios from 'axios';
import type { Mocked } from "vitest";
import type { User } from "../../@types";

const createRandomUser = (): User => {
  return {
    id: faker.number.int(),
    email: faker.internet.email(),
    name: faker.person.firstName(),
    username: `${faker.person.firstName()} ${faker.person.lastName()}`,
  };
}

export const mockAxios = (): Mocked<typeof axios> => {
  const mockedAxios = axios as Mocked<typeof axios>;

  mockedAxios.request.mockResolvedValue({
    data: createRandomUser(),
    status: faker.number.int()
  })
  
  return mockedAxios
}
