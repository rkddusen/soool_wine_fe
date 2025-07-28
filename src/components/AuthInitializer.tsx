import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

const AuthInitializer = () => {
  // 첫 렌더링 시 accessToken 가져오기
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      useAuthStore.getState().setAccessToken(accessToken);
      useAuthStore.getState()._fetchUser();
    }
  }, []);
  return null;
};

export default AuthInitializer;
