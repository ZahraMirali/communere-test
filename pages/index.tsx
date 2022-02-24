import type { NextPage } from 'next';
import { Fragment, useRef } from 'react';
import useTodoModals from '../hooks/useTodoModals';
import {
  AddTodoContainer,
  TodoListContainer,
  EditTodoContainer,
} from '../containers';
import { ListRef } from '../types/todo';

const Home: NextPage = () => {
  const {
    toggleAddTodoOpen,
    closeEditTodoModal,
    openEditTodoModal,
    addTodoOpen,
    editingTodo,
  } = useTodoModals();
  const listRef = useRef<ListRef>();

  return (
    <Fragment>
      <TodoListContainer
        onAddTodoClick={toggleAddTodoOpen}
        onEditTodoClick={openEditTodoModal}
        ref={listRef}
      />
      <AddTodoContainer
        open={addTodoOpen}
        onClose={toggleAddTodoOpen}
        refetch={listRef?.current?.refetch}
      />
      <EditTodoContainer
        editingTodo={editingTodo}
        onClose={closeEditTodoModal}
        refetch={listRef?.current?.refetch}
      />
    </Fragment>
  );
};

export default Home;
