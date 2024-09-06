import { Post, Tag } from "@model/postsTypes";
import { HttpClientBaseQuery } from "./HttpClient";

const BASE_URL = "/posts";

export const postsApi = {
  getPosts: () =>
    HttpClientBaseQuery<Post[]>({ url: BASE_URL }).then(
      (response) => response.data
    ),
  getPostById: (id: string) =>
    HttpClientBaseQuery<Post>({ url: `${BASE_URL}/${id}` }).then(
      (response) => response.data
    ),
  createPost: (post: Omit<Post, "id">) =>
    HttpClientBaseQuery<Post>({
      url: BASE_URL,
      method: "post",
      data: post,
    }).then((response) => response.data),
  editPost: (post: Post) =>
    HttpClientBaseQuery<Post>({
      url: `${BASE_URL}/${post.id}`,
      method: "put",
      data: post,
    }).then((response) => response.data),
  deletePost: (id: number) =>
    HttpClientBaseQuery<Post>({
      url: `${BASE_URL}/${id}`,
      method: "delete",
    }).then((response) => response.data),
  getTagsList: () =>
    HttpClientBaseQuery<Tag[]>({ url: `/tags` }).then(
      (response) => response.data
    ),
};
