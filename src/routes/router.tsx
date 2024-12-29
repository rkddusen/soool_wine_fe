import { createBrowserRouter } from "react-router-dom";
import LayoutPage from "../pages/LayoutPage";
import MainPage from "../pages/MainPage";
import StoragePage from "../pages/StoragePage";

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
]);

export default router;
