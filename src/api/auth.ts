import axios from "axios";
import { GenericResponse, ILoginResponse } from "./types.ts";
import { LoginInput } from "../widgets/SigninForm.tsx";
import { API_URL } from "../env.ts";

export const authApi = axios.create({
  baseURL: API_URL,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const loginUser = async (user: LoginInput) => {
  const response = await authApi.post<ILoginResponse>("/signin", user);
  return response.data;
};

export const addUser = async (user: LoginInput) => {
  const response = await authApi.post<ILoginResponse>("/user", user);
  return response.data;
};
