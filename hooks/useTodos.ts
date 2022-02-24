import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { Todo } from '../types/todo';
import { useCallback, useState } from 'react';

const getTodos = async () => {
  const { data } = await axios.get('todo/list');
  return data;
};

const useTodos = () => {
  const [addTodoOpen, setAddTodoOpen] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);
  const [deletingTodoId, setDeletingTodoId] = useState<number | undefined>(
    undefined
  );

  const { refetch, data, error, isFetching } = useQuery('posts', getTodos);
  const addTodo = useMutation((todo: Todo) => axios.post('todo/add', todo));
  const editTodo = useMutation((priority: number) =>
    axios.patch(`todo/update-priority/${editingTodo?.id}`, { priority })
  );
  const deleteTodo = useMutation((id: number) =>
    axios.delete(`/todo/delete/${id}`)
  );

  const toggleAddTodoOpen = useCallback(
    () => setAddTodoOpen((prev) => !prev),
    []
  );
  const toggleEditTodoOpen = useCallback(
    (todo?: Todo) => setEditingTodo(todo),
    []
  );

  const handleAdd = (data: Todo) => {
    addTodo.mutate(data, {
      onSuccess: () => {
        toggleAddTodoOpen();
        refetch();
      },
    });
  };
  const handleEdit = (todo: Todo) => {
    editTodo.mutate(todo.priority, {
      onSuccess: () => {
        toggleEditTodoOpen();
        refetch();
      },
    });
  };
  const handleDelete = (id: number) => {
    setDeletingTodoId(id);
    deleteTodo.mutate(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return {
    isFetching,
    error,
    data,
    toggleAddTodoOpen,
    toggleEditTodoOpen,
    handleDelete,
    addTodoOpen,
    deletingTodoId,
    editingTodo,
    handleAdd,
    handleEdit,
    editTodoLoading: editTodo.isLoading,
    deleteTodoLoading: deleteTodo.isLoading,
    addTodoLoading: addTodo.isLoading,
  };
};

export default useTodos;
