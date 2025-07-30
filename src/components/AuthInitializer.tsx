import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

const AuthInitializer = () => {
  // 첫 렌더링 시 로그인 확인
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  return null;
};

export default AuthInitializer;
