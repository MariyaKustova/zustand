import { createPostsSlice, PostsSlice } from "./postsStore";
import { createTodosSlice, TodosSlice } from "./todosStore";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const usePostsStore = create<PostsSlice>()(
  devtools(
    (...props) => ({
      ...createPostsSlice(...props),
    }),
    { enabled: true, name: "Posts", store: "Zustand Posts Store" }
  )
);

export const useTodosStore = create<TodosSlice>()(
  devtools(
    (...props) => ({
      ...createTodosSlice(...props),
    }),
    { enabled: true, name: "Todos", store: "Zustand Todos Store" }
  )
);
