import axios, { AxiosInstance } from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;
const HEADERS = {
  "Content-Type": "application/json",
};

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
    instance.interceptors.request.use((config) => {
      const token = sessionStorage.getItem("accessToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  return instance;
};

export const wineInstance = createInstance("wines");
export const userInstance = createInstance("users");
export const privateUserInstance = createInstance("users", true);
export const authInstance = createInstance("auth");
export const privateAuthInstance = createInstance("auth", true);
