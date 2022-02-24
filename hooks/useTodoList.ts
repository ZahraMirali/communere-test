import { useQuery } from 'react-query';
import axios from 'axios';

const getTodoList = async () => {
  const { data } = await axios.get('todo/list');
  return data;
};

export default function useTodoList() {
  return useQuery('todos', getTodoList);
}
