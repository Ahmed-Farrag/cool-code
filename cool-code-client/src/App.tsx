import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Create from "./components/Create/Create";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";

function App() {
  const [userData, setUserData] = useState(null);
  function saveuserData() {
    const encodedToken: any = localStorage.getItem("userToken");
    const decodedToken: any = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout userData={userData} />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/create",
          element: (
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          ),
        },
        {
          path: "/edit/:id",
          element: (
            <ProtectedRoute>
              <UpdateUser />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            // <ProtectedRoute>
            <Profile />
            // </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveuserData={saveuserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
