export declare type Todo = {
  title: string;
  priority: number;
  id: number;
};

export declare type AddTodoProps = {
  open: boolean;
  onClose: () => void;
  handleAdd: (data: Todo) => void;
  loading?: boolean;
};

export declare type EditTodoProps = {
  open: boolean;
  onClose: () => void;
  initialTodo?: Todo;
  handleEdit: (todo: Todo) => void;
  loading?: boolean;
};

export declare type TodoCardProps = {
  todo: Todo;
  onEditClick: () => void;
  onDeleteClick: () => void;
  deleteLoading?: boolean;
};
