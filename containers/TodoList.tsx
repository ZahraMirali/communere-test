import { FC, forwardRef, useImperativeHandle, useState } from 'react';
import useTodoList from '../hooks/useTodoList';
import {
  Button,
  Box,
  Container,
  Fab,
  Alert,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useMutation } from 'react-query';
import AddIcon from '@mui/icons-material/Add';
import { TodoCard } from '../components';
import { Todo, TodoListContainerProps } from '../types/todo';

export const TodoListContainer: FC<TodoListContainerProps> = forwardRef(
  function TodoListContainerRef({ onAddTodoClick, onEditTodoClick }, ref) {
    const { data, error, isFetching, refetch } = useTodoList();
    useImperativeHandle(ref, () => ({ refetch }));

    const [deletingTodoId, setDeletingTodoId] = useState<number>();

    const deleteTodo = useMutation((id: number) =>
      axios.delete(`todo/delete/${id}`)
    );

    const handleDelete = (id: number) => {
      setDeletingTodoId(id);
      deleteTodo.mutate(id, {
        onSuccess: () => {
          refetch();
        },
      });
    };

    if (isFetching) return <CircularProgress />;

    if (error) return <Alert severity='error'>Something went wrong!</Alert>;

    if (data?.length === 0) {
      return (
        <main>
          <Box my={3} justifyContent='center' display='flex'>
            <Button variant='contained' onClick={onAddTodoClick}>
              Create your first task :)
            </Button>
          </Box>
        </main>
      );
    }

    return (
      <main>
        <Container>
          {data?.map((todo: Todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onEditClick={() => onEditTodoClick(todo)}
              onDeleteClick={() => handleDelete(todo.id)}
              deleteLoading={deleteTodo.isLoading && deletingTodoId === todo.id}
            />
          ))}
          <Fab
            color='secondary'
            onClick={onAddTodoClick}
            sx={{ position: 'fixed', bottom: 10, right: 10 }}
          >
            <AddIcon />
          </Fab>
        </Container>
      </main>
    );
  }
);
