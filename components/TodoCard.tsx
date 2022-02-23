import { FC } from 'react';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Todo } from '../types/todo';
import { priorities } from '../constants';

type TodoProps = {
  todo: Todo;
  onEditClick: () => void;
  onDeleteClick: () => void;
  deleteLoading?: boolean;
};

export const TodoCard: FC<TodoProps> = ({
  todo,
  onDeleteClick,
  onEditClick,
  deleteLoading,
}) => {
  return (
    <Card variant='outlined' role='article'>
      <CardContent>
        <Typography gutterBottom>{todo.title}</Typography>
        <Typography>{priorities[todo.priority]}</Typography>
      </CardContent>

      <CardActions>
        <LoadingButton
          variant='contained'
          size='small'
          color='error'
          onClick={onDeleteClick}
          loading={deleteLoading}
        >
          Delete Todo
        </LoadingButton>
        <Button
          variant='contained'
          size='small'
          color='secondary'
          onClick={onEditClick}
        >
          Edit Priority
        </Button>
      </CardActions>
    </Card>
  );
};
