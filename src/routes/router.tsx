// routes/router.tsx
import { createBrowserRouter } from "react-router-dom";
import {
  LayoutPage,
  LoginPage,
  LoginHelpPage,
  SignUpPage,
  MainPage,
  StoragePage,
  MapPage,
  DetailPage,
  MyPage,
} from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "storage",
        element: <StoragePage />,
      },
      {
        path: `wine/:id`,
        element: <DetailPage />,
      },
    ],
  },
  {
    path: "/login",
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "help",
        element: <LoginHelpPage />,
      },
    ],
  },
  {
    path: "/map",
    element: <MapPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: `/mypage`,
    element: <MyPage />,
  },
]);

export default router;
