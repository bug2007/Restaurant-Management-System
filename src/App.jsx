import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./util/http.js";
import Login from "./pages/Login.jsx";
import Employees from "./pages/Employees.jsx";
import AppNavigation from "./components/AppNavigation.jsx";
import Foods from "./pages/Foods.jsx";
import NewOrder from "./pages/NewOrder.jsx";
import Orders from "./pages/Orders.jsx";
import EmployeeTable from "./pages/EmployeeTable.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/login' />

  },
  {
    path: '/login',
    element: <Login />
  },
  // {
  //   path: '/dashboard/employees',
  //   element: <Employees />
  // }
  {
    path: '/dashboard',
    element: <AppNavigation />,
    children: [
      {
        path: 'employees',
        element: <Employees />
      },
      {
        path: 'tables',
        element: <EmployeeTable />
      },
      {
        path: 'foods',
        element: <Foods />
      },
      {
        path: 'new-order',
        element: <NewOrder />
      },
      {
        path: 'orders',
        element: <Orders />
      }
    ]
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