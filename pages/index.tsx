import type { NextPage } from 'next';
import { Fragment } from 'react';
import {
  Button,
  Box,
  Container,
  Fab,
  Alert,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useTodos from '../hooks/useTodos';
import { TodoCard, AddTodo, EditTodo } from '../components';
import { Todo } from '../types/todo';

const Home: NextPage = () => {
  const {
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
    editTodoLoading,
    deleteTodoLoading,
    addTodoLoading,
  } = useTodos();

  if (isFetching) return <CircularProgress />;

  if (error) return <Alert severity='error'>Something went wrong!</Alert>;

  return (
    <Fragment>
      <main>
        {data?.length === 0 ? (
          <Box my={3} justifyContent='center' display='flex'>
            <Button variant='contained' onClick={toggleAddTodoOpen}>
              Create your first task :)
            </Button>
          </Box>
        ) : (
          <Container>
            {data?.map((todo: Todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onEditClick={() => toggleEditTodoOpen(todo)}
                onDeleteClick={() => handleDelete(todo.id)}
                deleteLoading={deleteTodoLoading && deletingTodoId === todo.id}
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
        loading={addTodoLoading}
      />
      <EditTodo
        initialTodo={editingTodo}
        open={editingTodo !== undefined}
        onClose={() => toggleEditTodoOpen(undefined)}
        handleEdit={handleEdit}
        loading={editTodoLoading}
      />
    </Fragment>
  );
};

export default Home;
