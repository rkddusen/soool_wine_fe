import { createBrowserRouter } from "react-router-dom";
import LayoutPage from "../pages/LayoutPage";
import MainPage from "../pages/MainPage";
import StoragePage from "../pages/StoragePage";
import PlacePage from "../pages/PlacePage";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/storage",
        element: <StoragePage />,
      },
    ],
  },
  {
    path: "/place",
    element: <PlacePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
