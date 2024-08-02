import React, { useEffect } from "react";
import { useStore } from "../../../../store";
import { Checkbox } from "@mui/material";
import Controls from "../../../../components/Controls";

import s from "./TodosList.module.scss";

interface TodosListProps {
  onEdit: (id: number) => void;
}

const TodosList = ({ onEdit }: TodosListProps) => {
  const { loadTodos, editTodo, todos, todosLoadingId, deleteTodo } = useStore();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className={s.TodosPage__listItem}>
          <div className={s.TodosPage__wrapper}>
            <Checkbox
              checked={todo.completed}
              onChange={() => editTodo({ ...todo, completed: !todo.completed })}
            />
            <span className={todo.completed ? s.TodosPage__completedTodo : ""}>
              {todo.todo}
            </span>
          </div>
          <Controls
            isDisabled={todosLoadingId === todo.id}
            onEdit={() => onEdit(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default TodosList;
