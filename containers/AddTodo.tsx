import { FC } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { AddTodo } from '../components';
import { Todo, AddTodoContainerProps } from '../types/todo';

export const AddTodoContainer: FC<AddTodoContainerProps> = ({
  onClose,
  open,
  refetch,
}) => {
  const addTodo = useMutation((todo: Todo) => axios.post('todo/add', todo));

  const handleAdd = (data: Todo) => {
    addTodo.mutate(data, {
      onSuccess: () => {
        onClose();
        refetch?.();
      },
    });
  };

  return (
    <AddTodo
      open={open}
      onClose={onClose}
      handleAdd={handleAdd}
      loading={addTodo.isLoading}
    />
  );
};
