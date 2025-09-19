/**
 * features/Auth/My/hooks/useRequireLogin.ts
 * 현재 로그인 여부를 확인하는 커스텀 훅
 * 로그인되어 있지 않다면 로그인 화면으로 자동 이동
 */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "@/models/auth/User";

export const useRequireLogin = (user: User | null, isAuthLoading: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (isAuthLoading) return;
    if (!user) {
      const currentPath = location.pathname + location.search;
      navigate(`/login?url=${encodeURIComponent(currentPath)}`);
    }
  }, [user, isAuthLoading, location, navigate]);
};
