import { Todo } from "../model/todosTypes";
import { todosApi } from "../api/todosApi";
import { StateCreator } from "zustand";

interface TodosStore {
  todos: Todo[];
  todosUserIds: number[];
  isTodosLoading: boolean;
  todosLoadingId: number | null;
}

interface TodosActions {
  loadTodos: () => void;
  addTodo: (todoText: string, userId: number) => void;
  editTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
}

export type TodosSlice = TodosStore & TodosActions;

export const createTodosSlice: StateCreator<TodosStore & TodosActions> = (
  set
) => ({
  todos: [],
  todosUserIds: [],
  isTodosLoading: false,
  todosLoadingId: null,

  loadTodos: async () => {
    set({ isTodosLoading: true });
    try {
      const result = await todosApi.getTodos();
      if (result) {
        set({ todos: result });
        set({ todosUserIds: result.map(({ userId }) => userId) });
      }
      set({ isTodosLoading: false });
    } catch (err) {
      console.log(err);
      set({ isTodosLoading: false });
    }
  },

  addTodo: async (todoText, userId) => {
    const todo: Omit<Todo, "id"> = {
      userId,
      todo: todoText,
      completed: false,
    };

    try {
      const newTodo = await todosApi.createTodo(todo);
      if (newTodo) {
        set((state) => ({ todos: [...state.todos, newTodo] }));
      }
    } catch (err) {
      console.log(err);
    }
  },

  editTodo: async (todo: Todo) => {
    set({ todosLoadingId: todo.id });
    try {
      const response = await todosApi.editTodo(todo);
      if (response) {
        set((state) => ({
          todos: state.todos.map((todoItem) =>
            todoItem.id === response.id ? todo : todoItem
          ),
        }));
      }
      set({ todosLoadingId: null });
    } catch (err) {
      console.log(err);
      set({ todosLoadingId: null });
    }
  },

  deleteTodo: async (id) => {
    set({ todosLoadingId: id });
    try {
      const response = await todosApi.deleteTodo(id);
      if (response) {
        set((state) => ({
          todos: state.todos.filter((todoItem) => todoItem.id !== id),
        }));
      }
      set({ todosLoadingId: null });
    } catch (err) {
      console.log(err);
      set({ todosLoadingId: null });
    }
  },
});
