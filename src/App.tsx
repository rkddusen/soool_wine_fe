import { RouterProvider } from "react-router-dom";
import router from "@/routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthInitializer } from "@/components";

const queryClient = new QueryClient();
const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer />
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </QueryClientProvider>
    </>
  );
};

export default App;
