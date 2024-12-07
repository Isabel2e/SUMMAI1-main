
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home/Home";
import User from "./pages/User/User";
import Settings from "./pages/Settings/Settings";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss"

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/Home",
          element: <Home />
        },
        {
          path: "/user",
          element: <User />
        },
        {
          path: "/settings",
          element: <Settings />
        },
      ]
    },
    {
      path:"/login",
      element: <Login />
    }
  ]);

  return <RouterProvider router={router} />;

}

export default App
