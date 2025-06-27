import Update from './updateuser/Update';
import AddUser from './adduser/AddUser';
import User from './getuser/User';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './App.css';

function App() {
  const route= createBrowserRouter([
    {
      path: "/",
      element:<User/>
    },
    {
      path: "/add",
      element:<AddUser/>
    },
    {
      path:'/update/:id',
      element:<Update/>
    },
  ])
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
