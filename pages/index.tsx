import type { NextPage } from 'next';
import { Fragment, useState, useCallback } from 'react';
import { useQuery, useMutation } from 'react-query';
import {
  Button,
  Box,
  Container,
  Fab,
  Alert,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { TodoCard, AddTodo, EditTodo } from '../components';
import { Todo } from '../types/todo';

const Home: NextPage = () => {
  const [addTodoOpen, setAddTodoOpen] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>(undefined);
  const [deletingTodoId, setDeletingTodoId] = useState<number | undefined>(
    undefined
  );

  const toggleAddTodoOpen = useCallback(
    () => setAddTodoOpen((prev) => !prev),
    []
  );
  const toggleEditTodoOpen = useCallback(
    (todo?: Todo) => setEditingTodo(todo),
    []
  );

  const { data, error, isLoading, refetch } = useQuery('todos', () =>
    axios.get('todo/list')
  );
  const addTodo = useMutation((todo: Todo) => axios.post('todo/add', todo));
  const editTodo = useMutation((priority: number) =>
    axios.patch(`todo/update-priority/${editingTodo?.id}`, { priority })
  );
  const deleteTodo = useMutation((id: number) =>
    axios.delete(`/todo/delete/${id}`)
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
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity='error'>Something went wrong!</Alert>;

  return (
    <Fragment>
      <main>
        {data?.data.length === 0 ? (
          <Box my={3} justifyContent='center' display='flex'>
            <Button variant='contained' onClick={toggleAddTodoOpen}>
              Create your first task :)
            </Button>
          </Box>
        ) : (
          <Container>
            {data?.data.map((todo: Todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEditClick={() => toggleEditTodoOpen(todo)}
                onDeleteClick={() => handleDelete(todo.id)}
                deleteLoading={
                  deleteTodo.isLoading && deletingTodoId === todo.id
                }
              />
            ))}
            <Fab
              color='secondary'
              onClick={toggleAddTodoOpen}
              sx={{ position: 'fixed', bottom: 10, right: 10 }}
            >
              <AddIcon />
            </Fab>
          </Container>
        )}
      </main>
      <AddTodo
        open={addTodoOpen}
        onClose={toggleAddTodoOpen}
        handleAdd={handleAdd}
        loading={addTodo.isLoading}
      />
      <EditTodo
        initialTodo={editingTodo}
        open={editingTodo !== undefined}
        onClose={() => toggleEditTodoOpen(undefined)}
        handleEdit={handleEdit}
        loading={editTodo.isLoading}
      />
    </Fragment>
  );
};

export default Home;
