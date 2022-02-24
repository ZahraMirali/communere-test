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

export declare type TodoListContainerProps = {
  onAddTodoClick: () => void;
  onEditTodoClick: (todo: Todo) => void;
  ref?: any;
};

export declare type AddTodoContainerProps = {
  onClose: () => void;
  open: boolean;
  refetch?: () => void;
};

export declare type EditTodoContainerProps = {
  onClose: () => void;
  refetch?: () => void;
  editingTodo?: Todo;
};

export declare type ListRef = {
  refetch: () => void;
};
