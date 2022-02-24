import { FC } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { EditTodo } from '../components';
import { Todo, EditTodoContainerProps } from '../types/todo';

export const EditTodoContainer: FC<EditTodoContainerProps> = ({
  onClose,
  refetch,
  editingTodo,
}) => {
  const editTodo = useMutation((priority: number) =>
    axios.patch(`todo/update-priority/${editingTodo?.id}`, { priority })
  );
  const handleEdit = (todo: Todo) => {
    editTodo.mutate(todo.priority, {
      onSuccess: () => {
        onClose();
        refetch?.();
      },
    });
  };

  return (
    <EditTodo
      initialTodo={editingTodo}
      open={editingTodo !== undefined}
      onClose={onClose}
      handleEdit={handleEdit}
      loading={editTodo.isLoading}
    />
  );
};
