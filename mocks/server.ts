import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Todo } from '../types/todo';

let todos: Todo[] = [
  { id: 1, title: 'First Task', priority: 1 },
  { id: 2, title: 'Second Task', priority: 2 },
  { id: 3, title: 'Third Task', priority: 3 },
];

export const server = setupServer(
  rest.post('todo/add', ({ body }: { body: Todo }, res, ctx) => {
    todos.push({ ...body, id: todos.length + 1 });
    return res(ctx.status(200));
  }),
  rest.patch('todo/update-priority/1', ({ body }: { body: Todo }, res, ctx) => {
    todos[0].priority = body.priority;
    return res(ctx.status(200));
  }),
  rest.delete('todo/delete/1', (req, res, ctx) => {
    todos.splice(0, 1);
    return res(ctx.status(200));
  }),
  rest.get('todo/list', (req, res, ctx) => {
    return res(ctx.json(todos));
  })
);
