// stores/authStore.ts
// 로그인, 토큰 저장, 사용자 정보 조회 등을 담당
import { create } from "zustand";
import { getMe, postLogin } from "@/features/Auth/Login/api";
import { User } from "@/models/auth/User";
import { postLogout } from "@/features/Auth/api";

interface AuthState {
  user: User | null;
  login: (id: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthLoading: boolean;
  initializeAuth: () => Promise<void>;
}

// zustand 스토어 생성
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthLoading: true,

  login: async (id, password) => {
    try {
      set({ isAuthLoading: true });

      const { accessToken } = await postLogin(id, password);
      // sessionStorage에 저장
      sessionStorage.setItem("accessToken", accessToken);

      // user 가져오기
      const user = await getMe();
      set({ user });
    } catch (err) {
      throw err;
    } finally {
      set({ isAuthLoading: false });
    }
  },

  logout: async () => {
    try {
      await postLogout();
    } finally {
      set({ user: null });
      sessionStorage.removeItem("accessToken");
    }
  },

  // 첫 렌더링 시 로그인 확인(새로고침 포함)
  initializeAuth: async () => {
    try {
      set({ isAuthLoading: true });
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
        set({ isAuthLoading: false, user: null });
        return;
      }
      const user = await getMe();
      set({ user });
    } finally {
      set({ isAuthLoading: false });
    }
  },
}));
