import { StateCreator } from "zustand";

import { FormValues, Post, Tag } from "@model/postsTypes";
import { postsApi } from "@api/postsApi";

interface PostsStore {
  post: Post | null;
  posts: Post[];
  tagsList: Tag[];
  postsUserIds: number[];
  postsLoadingInitial: boolean;
  postsLoadingId: string | null;
}

interface PostsActions {
  loadPosts: () => void;
  loadPostById: (id: string) => void;
  addPost: (value: FormValues & { userId: number }) => void;
  editPost: (post: Post) => void;
  deletePost: (id: number) => void;
  loadTagsList: () => void;
}

export type PostsSlice = PostsStore & PostsActions;

export const createPostsSlice: StateCreator<PostsSlice> = (set) => ({
  post: null,
  posts: [],
  tagsList: [],
  postsUserIds: [],
  postsLoadingInitial: false,
  postsLoadingId: null,

  loadPosts: async () => {
    set({ postsLoadingInitial: true });
    try {
      const result = await postsApi.getPosts();
      if (result?.length) {
        set({ posts: result });
        set({ postsUserIds: [...new Set(result.map(({ userId }) => userId))] });
      }
      set({ postsLoadingInitial: false });
    } catch (err) {
      console.log(err);
      set({ postsLoadingInitial: false });
    }
  },

  loadPostById: async (id) => {
    set({ postsLoadingId: id });
    try {
      const result = await postsApi.getPostById(id);
      if (result) set({ post: result });
      set({ postsLoadingId: null });
    } catch (err) {
      console.log(err);
      set({ postsLoadingId: null });
    }
  },

  addPost: async ({ title, body, tags, userId }) => {
    try {
      const response = await postsApi.createPost({
        title,
        userId,
      });

      if (response) {
        const newPost: Post = {
          id: response.id,
          title,
          body,
          tags,
          reactions: {
            likes: 0,
            dislikes: 0,
          },
          views: 0,
          userId: response.id,
        };

        set((state) => ({
          posts: [...state.posts, newPost],
        }));
      }
    } catch (err) {
      console.log(err);
    }
  },

  editPost: async (post) => {
    set({ postsLoadingId: String(post.id) });
    try {
      const response = await postsApi.editPost({
        id: post.id,
        title: post.title,
      });
      if (response) {
        set((state) => ({
          posts: [
            ...state.posts.map((postItem) =>
              postItem.id === response.id ? post : postItem
            ),
          ],
        }));
        set({ post });
      }
      set({ postsLoadingId: null });
    } catch (err) {
      console.log(err);
      set({ postsLoadingId: null });
    }
  },

  deletePost: async (id) => {
    set({ postsLoadingId: String(id) });
    try {
      const response = await postsApi.deletePost(id);
      if (response) {
        set((state) => ({
          posts: [...state.posts.filter((post) => post.id !== id)],
        }));
      }
      set({ postsLoadingId: null });
    } catch (err) {
      console.log(err);
      set({ postsLoadingId: null });
    }
  },

  loadTagsList: async () => {
    try {
      const response = await postsApi.getTagsList();
      if (response) {
        set({ tagsList: response });
      }
    } catch (err) {
      console.log(err);
    }
  },
});
