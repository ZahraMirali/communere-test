import { Todo } from '../types/todo';
import { useCallback, useState } from 'react';

const useTodoModals = () => {
  const [addTodoOpen, setAddTodoOpen] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);

  const toggleAddTodoOpen = useCallback(
    () => setAddTodoOpen((prev) => !prev),
    []
  );
  const openEditTodoModal = useCallback(
    (todo: Todo) => setEditingTodo(todo),
    []
  );
  const closeEditTodoModal = useCallback(() => setEditingTodo(undefined), []);

  return {
    toggleAddTodoOpen,
    openEditTodoModal,
    closeEditTodoModal,
    addTodoOpen,
    editingTodo,
  };
};

export default useTodoModals;
