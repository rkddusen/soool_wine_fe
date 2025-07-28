// stores/authStore.ts
// 로그인, 토큰 저장, 사용자 정보 조회 등을 담당
import { create } from "zustand";
import { getMe, postLogin } from "@/features/login/api";
import { User } from "@/models/User";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  login: (id: string, password: string) => Promise<void>;
  // logout: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
  fetchUser: () => Promise<void>;
  _fetchUser: () => Promise<void>;
}

// zustand 스토어 생성
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  login: async (id, password) => {
    const { accessToken } = await postLogin(id, password);
    // sessionStorage에 저장
    sessionStorage.setItem("accessToken", accessToken);

    // user 가져오기
    // const user = await getMe();
    // set({ user });
    // 임시 유저. 서버 개발 이후 삭제
    const user = { id: "test", email: "test@t.est" };
    set({ user });
    set({ accessToken });
  },

  // logout: async () => {
  //   await postLogout();
  //   set({ accessToken: null, user: null });
  // },

  setAccessToken: (token) => {
    if (token) sessionStorage.setItem("accessToken", token);
    else sessionStorage.removeItem("accessToken");

    set({ accessToken: token });
  },

  fetchUser: async () => {
    const user = await getMe();
    set({ user });
  },
  // 임시 유저. 서버 개발 이후 삭제
  _fetchUser: async () => {
    const user = { id: "test", email: "test@t.est" };
    set({ user });
  },
}));
