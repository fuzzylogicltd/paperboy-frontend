import axios from "axios";
import { ILoginInfo, ILoginResponse } from "./types.ts";
import { API_URL } from "../env.ts";

export const authApi = axios.create({
  baseURL: API_URL,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const loginUser = async (user: ILoginInfo) => {
  const response = await authApi.post<ILoginResponse>("/signin", user);
  return response.data;
};

export const addUser = async (user: ILoginInfo) => {
  const response = await authApi.post<ILoginResponse>("/user", user);
  return response.data;
};
