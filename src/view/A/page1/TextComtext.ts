import { createContext } from 'react';
export const TextComtext = createContext<{
  state: {
    value?: string;
  };
  setState: (value: { value?: string }) => void;
}>({
  state: {
    value: ''
  },
  setState: (value: { value?: string }) => {}
});
