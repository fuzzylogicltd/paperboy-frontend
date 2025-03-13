export interface IUser {
  id: number;
  email: string;
}

export interface ILoginInfo {
  email: string;
  password: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}

export interface IFeed {
  id?: number;
  url: string;
  name: string;
}

export interface ISubscription {
  feedId: number;
  feed: IFeed;
  customFeedName: string | null;
  unreadCount?: number;
}

export interface IArticle {
  id: number;
  title: string;
  feed: IFeed;
  description: string;
  imageUrl?: string;
  datePublished?: string;
  author?: string;
}

export interface IRead {
  read: boolean;
  starred: boolean;
  article: IArticle;
}

export type ArticleFilterOptions = "all" | "unread" | "read" | "starred";
