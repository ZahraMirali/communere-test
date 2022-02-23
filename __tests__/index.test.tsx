import { server } from '../mocks/server';
import { rest } from 'msw';
import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
  waitFor,
  within,
} from '../utils/testRenderer';
import Home from '../pages/index';

describe('Home', () => {
  it('renders todos list', async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByText('First Task')).toBeInTheDocument();
  });

  it('adds todo and shows it', async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    fireEvent.click(screen.getAllByRole('button')[6]);
    await waitFor(() => screen.getByText('Add Todo'));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Fourth Task' } });
    fireEvent.click(screen.getByText('Add Todo'));

    await waitForElementToBeRemoved(() => screen.getByText('Add Todo'));

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(screen.getByText('Fourth Task')).toBeInTheDocument();
  });

  it('changes first todo priority', async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    fireEvent.click(screen.getAllByText('Edit Priority')[0]);
    await waitFor(() => screen.getByText('Update Priority'));
    fireEvent.click(screen.getAllByRole('radio')[2]);
    fireEvent.click(screen.getByText('Update Priority'));

    await waitForElementToBeRemoved(() => screen.getByText('Update Priority'));

    expect(
      within(screen.getAllByRole('article')[0]).getByText('High')
    ).toBeInTheDocument();
  });

  it('deletes first todo', async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    fireEvent.click(screen.getAllByText('Delete Todo')[0]);

    await waitForElementToBeRemoved(() => screen.getByText('First Task'));

    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('shows error when api call fails', async () => {
    server.use(rest.get('todo/list', (req, res) => res.networkError('')));

    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });

  it('shows create todo button when there is no todo', async () => {
    server.use(rest.get('todo/list', (req, res, ctx) => res(ctx.json([]))));

    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

    expect(screen.getByText('Create your first task :)')).toBeInTheDocument();
  });
});
