import '@testing-library/jest-dom';
import { server } from './mocks/server';

window.matchMedia =
  window.matchMedia ||
  function a() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
