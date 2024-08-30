import { Post, PostsResponse, Tag } from "@model/postsTypes";
import { HttpClientBaseQuery } from "./HttpClient";

export const postsApi = {
  getPosts: () =>
    HttpClientBaseQuery<PostsResponse>({ url: "/posts" }).then(
      (response) => response.data?.posts
    ),
  getPostById: (id: string) =>
    HttpClientBaseQuery<Post>({ url: `/posts/${id}` }).then(
      (response) => response.data
    ),
  createPost: (post: Pick<Post, "userId" | "title">) =>
    HttpClientBaseQuery<Post>({
      url: "/posts/add",
      method: "post",
      data: post,
    }).then((response) => response.data),
  editPost: (post: Pick<Post, "id" | "title">) =>
    HttpClientBaseQuery<Post>({
      url: `/posts/${post.id}`,
      method: "put",
      data: { title: post.title },
    }).then((response) => response.data),
  deletePost: (id: number) =>
    HttpClientBaseQuery<Post>({ url: `/posts/${id}`, method: "delete" }).then(
      (response) => response.data
    ),
  getTagsList: () =>
    HttpClientBaseQuery<Tag[]>({ url: `/posts/tags` }).then(
      (response) => response.data
    ),
};
