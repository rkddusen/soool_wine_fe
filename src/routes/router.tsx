import { createBrowserRouter } from "react-router-dom";
import LayoutPage from "../pages/LayoutPage";
import MainPage from "../pages/MainPage";
import StoragePage from "../pages/StoragePage";
import PlacePage from "../pages/PlacePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import WinePage from "@/pages/WinePage";

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
      {
        path: `/wine/:id`,
        element: <WinePage />,
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
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

export default router;
