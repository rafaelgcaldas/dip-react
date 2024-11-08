import { QueryClientProvider } from "@tanstack/react-query";
import { UserList } from "./components/user/user-list/user-list";
import type { HttpRequestParams } from "./data/protocols/http";
import { RemoteLoadUserList } from "./data/usecases/load-user-list/load-user-list";
import { AxiosHttpClientAdapter } from "./infra/adapters";
import { queryClient } from "./infra/lib/react-query";


export function App() {
  const axiosHttpClientAdapter = new AxiosHttpClientAdapter()
  
  const params: HttpRequestParams = {
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'get'
  }

  const remoteLoadUserList = new RemoteLoadUserList(params, axiosHttpClientAdapter)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <h1>Users</h1>
        <UserList 
          loadUserList={remoteLoadUserList} 
        />
      </QueryClientProvider>
    </>
  )
}
