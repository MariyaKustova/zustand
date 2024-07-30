import { createPostsSlice, PostsSlice } from "./postsStore";
import { createTodosSlice, TodosSlice } from "./todosStore";
import { create } from "zustand";

export const useStore = create<PostsSlice & TodosSlice>()((...props) => ({
  ...createPostsSlice(...props),
  ...createTodosSlice(...props),
}));
