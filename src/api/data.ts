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
  return response.data.data;
};

export const fetchArticles = async (feedId: number) => {
  dataApi.defaults.headers.common["Content-Type"] = "application/json";
  dataApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  let fetchUrl = "";

  if (feedId) {
    fetchUrl = `/api/articles/feed/${feedId}`;
  } else {
    fetchUrl = "/api/articles";
  }

  const response = await dataApi.get(fetchUrl);

  return response.data.data;
};

export const fetchArticle = async (articleId: number) => {
  dataApi.defaults.headers.common["Content-Type"] = "application/json";
  dataApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  const response = await dataApi.get(`/api/articles/${articleId}`);

  return response.data.data;
};
