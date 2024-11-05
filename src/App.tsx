import { UserList } from "./components/user/user-list";
import { AxiosHttpClientAdapter } from "./infra/adapters";
import { getUserList } from "./service/get-users";

export function App() {

  return (
    <>
      <h1>Users</h1>
      <UserList 
        loadUserList={getUserList(new AxiosHttpClientAdapter())} 
      />
    </>
  )
}
