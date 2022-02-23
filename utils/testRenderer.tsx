import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setLogger } from 'react-query';

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

function render(
  ui: ReactElement,
  renderOptions?: Omit<RenderOptions, 'queries'>
) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return rtlRender(ui, { wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
