import axios from "axios";
import { API_URL } from "../env.ts";
import { IFeed, IRead } from "./types.ts";

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

export const addSubscription = async (feed: IFeed) => {
  dataApi.defaults.headers.common["Content-Type"] = "application/json";
  dataApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  const response = await dataApi.post("/api/subscriptions", feed);
  return response.data.data;
};

export const fetchArticles = async (
  feedId: number | undefined,
  pageCursor: number | null,
  starred: boolean,
  read: boolean | null
) => {
  dataApi.defaults.headers.common["Content-Type"] = "application/json";
  dataApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  const searchParams = new URLSearchParams();

  let fetchUrl = "";

  if (feedId) {
    fetchUrl = `/api/articles/feed/${feedId}`;
  } else {
    fetchUrl = "/api/articles";
  }

  if (pageCursor) {
    searchParams.append("pageCursor", pageCursor.toString());
  }

  if (starred) {
    searchParams.append("starred", starred.toString());
  }

  if (read !== null) {
    searchParams.append("read", read.toString());
  }

  if (searchParams) {
    fetchUrl = fetchUrl + "?" + searchParams.toString();
  }

  const response = await dataApi.get(fetchUrl);

  return response.data;
};

export const fetchArticle = async (articleId: number) => {
  dataApi.defaults.headers.common["Content-Type"] = "application/json";
  dataApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  const response = await dataApi.get(`/api/articles/${articleId}`);

  return response.data.data;
};

export const updateArticle = async (read: IRead) => {
  dataApi.defaults.headers.common["Content-Type"] = "application/json";
  dataApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;

  const response = await dataApi.put(`/api/articles/${read.article.id}`, {
    starred: read.starred,
  });
  return response.data.data;
};
