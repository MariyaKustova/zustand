import { createPostsSlice, PostsSlice } from "./postsStore";
import { createTodosSlice, TodosSlice } from "./todosStore";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStore = create<PostsSlice & TodosSlice>()(
  devtools(
    (...props) => ({
      ...createPostsSlice(...props),
      ...createTodosSlice(...props),
    }),
    { enabled: true, name: "Zustand Store" }
  )
);
