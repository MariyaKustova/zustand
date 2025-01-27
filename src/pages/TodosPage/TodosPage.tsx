import React, { useEffect, useState } from "react";

import { useTodosStore } from "@store/index";
import Loader from "@core/Loader";
import PageTitle from "@core/PageTitle";
import { TodoDialog } from "./components/TodoDialog";
import { getRandomInt } from "../../utils";
import TodosList from "./components/TodosList";

const TodosPage = () => {
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { loadTodos, addTodo, editTodo, todos, isTodosLoading, todosUserIds } =
    useTodosStore();

  useEffect(() => {
    if (!todos.length) {
      loadTodos();
    }
  }, [loadTodos, todos]);

  const currentTodo = todos.find((todo) => todo.id === editTodoId);

  const onCloseEditDialog = () => setEditTodoId(null);
  const onCloseCreateDialog = () => setOpenDialog(false);

  return (
    <>
      <PageTitle title="Todos" onClick={() => setOpenDialog(true)} />

      {isTodosLoading ? (
        <Loader />
      ) : (
        <>
          <TodosList onEdit={setEditTodoId} />
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
