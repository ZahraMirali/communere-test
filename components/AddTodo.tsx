import { FC, useEffect } from 'react';
import {
  TextField,
  Radio,
  FormControlLabel,
  Box,
  Dialog,
  RadioGroup,
  FormLabel,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import { Todo } from '../types/todo';
import { priorities } from '../constants';

type AddTodoProps = {
  open: boolean;
  onClose: () => void;
  handleAdd: (data: Todo) => void;
  loading?: boolean;
};

export const AddTodo: FC<AddTodoProps> = ({
  open,
  onClose,
  handleAdd,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Todo>();

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const onSubmit = handleSubmit(handleAdd);

  return (
    <Dialog open={open} onClose={onClose}>
      <Box component='form' onSubmit={onSubmit} p={4}>
        <TextField
          {...register('title', { required: true })}
          helperText={
            errors.title !== undefined ? 'Title is required' : undefined
          }
          error={errors.title !== undefined}
          fullWidth
          label='Title'
        />
        <Box my={3}>
          <FormLabel>Priority</FormLabel>
          <RadioGroup defaultValue={1} row>
            {Object.entries(priorities).map(([value, label]) => (
              <FormControlLabel
                key={value}
                {...register('priority')}
                value={value}
                control={<Radio />}
                label={label}
              />
            ))}
          </RadioGroup>
        </Box>
        <LoadingButton variant='contained' type='submit' loading={loading}>
          Add Todo
        </LoadingButton>
      </Box>
    </Dialog>
  );
};
