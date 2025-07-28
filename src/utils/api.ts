import axios, { AxiosInstance } from "axios";

const BASEURL = import.meta.env.VITE_API_BASE_URL;
const HEADERS = {
  "Content-Type": "application/json",
};

export const wineInstance: AxiosInstance = axios.create({
  baseURL: BASEURL + "/wines",
  headers: HEADERS,
});
export const userInstance: AxiosInstance = axios.create({
  baseURL: BASEURL + "/users",
  headers: HEADERS,
  withCredentials: true,
});
