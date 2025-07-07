// routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import {
  LayoutPage,
  LoginPage,
  SignUpPage,
  MainPage,
  StoragePage,
  MapPage,
  WinePage,
} from "@/pages";

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
    path: "/map",
    element: <MapPage />,
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
