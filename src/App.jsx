import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./util/http.js";
import Login from "./components/Login.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard/employees',
    element: <p>yooo</p>
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App;


// gradient color:
// light: f7f2ab
// dark: bda734