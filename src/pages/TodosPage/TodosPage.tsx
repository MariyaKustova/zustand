import React, { useEffect, useState } from "react";
import { useStore } from "../../store";
import { Checkbox } from "@mui/material";
import { Loader } from "../../components/Loader";
import { TodoDialog } from "./components/TodoDialog";
import Controls from "../../components/Controls";
import PageTitle from "../../components/PageTitle";

import s from "./TodosPage.module.scss";
import { getRandomInt } from "../../utils";

const TodosPage = () => {
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    loadTodos,
    addTodo,
    editTodo,
    deleteTodo,
    todos,
    isTodosLoading,
    todosLoadingId,
    todosUserIds,
  } = useStore();

  const currentTodo = todos.find((todo) => todo.id === editTodoId);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const onCloseEditDialog = () => setEditTodoId(null);
  const onCloseCreateDialog = () => setOpenDialog(false);

  return (
    <>
      <PageTitle title="Todos" onClick={() => setOpenDialog(true)} />

      {isTodosLoading ? (
        <Loader />
      ) : (
        <>
          {todos.map((todo) => (
            <div key={todo.id} className={s.TodosPage__listItem}>
              <div className={s.TodosPage__wrapper}>
                <Checkbox
                  checked={todo.completed}
                  onChange={() =>
                    editTodo({ ...todo, completed: !todo.completed })
                  }
                />
                <span
                  className={todo.completed ? s.TodosPage__completedTodo : ""}
                >
                  {todo.todo}
                </span>
              </div>
              <Controls
                isDisabled={todosLoadingId === todo.id}
                onEdit={() => setEditTodoId(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
              />
            </div>
          ))}
          {Boolean(editTodoId) && (
            <TodoDialog
              open={Boolean(editTodoId)}
              onClose={onCloseEditDialog}
              value={currentTodo?.todo}
              onChange={(value: string) => {
                if (currentTodo && value.length && currentTodo.todo !== value) {
                  editTodo({ ...currentTodo, todo: value });
                }
                onCloseEditDialog();
              }}
              isEdit
            />
          )}
          {openDialog && (
            <TodoDialog
              open={openDialog}
              onClose={onCloseCreateDialog}
              onChange={(value: string) => {
                if (value.length) {
                  addTodo(
                    value,
                    todosUserIds[getRandomInt(todosUserIds.length - 1)]
                  );
                }
                onCloseCreateDialog();
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default TodosPage;
