import { FC, useEffect } from 'react';
import {
  Radio,
  FormControlLabel,
  Box,
  Dialog,
  RadioGroup,
  FormLabel,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import { Todo } from '../types/todo';
import { priorities } from '../constants';

type EditTodoProps = {
  open: boolean;
  onClose: () => void;
  initialTodo?: Todo;
  handleEdit: (todo: Todo) => void;
  loading?: boolean;
};

export const EditTodo: FC<EditTodoProps> = ({
  open,
  onClose,
  handleEdit,
  loading,
  initialTodo,
}) => {
  const { handleSubmit, setValue, control } = useForm<Todo>();

  const onSubmit = handleSubmit(handleEdit);

  useEffect(() => {
    if (open && initialTodo) {
      setValue('priority', initialTodo.priority);
    }
  }, [open, initialTodo, setValue]);

  return (
    <Dialog open={open} onClose={onClose}>
      <Box component='form' onSubmit={onSubmit} p={4}>
        <Box mb={3}>
          <FormLabel>Priority</FormLabel>
          <Controller
            control={control}
            name='priority'
            render={({ field }) => (
              <RadioGroup row {...field}>
                {Object.entries(priorities).map(([value, label]) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={label}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </Box>
        <LoadingButton variant='contained' type='submit' loading={loading}>
          Update Priority
        </LoadingButton>
      </Box>
    </Dialog>
  );
};
