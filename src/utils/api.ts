// utils/axios.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;
const HEADERS = {
  "Content-Type": "application/json",
};

// refresh 요청 중복 방지를 위한 상태 변수
let isRefreshing = false;
// 대기 중인 요청들을 저장하는 배열
// refresh가 완료되면 이 배열의 콜백들을 실행하여 요청을 재시도
let refreshSubscribers: ((token: string) => void)[] = [];

// AxiosRequestConfig에 _retry 필드 추가
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// refresh가 완료되었을 때 대기 중인 요청들 재시도
const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

// refresh가 완료되기 전 대기 중인 요청들 저장
const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const refreshInstance = axios.create({
  baseURL: `${BASEURL}/auth`,
  headers: HEADERS,
  withCredentials: true,
});

// refresh 요청
const refreshAccessToken = async (): Promise<string> => {
  const response = await refreshInstance.post("/refresh");
  return response.data.accessToken;
};

const setRequestInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

const setResponseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      // accessToken 만료 시 처리
      if (error.response?.status === 401 && !originalRequest._retry) {
        // 중복 요청 방지
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
              // 요청 헤더에 새로운 토큰 삽입
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              resolve(instance(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshAccessToken();
          sessionStorage.setItem("accessToken", newToken);
          onRefreshed(newToken);

          // 요청 헤더에 새로운 토큰 삽입
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          return instance(originalRequest);
        } catch (refreshError) {
          // refresh 실패 시 처리
          console.error("토큰 갱신 실패:", refreshError);
          sessionStorage.removeItem("accessToken");
          // 로그인 페이지로 리다이렉트
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // 기타 에러는 그대로 전달
      return Promise.reject(error);
    }
  );
};

// 인스턴스 생성 함수
const createInstance = (
  path: string,
  isPrivate: boolean = false
): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${BASEURL}/${path}`,
    headers: HEADERS,
    withCredentials: isPrivate,
  });

  if (isPrivate) {
    setRequestInterceptor(instance);
    setResponseInterceptor(instance);
  }

  return instance;
};

// 인스턴스들 생성
// private 인스턴스는 인증이 필요한 요청에 사용(accessToken 필요)
export const wineInstance = createInstance("wines");
export const userInstance = createInstance("users");
export const privateUserInstance = createInstance("users", true);
export const authInstance = createInstance("auth");
export const privateAuthInstance = createInstance("auth", true);
