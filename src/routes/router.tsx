import { createBrowserRouter } from "react-router-dom";
import LayoutPage from "../pages/LayoutPage";
import MainPage from "../pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
]);

export default router;
