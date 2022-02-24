import { FC } from 'react';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { TodoCardProps } from '../types/todo';
import { priorities } from '../constants';

export const TodoCard: FC<TodoCardProps> = ({
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
