import axios from "axios";
import { API_URL } from "../env.ts";

export const dataApi = axios.create({
  baseURL: API_URL,
});

export const fetchSubscriptions = async () => {
  dataApi.defaults.headers.common["Content-Type"] = "application/json";
  dataApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  const response = await dataApi.get("/api/subscriptions");
  return response.data;
};
