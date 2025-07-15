import axios, { AxiosInstance } from "axios";
import {
  EmailVerificationTokenResponse,
  LoginTokenResponse,
} from "../models/Api";

const BASEURL = import.meta.env.VITE_API_BASE_URL;
const HEADERS = {
  "Content-Type": "application/json",
};

export const wineInstance: AxiosInstance = axios.create({
  baseURL: BASEURL + "/wines",
  headers: HEADERS,
});
export const userInstance: AxiosInstance = axios.create({
  baseURL: BASEURL + "/user",
  headers: HEADERS,
});

export const getIdExists = async (id: string): Promise<boolean> => {
  try {
    const response = await userInstance.get<boolean>(
      `/users/id-exists?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error api getIdExists: ", error);
    throw error;
  }
};

export const postEmail = async (
  email: string
): Promise<EmailVerificationTokenResponse> => {
  try {
    const { data } = await userInstance.post<EmailVerificationTokenResponse>(
      `/users/email-verification`,
      { email }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const postCode = async (
  token: string | undefined,
  email: string | undefined,
  code: number
): Promise<void> => {
  try {
    await userInstance.post<void>(`/users/email-verification/verify`, {
      token,
      email,
      code,
    });
  } catch (error) {
    console.error("Error api postCode: ", error);
    throw error;
  }
};

export const postUsers = async (
  id: string,
  password: string,
  email: string
): Promise<void> => {
  try {
    await userInstance.post<void>(`/users`, {
      id,
      password,
      email,
    });
  } catch (error) {
    console.error("Error api postUsers: ", error);
    throw error;
  }
};

export const postLogin = async (
  id: string,
  password: string
): Promise<LoginTokenResponse> => {
  try {
    const { data } = await userInstance.post<LoginTokenResponse>(
      `/auth/login`,
      {
        id,
        password,
      }
    );
    return data;
  } catch (error) {
    console.error("Error api postLogin: ", error);
    throw error;
  }
};
